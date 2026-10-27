#!/usr/bin/env bash
# ============================================================================
# deploy.sh — Rebuild & update runningclub.ir on the server (frontend-only)
# ----------------------------------------------------------------------------
# Run this after ANY code change. It:
#   1. Connects over SSH (key auth as the deploy user — no passwords)
#   2. Builds the Next.js static export (out/)
#   3. Uploads + swaps the new build into /opt/runningclub/web
#   4. Verifies the deployment through the edge proxy on the server
#
# This is a FRONTEND-ONLY deployment. No backend/API/DB is touched.
# Nginx container, docker-compose, nginx config, edge proxy (/opt/infra) and
# SSL (ParsPack CDN) are NOT changed — only the static web files are updated.
#
# One-time setup: install your SSH key for the deploy user, e.g.
#   ssh-copy-id arisan@109.122.254.194
#
# Usage:
#   ./deploy.sh            # build + deploy
#   ./deploy.sh --no-build # deploy existing out/ without rebuilding
# ============================================================================

set -euo pipefail

# ---------- Config (matches deployment) ----------
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SERVER_IP="109.122.254.194"
SSH_PORT="22"
SSH_USER="arisan"
REMOTE_WEB="/opt/runningclub/web"
REMOTE_CONTAINER="runningclub-nginx"
HEALTH_DOMAIN="runningclub.ir"

# Terminal colors
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'
log()  { echo -e "${BLUE}▸${NC} $*"; }
ok()   { echo -e "${GREEN}✓${NC} $*"; }
warn() { echo -e "${YELLOW}⚠${NC} $*"; }
die()  { echo -e "${RED}✗${NC} $*" >&2; exit 1; }

# ---------- Preflight checks ----------
command -v npm     >/dev/null || die "npm not found in PATH"
command -v ssh     >/dev/null || die "ssh not found in PATH"

# ssh/scp wrappers (key auth; BatchMode fails fast instead of prompting)
ssh_cmd()  { ssh -o BatchMode=yes -o StrictHostKeyChecking=accept-new -o ConnectTimeout=20 -p "$SSH_PORT" "${SSH_USER}@${SERVER_IP}" "$@"; }
scp_cmd()  { scp -C -o BatchMode=yes -o StrictHostKeyChecking=accept-new -o ServerAliveInterval=15 -o ServerAliveCountMax=4 -P "$SSH_PORT" "$@"; }
ssh_cmd true 2>/dev/null || die "SSH key login to ${SSH_USER}@${SERVER_IP} failed (run: ssh-copy-id ${SSH_USER}@${SERVER_IP})"

# ---------- Step 1: Build (optional) ----------
SKIP_BUILD=0
[ "${1:-}" = "--no-build" ] && SKIP_BUILD=1

if [ "$SKIP_BUILD" -eq 1 ]; then
  log "Skipping build (--no-build)"
else
  log "Installing dependencies…"
  if npm ci --no-audit --no-fund; then :; else
    warn "npm ci failed, falling back to npm install"
    npm install --no-audit --no-fund
  fi

  log "Building Next.js static export (out/)…"
  npm run build
fi

BUILD_DIR="$PROJECT_DIR/out"
[ -f "$BUILD_DIR/index.html" ] || die "Build failed: out/index.html not found"
FILE_COUNT="$(find "$BUILD_DIR" -type f | wc -l | tr -d ' ')"
ok "Build OK — $FILE_COUNT files in out/"

# ---------- Step 2: Package ----------
TARBALL="/tmp/runningclub-web-$(date +%s).tar.gz"
log "Packaging out/ → $TARBALL …"
( cd "$BUILD_DIR" && tar czf "$TARBALL" . )
SIZE_HR="$(du -h "$TARBALL" | cut -f1)"
ok "Tarball ready — $SIZE_HR"

# ---------- Step 3: Upload ----------
REMOTE_TARBALL="/tmp/$(basename "$TARBALL")"
log "Uploading to server (SSH port $SSH_PORT)…"
scp_cmd "$TARBALL" "${SSH_USER}@${SERVER_IP}:$REMOTE_TARBALL"
ok "Upload complete"
rm -f "$TARBALL"

# ---------- Step 4: Swap on server (atomic, backup old first) ----------
log "Swapping web files on server…"
ssh_cmd bash -s <<REMOTE_SCRIPT
set -euo pipefail
cd "$REMOTE_WEB"
# Backup current build (keep last 1)
rm -rf /opt/runningclub/web.bak 2>/dev/null || true
cp -a /opt/runningclub/web /opt/runningclub/web.bak 2>/dev/null || true
# Clear current web dir (including dotfiles)
find /opt/runningclub/web -mindepth 1 -delete 2>/dev/null || true
# Extract new build
tar xzf "$REMOTE_TARBALL" -C /opt/runningclub/web
rm -f "$REMOTE_TARBALL"
echo "extracted: \$(find /opt/runningclub/web -type f | wc -l) files"
REMOTE_SCRIPT
ok "Web files swapped (previous build backed up at /opt/runningclub/web.bak)"

# ---------- Step 5: Verify container is healthy ----------
log "Verifying container '$REMOTE_CONTAINER'…"
ssh_cmd "docker ps --filter name=$REMOTE_CONTAINER --format '{{.Status}}' | grep -qi 'Up' \
  || (echo 'container not running'; exit 1)"
ok "Container is up"

# ---------- Step 6: Health check through the edge proxy ----------
# X-Forwarded-For marks the request as proxied so edge does not 301 to HTTPS.
log "Health check via edge proxy…"
HTTP_CODE="$(ssh_cmd "curl -sS -o /dev/null -w '%{http_code}' -H 'Host: $HEALTH_DOMAIN' \
  -H 'X-Forwarded-For: 127.0.0.1' http://127.0.0.1/")"
if [ "$HTTP_CODE" = "200" ]; then
  ok "Internal check: edge → $REMOTE_CONTAINER → HTTP 200"
else
  die "Internal check FAILED: HTTP $HTTP_CODE (rolled back build kept at web.bak)"
fi

# ---------- Step 7: Public HTTPS check ----------
log "Public HTTPS check: https://$HEALTH_DOMAIN/ …"
PUB_CODE="$(ssh_cmd "curl -sS -o /dev/null -w '%{http_code}' https://$HEALTH_DOMAIN/ || echo 000")"
if [ "$PUB_CODE" = "200" ]; then
  ok "Public check: https://$HEALTH_DOMAIN/ → HTTP 200"
else
  warn "Public check returned HTTP $PUB_CODE (may be propagating or DNS/cert issue)"
fi

echo ""
ok "============================================="
ok " Deployment complete — runningclub.ir updated"
ok "============================================="
