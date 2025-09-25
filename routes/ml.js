const express = require('express');
const router = express.Router();
const axios = require('axios');

// POST /api/ml/predict
router.post('/predict', async (req, res) => {
    try {
        // Expecting base64 image or image URL in req.body.image
        const { image } = req.body;
        if (!image) {
            return res.status(400).json({ error: 'No image provided' });
        }
    // Forward the image to the ML service (use /predict endpoint)
    const mlResponse = await axios.post('https://gesture-galaxy-model-1.onrender.com/predict', { image });
    res.json(mlResponse.data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'ML service error' });
    }
});

module.exports = router;
