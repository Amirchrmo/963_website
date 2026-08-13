#!/bin/bash
# /root/runningclub-auth-hook.sh
#
# Called by Certbot once per domain during manual DNS-01.
# It records the challenge in /root/runningclub-challenge.txt for the
# operator to read, then BLOCKS until the operator creates the
# /root/runningclub-go signal file (after the TXT record is deployed).
#
# Certbot sets these environment variables:
#   CERTBOT_DOMAIN      -> domain being validated (e.g. runningclub.ir)
#   CERTBOT_VALIDATION  -> the TXT value to publish
#   CERTBOT_TOKEN       -> (http only, unused for dns)

CHALLENGE_FILE="/root/runningclub-challenge.txt"
GO_FILE="/root/runningclub-go"

# Record the challenge for the operator to read.
{
  echo "DOMAIN=${CERTBOT_DOMAIN}"
  echo "VALIDATION=${CERTBOT_VALIDATION}"
  echo "TXT_NAME=_acme-challenge.${CERTBOT_DOMAIN}"
  echo "TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)"
} > "$CHALLENGE_FILE"

# Wait for the operator's "go" signal (created after the TXT record is
# deployed in Cloudflare). Poll every 2 seconds.
while [ ! -f "$GO_FILE" ]; do
  sleep 2
done

# Consume the signal so the next stage can reuse it.
rm -f "$GO_FILE"
exit 0
