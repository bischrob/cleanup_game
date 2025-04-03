#!/bin/bash

set -euo pipefail

# Set cleanup path
TARGET_DIR="/var/www/html"

# Ensure the target directory exists
mkdir -p "$TARGET_DIR"

# Clear existing content safely
if [ -d "$TARGET_DIR" ]; then
  echo "Removing existing files from $TARGET_DIR"
  rm -rf "$TARGET_DIR"/*
fi

# Copy dist/ contents if it exists
if [ -d dist ]; then
  echo "Copying dist/ to $TARGET_DIR"
  cp -r dist/* "$TARGET_DIR"/
else
  echo "dist/ directory not found, skipping."
fi

# Copy icons/ directory if it exists
if [ -d icons ]; then
  echo "Copying icons/ to $TARGET_DIR/icons/"
  cp -r icons "$TARGET_DIR"/icons
else
  echo "icons/ directory not found, skipping."
fi

# Copy manifest.json if it exists
if [ -f manifest.json ]; then
  echo "Copying manifest.json to $TARGET_DIR"
  cp manifest.json "$TARGET_DIR"/
else
  echo "manifest.json not found, skipping."
fi

# Copy robots.txt if it exists
if [ -f robots.txt ]; then
  echo "Copying robots.txt to $TARGET_DIR"
  cp robots.txt "$TARGET_DIR"/
else
  echo "robots.txt not found, skipping."
fi

echo "Cleanup app deployed to $TARGET_DIR"
