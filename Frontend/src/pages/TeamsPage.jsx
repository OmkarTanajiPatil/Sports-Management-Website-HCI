import React, { useEffect, useState } from 'react';
import api from '../api/apiClient';
import Card from '../components/Card';
import Loading from '../components/Loading';
import './TeamsPage.css';

export default function TeamsPage() {
  const [sports, setSports] = useState([]);
  const [teams, setTeams] = useState(null);
  const [payload, setPayload] = useState({ sportId: '', name: '' });
  const [activeTab, setActiveTab] = useState('add'); // 'add' or 'list'

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const sp = await api.get('/api/sports');
      setSports(sp.data || []);
      const t = await api.get('/api/teams');
      setTeams(t.data || []);
    } catch (e) {
      console.error(e);
      setSports([]);
      setTeams([]);
    }
  };

  const addTeam = async () => {
    if (!payload.name || !payload.sportId) return alert('Fill all fields');
    try {
      await api.post('/api/teams', {
        team_name: payload.name,
        sport_id: Number(payload.sportId)
      });
      setPayload({ sportId: '', name: '' });
      load();
    } catch (e) {
      console.error(e);
      alert('Failed to add team');
    }
  };

  const removeTeam = async (id) => {
    if (!window.confirm('Are you sure you want to delete this team?')) return;
    try {
      await api.delete(`/api/teams/${id}`);
      load();
    } catch (e) {
      console.error(e);
      alert('Failed to delete team');
    }
  };

  return (
    <div className="teams-container">
      <div className="teams-header">
        <h2>Teams Management</h2>
        <div className="teams-subtitle">Add, view, and manage all teams</div>
      </div>

      {/* Toggle buttons */}
      <div className="teams-tabs">
        <button
          className={activeTab === 'add' ? 'active' : ''}
          onClick={() => setActiveTab('add')}
        >
          Add Team
        </button>
        <button
          className={activeTab === 'list' ? 'active' : ''}
          onClick={() => setActiveTab('list')}
        >
          All Teams
        </button>
      </div>

      <div className="teams-main">
        <div className="teams-cards">

          {activeTab === 'add' && (
            <Card title="Add Team">
              <select
                value={payload.sportId}
                onChange={e => setPayload(p => ({ ...p, sportId: e.target.value }))}
              >
                <option value="">Select sport</option>
                {sports.map(s => (
                  <option key={s.sport_id} value={s.sport_id}>
                    {s.sport_name}
                  </option>
                ))}
              </select>
              <input
                placeholder="Team name"
                value={payload.name}
                onChange={e => setPayload(p => ({ ...p, name: e.target.value }))}
              />
              <div className="form-row">
                <button onClick={addTeam}>Create Team</button>
              </div>
            </Card>
          )}

          {activeTab === 'list' && (
            <Card title="All Teams">
              {!teams ? (
                <Loading />
              ) : (
                <ul className="teams-list">
                  {teams.length === 0 && <li className="small">No teams yet</li>}
                  {teams.map(t => (
                    <li key={t.team_id} className="teams-item">
                      <div>
                        <strong>{t.team_name}</strong>
                        <div className="small">ID: {t.team_id}</div>
                      </div>
                      <button className="delete-btn" onClick={() => removeTeam(t.team_id)}>Delete</button>
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
