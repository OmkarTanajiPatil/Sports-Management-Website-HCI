const express = require('express');
const router = express.Router();
const api = require('../utils/proxy');

// GET /api/teams -> list all teams
router.get('/', async (req, res) => {
  try {
    const resp = await api.get('/teams'); // Flask GET /
    res.json(resp.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

// POST /api/teams -> add team
router.post('/', async (req, res) => {
  try {
    const resp = await api.post('/teams/add', req.body); // Flask POST /add
    res.json(resp.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to add team' });
  }
});

// GET /api/teams/sport/:sportId -> teams of a sport
router.get('/sport/:sportId', async (req, res) => {
  try {
    const resp = await api.get(`/teams/sport/${req.params.sportId}`);
    res.json(resp.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch teams by sport' });
  }
});

module.exports = router;
