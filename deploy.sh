#!/bin/bash

if ! [ `git branch --list gh-pages` ]; then
  # prepare the gh-pages branch
  git checkout --orphan gh-pages;
  git reset --hard;
  git pull origin gh-pages;

  # switch back to tag or master
  if [ "$CI" = true ]; then
    git checkout $TRAVIS_TAG;
  else
    git checkout master;
  fi
fi

# generate the github pages website
ember github-pages:commit --message "Deploy gh-pages from commit $(git rev-parse HEAD)";

# push to github
if [ "$CI" = true ]; then
  git push "https://${GITHUB_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git" gh-pages:gh-pages --quiet;
else
  git push origin gh-pages:gh-pages;
fi
