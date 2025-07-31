#!/bin/bash
set -e

echo "Installing frontend dependencies..."
npm ci

echo "Building frontend with Vite..."
if [ -f "node_modules/.bin/vite" ]; then
    node_modules/.bin/vite build
elif command -v npx >/dev/null 2>&1; then
    npx vite build
else
    # Fallback: try to run vite directly
    node node_modules/vite/bin/vite.js build
fi

echo "Installing backend dependencies..."
cd backend
npm ci

echo "Build completed successfully!"