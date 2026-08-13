#!/bin/bash
# /root/runningclub-cleanup-hook.sh
#
# Called by Certbot after each challenge validation succeeds.
# TXT records are managed manually by the operator in Cloudflare and can
# be removed after issuance, so this is intentionally a no-op.
exit 0
