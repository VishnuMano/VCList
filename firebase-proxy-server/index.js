// index.js
const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
app.use(cors()); // Enable CORS if you need to access this server from a different domain
app.use(bodyParser.json()); // Parse JSON bodies

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const db = admin.firestore();

// Endpoint to add an email to Firestore
app.post('/add-email', async (req, res) => {
  const email = req.body.email;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const docRef = await db.collection('emails').add({
      email: email,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    res.status(200).json({ message: 'Email saved successfully', id: docRef.id });
  } catch (error) {
    console.error('Error saving email:', error);
    res.status(500).json({ error: 'Error saving email' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
