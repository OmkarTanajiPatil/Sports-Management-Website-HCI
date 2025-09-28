const express = require('express');
const router = express.Router();
const api = require('../utils/proxy');

// GET all matches
router.get('/', async (req, res) => {
  try {
    const resp = await api.get('/matches');
    res.json(resp.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

// POST add match
router.post('/', async (req, res) => {
  try {
    const resp = await api.post('/matches/add', req.body);
    res.json(resp.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to add match' });
  }
});

module.exports = router;
