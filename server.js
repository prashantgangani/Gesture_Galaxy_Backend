const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const mlRoutes = require('./routes/ml');
const cors = require('cors');
const path = require('path');

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/ml', mlRoutes); // ML prediction routes

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch-all route to serve the frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).json({ message: "Resource not found" });
});

// Handle other errors (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
