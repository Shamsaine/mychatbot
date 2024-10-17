#!/usr/bin/env bash

# Prompt the user for a commit message
read -p "Enter commit message: " commit_message

# If the user doesn't provide a message, use the default
if [ -z "$commit_message" ]; then
  commit_message="added newfiles"
fi

# Add, commit, and push changes
git add .
git commit -m "$commit_message"
git push
