#!/bin/sh

# Change to the project directory
cd /home/aanderson/LuxDei

# Start the SSH agent and add the SSH key
eval `ssh-agent -s`
ssh-add /home/aanderson/.ssh/id_ed25519

# Perform a Git pull to update the code
git pull 

# Check if changes were pulled (git diff will show changes) 
if [ -n "$(git diff)" ]; then
  # If changes were pulled, navigate to the frontend directory
  cd frontend
  npm install
  npm run build
  cd ..
  cd backend
  npm i
fi