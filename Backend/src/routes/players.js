const express = require('express');
const router = express.Router();
const api = require('../utils/proxy');
const multer = require('multer');
const upload = multer(); // memory storage

// GET /api/players/team/:teamId -> list players in team
router.get('/', async (req, res) => {
  try {
    const { teamId } = req.query;
    const resp = await api.get(`/players/team/${teamId}`);
    res.json(resp.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch players' });
  }
});

// POST /api/players -> add player with optional doc
router.post('/', upload.single('doc'), async (req, res) => {
  try {
    const formData = new (require('form-data'))();
    const fs = require('fs');

    // Append form fields
    for (const key of Object.keys(req.body)) formData.append(key, req.body[key]);

    // Append file if present
    if (req.file) {
      formData.append('doc', fs.createReadStream(req.file.path), req.file.originalname);
    }

    const resp = await api.post('/players/add', formData, {
      headers: formData.getHeaders()
    });

    res.json(resp.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to add player' });
  }
});

module.exports = router;
