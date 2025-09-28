import React, { useEffect, useState } from 'react';
import api from '../api/apiClient';
import Card from '../components/Card';
import Loading from '../components/Loading';

export default function TeamsPage() {
    const [sports, setSports] = useState([]);
    const [teams, setTeams] = useState(null);
    const [payload, setPayload] = useState({ sportId: '', name: '' });

    useEffect(() => { load(); }, []);

    // Load sports and teams
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

    // Add team
    const addTeam = async () => {
        if (!payload.name || !payload.sportId) return alert('Fill all fields');
        try {
            await api.post('/api/teams', {
                team_name: payload.name,
                sport_id: Number(payload.sportId)
            });
            setPayload({ sportId: '', name: '' });
            load(); // refresh list
        } catch (e) {
            console.error(e);
            alert('Failed to add team');
        }
    };

    return (
        <div className="container">
            <h2>Teams</h2>
            <div className="grid" style={{ marginTop: 12 }}>

                {/* Add Team Card */}
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
                    <div className="form-row"><button onClick={addTeam}>Create Team</button></div>
                </Card>

                {/* All Teams Card */}
                <Card title="All Teams">
                    {!teams ? <Loading /> : (
                        <ul style={{ margin: 0, paddingLeft: 16 }}>
                            {teams.length === 0 && <li className="small">No teams yet</li>}
                            {teams.map(t => (
                                <li key={t.team_id} style={{ marginBottom: 8 }}>
                                    <strong>{t.team_name}</strong>
                                    <div className="small">ID: {t.team_id}</div>
                                </li>
                            ))}
                        </ul>
                    )}
                </Card>

            </div>
        </div>
    );
}
