#!/bin/bash
# Build + publish dist/ to the gh-pages branch of mirador-del-maestrazgo-preview
set -e
cd "$(dirname "$0")"
rm -rf dist/.git
npx vite build
rm -rf dist/.git
cd dist
git init -q
git checkout -q -b gh-pages
git add -A
git commit -q -m "deploy"
git push -f https://github.com/GabrielGhsoub/mirador-del-maestrazgo-preview.git gh-pages
cd .. && rm -rf dist/.git
echo "pushed gh-pages"
