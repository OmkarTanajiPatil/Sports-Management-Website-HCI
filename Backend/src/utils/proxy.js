const axios = require('axios');
const base = process.env.PY_API_BASE || 'http://localhost:5000';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
});

module.exports = api;
