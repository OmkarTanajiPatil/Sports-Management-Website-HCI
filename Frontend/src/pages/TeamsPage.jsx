import React, { useEffect, useState } from 'react';
import api from '../api/apiClient';
import Card from '../components/Card';
import Loading from '../components/Loading';
import './TeamsPage.css';

export default function TeamsPage() {
<<<<<<< HEAD
    const [sports, setSports] = useState([]);
    const [teams, setTeams] = useState([]);
    const [filteredTeams, setFilteredTeams] = useState([]);
    const [payload, setPayload] = useState({ sportId: '', name: '' });
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
=======
  const [sports, setSports] = useState([]);
  const [teams, setTeams] = useState(null);
  const [payload, setPayload] = useState({ sportId: '', name: '' });
  const [activeTab, setActiveTab] = useState('add'); // 'add' or 'list'
>>>>>>> ec79867fda4430c2f70a2689b0bdf99802fcbb82

  useEffect(() => { load(); }, []);

<<<<<<< HEAD
    const load = async () => {
        setLoading(true);
        try {
            const sp = await api.get('/api/sports');
            setSports(sp.data || []);
            const t = await api.get('/api/teams');
            setTeams(t.data || []);
            setFilteredTeams(t.data || []);
        } catch (e) {
            console.error(e);
            setSports([]);
            setTeams([]);
            setFilteredTeams([]);
        } finally {
            setLoading(false);
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

    const deleteTeam = async (id) => {
        if (!window.confirm('Are you sure you want to delete this team?')) return;
        try {
            await api.delete(`/api/teams/${id}`);
            load();
        } catch (e) {
            console.error(e);
            alert('Failed to delete team');
        }
    };

    const filterTeams = () => {
        let filtered = teams;
        if (search) filtered = filtered.filter(t => t.team_name.toLowerCase().includes(search.toLowerCase()));
        setFilteredTeams(filtered);
    };

    useEffect(() => { filterTeams(); }, [search, teams]);

    return (
        <div className="container">
            <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Team Management</h2>

            <div className="grid">

                {/* Add Team Card */}
                <Card title="Add Team">
                    <select
                        value={payload.sportId}
                        onChange={e => setPayload(p => ({ ...p, sportId: e.target.value }))}
                    >
                        <option value="">Select sport</option>
                        {sports.map(s => (
                            <option key={s.sport_id} value={s.sport_id}>{s.sport_name}</option>
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

                {/* All Teams Card */}
                <Card title="All Teams">
                    <input
                        className="search-box"
                        placeholder="Search by team name..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    {loading ? <Loading /> : (
                        <ul style={{ margin: 0, paddingLeft: 16 }}>
                            {filteredTeams.length === 0 && <li className="small">No teams found</li>}
                            {filteredTeams.map(t => (
                                <li key={t.team_id} style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.02)' }}>
                                    <div>
                                        <strong>{t.team_name}</strong>
                                        <div className="small">ID: {t.team_id} | Sport: {sports.find(s => s.sport_id === t.sport_id)?.sport_name || 'Unknown'}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button className="btn-secondary" onClick={() => deleteTeam(t.team_id)}>Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </Card>
=======
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
>>>>>>> ec79867fda4430c2f70a2689b0bdf99802fcbb82

        </div>
      </div>
    </div>
  );
}
