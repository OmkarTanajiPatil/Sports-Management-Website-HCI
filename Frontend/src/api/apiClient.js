import axios from 'axios';
const base = import.meta.env.VITE_BFF_BASE || 'http://localhost:4000';
export default axios.create({ baseURL: base, timeout: 10000 });
