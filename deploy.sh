#!/usr/bin/env sh

# abort on errors
set -e

echo "Starting build..."
# build
npm run build

echo "Navigating to the build output directory..."
# navigate into the build output directory
cd dist

echo "Bypassing Jekyll processing..."
# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

echo "Initializing git repository..."
git init
git checkout -B main
git add -A
git commit -m 'deploy'

echo "Pushing to GitHub..."
# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f "git@github.com:ChrissieDk/Settl-React-PWA.git" main:gh-pages

echo "Returning to the project root directory..."
cd -

echo "Deployment complete."
