# Offshore Rapport v4

A dynamic resume/portfolio website with an admin dashboard for easy content management.

## Features

- Modern, responsive design
- Admin dashboard for updating resume content
- JSON-driven content management
- Image upload capabilities
- Minimalist, clean UI

## Tech Stack

- **Backend**: Node.js with Express.js
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Data Storage**: JSON file system
- **Dependencies**: express, cors, multer

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/Offshore-Rapport-v4.git
   cd Offshore-Rapport-v4
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```
   
   Or use the setup script to check dependencies and start:
   ```
   ./start.sh
   ```

## Usage

Once the application is running:

- **Resume View**: http://localhost:3000/
- **Admin Dashboard**: http://localhost:3000/dashboard

Use the admin dashboard to update your resume information. All data is stored in the `data/resume_data.json` file.

## Folder Structure

```
Offshore-Rapport-v4/
├── data/                  # JSON data storage
│   └── resume_data.json   # Resume configuration
├── public/                # Frontend files
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   ├── images/            # Uploaded and static images
│   ├── index.html         # Resume view
│   └── dashboard.html     # Admin dashboard
├── server.js              # Express server
├── package.json           # Project configuration
├── start.sh               # Setup and start script
└── README.md              # Project documentation
```

## Deployment

This application can be deployed to various platforms:

### Deploying to Fly.io

1. Install the Fly.io CLI
2. Run `fly launch --name your-app-name`
3. Run `fly deploy`

## License

ISC License

## Author

DomusGPT