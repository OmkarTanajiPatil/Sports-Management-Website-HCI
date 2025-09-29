import React, { useEffect, useState } from 'react';
import api from '../api/apiClient';
import Card from '../components/Card';
import Loading from '../components/Loading';

export default function SportsPage() {
  const [list, setList] = useState(null);
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { fetchSports(); }, []);

  const fetchSports = async () => {
    try {
      const { data } = await api.get('/api/sports');
      setList(data);
    } catch (e) { console.error(e); setList([]); }
  };

  const add = async () => {
    if (!name) return alert('Enter sport name');
    try {
      await api.post('/api/sports', { name });
      setName('');
      setShowForm(false);
      fetchSports();
    } catch (e) { console.error(e); alert('Failed to add'); }
  };

  const filtered = list?.filter(s =>
    s.sport_name.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="container">
      {/* Header Section */}
      <div className="flex-header">
        <h2>🏅 Sports Management</h2>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          ➕ Add Sport
        </button>
      </div>

      {/* Search */}
      <input
        className="search-box"
        placeholder="🔍 Search sports..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="grid" style={{ marginTop: 16 }}>
        <Card title={`All Sports (${filtered.length})`}>
          {!list ? (
            <Loading />
          ) : (
            <ul className="sports-list">
              {filtered.length === 0 && (
                <li className="small">No sports found</li>
              )}
              {filtered.map(s => (
                <li key={s.sport_id} className="sport-item">
                  <span className="sport-name">{s.sport_name}</span>
                  <span className="sport-id">#{s.sport_id}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {/* Modal for Adding Sport */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Create New Sport</h3>
            <input
              placeholder="Enter sport name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn-primary" onClick={add}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
