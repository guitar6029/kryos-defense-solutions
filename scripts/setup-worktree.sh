#!/usr/bin/env bash
set -euo pipefail

NODE_VERSION="22.23.3"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

# Load NVM even when the terminal did not initialize it.
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"

if [[ ! -s "$NVM_DIR/nvm.sh" ]]; then
  echo "Error: NVM not found at $NVM_DIR/nvm.sh"
  echo "Install NVM first, then rerun this script."
  exit 1
fi

source "$NVM_DIR/nvm.sh"

if ! nvm use "$NODE_VERSION"; then
  echo "Error: Node $NODE_VERSION is not installed."
  echo "Install it once with: nvm install $NODE_VERSION"
  exit 1
fi

echo "Node: $(node --version)"
echo "npm:  $(npm --version)"

if [[ ! -f package.json || ! -f package-lock.json ]]; then
  echo "Error: package.json or package-lock.json is missing."
  exit 1
fi

if ! command -v doppler >/dev/null 2>&1; then
  echo "Error: Install the Doppler CLI before continuing."
  exit 1
fi

echo "Installing dependencies..."
npm ci

echo "Generating Prisma client..."
npm run doppler -- npx prisma generate

echo "Building application..."
npm run doppler -- npm run build

echo "Worktree setup completed successfully."
