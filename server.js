const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Data file path
const dataFilePath = './data/resume_data.json';

// Helper function to read resume data
function getResumeData() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(data);
    }
    return { personal: {}, experience: [], education: [], skills: [], projects: [] };
  } catch (error) {
    console.error('Error reading resume data:', error);
    return { personal: {}, experience: [], education: [], skills: [], projects: [] };
  }
}

// Helper function to save resume data
function saveResumeData(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving resume data:', error);
    return false;
  }
}

// API Routes
app.get('/api/resume', (req, res) => {
  const data = getResumeData();
  res.json(data);
});

app.post('/api/resume', (req, res) => {
  const updatedData = req.body;
  const success = saveResumeData(updatedData);
  
  if (success) {
    res.json({ success: true, message: 'Resume data updated successfully' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to update resume data' });
  }
});

app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  
  res.json({ 
    success: true, 
    message: 'File uploaded successfully',
    filePath: `/images/${req.file.filename}`
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});