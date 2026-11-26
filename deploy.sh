#!/usr/bin/env bash
# Build del sito e pubblicazione sul bucket Garage "blog.p82.it" (servito da https://blog.p82.it).
# Credenziali (chiave p82-blog) in .env, non committato.
set -euo pipefail
cd "$(dirname "$0")"

set -a; . ./.env; set +a
export AWS_DEFAULT_REGION=garage AWS_ENDPOINT_URL=https://garage.p82.it
BUCKET=s3://blog.p82.it

npm run build

# Asset con hash nel nome: cache lunga e immutabile
aws s3 sync dist/_astro "$BUCKET/_astro" --delete --no-progress \
  --cache-control "public, max-age=31536000, immutable"

# Tutto il resto (HTML, feed, sitemap, font, favicon): sempre rivalidato
aws s3 sync dist "$BUCKET" --delete --no-progress --exclude "_astro/*" \
  --cache-control "public, max-age=0, must-revalidate"

echo "Pubblicato su https://blog.p82.it"
