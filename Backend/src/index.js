require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const sportsRoutes = require('./routes/sports');
const teamsRoutes  = require('./routes/team');
const playersRoutes = require('./routes/players');
const matchesRoutes = require('./routes/matches');

const app = express();
app.use(cors());
app.use(express.json());

// For file uploads
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Mount routes
app.use('/api/sports', sportsRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/players', playersRoutes);
app.use('/api/matches', matchesRoutes);

// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend BFF listening on ${PORT}`));
