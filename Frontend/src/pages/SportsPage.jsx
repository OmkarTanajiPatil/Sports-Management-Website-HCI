import React, { useEffect, useState } from 'react';
import api from '../api/apiClient';
import Card from '../components/Card';
import Loading from '../components/Loading';
import './SportsPage.css';

export default function SportsPage() {
  const [list, setList] = useState(null);
  const [name, setName] = useState('');
  const [activeTab, setActiveTab] = useState('create'); // 'create' or 'list'

  useEffect(() => { fetchSports(); }, []);

  const fetchSports = async () => {
    try {
      const { data } = await api.get('/api/sports');
      setList(data);
    } catch (e) {
      console.error(e);
      setList([]);
    }
  };

  const add = async () => {
    if (!name) return alert('Enter sport name');
    try {
      await api.post('/api/sports', { name });
      setName('');
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
    </div>
  );
}
