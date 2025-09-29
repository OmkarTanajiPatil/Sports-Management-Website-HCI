import React, { useEffect, useState } from 'react';
import api from '../api/apiClient';
import Card from '../components/Card';
import Loading from '../components/Loading';
import './SportsPage.css';

export default function SportsPage() {
  const [list, setList] = useState(null);
  const [name, setName] = useState('');
<<<<<<< HEAD
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
=======
  const [activeTab, setActiveTab] = useState('create'); // 'create' or 'list'
>>>>>>> ec79867fda4430c2f70a2689b0bdf99802fcbb82

  useEffect(() => { fetchSports(); }, []);

  const fetchSports = async () => {
    try {
      const { data } = await api.get('/api/sports');
      setList(data);
<<<<<<< HEAD
    } catch (e) { console.error(e); setList([]); }
=======
    } catch (e) {
      console.error(e);
      setList([]);
    }
>>>>>>> ec79867fda4430c2f70a2689b0bdf99802fcbb82
  };

  const add = async () => {
    if (!name) return alert('Enter sport name');
    try {
      await api.post('/api/sports', { name });
      setName('');
<<<<<<< HEAD
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
=======
      fetchSports();
    } catch (e) {
      console.error(e);
      alert('Failed to add');
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Are you sure you want to delete this sport?')) return;
    try {
      await api.delete(`/api/sports/${id}`);
      fetchSports();
    } catch (e) {
      console.error(e);
      alert('Failed to delete');
    }
  };

  return (
    <div className="sports-container">
      <div className="sports-header">
        <h2>Sports Management</h2>
        <div className="sports-subtitle">Add, view, and manage all sports</div>
      </div>

      {/* Toggle buttons */}
      <div className="sports-tabs">
        <button
          className={activeTab === 'create' ? 'active' : ''}
          onClick={() => setActiveTab('create')}
        >
          Create Sport
        </button>
        <button
          className={activeTab === 'list' ? 'active' : ''}
          onClick={() => setActiveTab('list')}
        >
          All Sports
        </button>
      </div>

      <div className="sports-main">
        <div className="sports-cards">
          {activeTab === 'create' && (
            <Card title="Create Sport">
              <input
                placeholder="Sport name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <div className="form-row">
                <button onClick={add}>Add Sport</button>
              </div>
            </Card>
          )}

          {activeTab === 'list' && (
            <Card title="All Sports">
              {!list ? (
                <Loading />
              ) : (
                <ul className="sports-list">
                  {list.length === 0 && <li className="small">No sports yet</li>}
                  {list.map(s => (
                    <li key={s.sport_id} className="sports-item">
                      <div>
                        <strong>{s.sport_name}</strong>
                        <div className="small">ID: {s.sport_id}</div>
                      </div>
                      <button className="delete-btn" onClick={() => remove(s.sport_id)}>Delete</button>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          )}
        </div>
      </div>
>>>>>>> ec79867fda4430c2f70a2689b0bdf99802fcbb82
    </div>
  );
}
