const express = require('express');
const router = express.Router();
const api = require('../utils/proxy');

// GET /api/sports -> list sports
router.get('/', async (req, res) => {
  try {
    const resp = await api.get('/sports'); // Flask GET /
    res.json(resp.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch sports' });
  }
});

// POST /api/sports -> add sport
router.post('/', async (req, res) => {
  try {
    const resp = await api.post('/sports', req.body); // Flask POST /
    res.json(resp.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to add sport' });
  }
});

module.exports = router;
