#!/bin/bash

# Check if npm packages are installed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Check if data directory exists
if [ ! -d "data" ]; then
  echo "Creating data directory..."
  mkdir -p data
fi

# Check if resume data file exists
if [ ! -f "data/resume_data.json" ]; then
  echo "Creating initial resume data..."
  echo '{
    "personal": {
      "name": "Your Name",
      "title": "Your Professional Title",
      "email": "your.email@example.com"
    },
    "experience": [],
    "education": [],
    "skills": [],
    "projects": []
  }' > data/resume_data.json
fi

# Create public/images directory if it doesn't exist
if [ ! -d "public/images" ]; then
  echo "Creating images directory..."
  mkdir -p public/images
fi

# Start the server
echo "Starting Offshore Rapport v4..."
node server.js