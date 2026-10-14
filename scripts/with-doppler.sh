#!/usr/bin/env bash
set -euo pipefail

if [[ $# -eq 0 ]]; then
  echo "Usage: npm run doppler -- <command> [args...]" >&2
  exit 2
fi

if ! command -v doppler >/dev/null 2>&1; then
  echo "Error: Doppler CLI is not installed or not on PATH." >&2
  exit 1
fi

exec doppler run \
  --project kryos-defense-solutions \
  --config dev \
  -- env DB_ENV=dev "$@"
