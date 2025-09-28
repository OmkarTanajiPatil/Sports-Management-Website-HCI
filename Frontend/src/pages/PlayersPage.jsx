import React, { useEffect, useState } from 'react';
import api from '../api/apiClient';
import Card from '../components/Card';
import Loading from '../components/Loading';

export default function PlayersPage() {
    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);
    const [form, setForm] = useState({ teamId: '', firstName: '', middleName: '', lastName: '', dob: '', phNumber: '' });
    const [file, setFile] = useState(null);

    useEffect(() => { loadTeams(); }, []);

    const loadTeams = async () => {
        try {
            const t = await api.get('/api/teams');
            setTeams(t.data || []);
        } catch (e) {
            console.error(e);
            setTeams([]);
        }
    };

    const fetchPlayers = async teamId => {
        if (!teamId) return setPlayers([]);
        try {
            const res = await api.get('/api/players', { params: { teamId } });
            setPlayers(res.data || []);
        } catch (e) {
            console.error(e);
            setPlayers([]);
        }
    };

    const addPlayer = async () => {
        if (!form.teamId || !form.firstName) return alert('Fill team & first name');
        try {
            const fd = new FormData();
            fd.append('team_id', form.teamId);
            fd.append('first_name', form.firstName);
            fd.append('middle_name', form.middleName);
            fd.append('last_name', form.lastName);
            fd.append('dob', form.dob);
            fd.append('ph_number', form.phNumber);
            if (file) fd.append('doc', file);

            await api.post('/api/players', fd, { headers: { 'Content-Type': 'multipart/form-data' } });

            // Reset form & refresh
            setForm({ teamId: '', firstName: '', middleName: '', lastName: '', dob: '', phNumber: '' });
            setFile(null);
            fetchPlayers(form.teamId);
        } catch (e) {
            console.error(e);
            alert('Failed to add player');
        }
    };

    return (
        <div className="container">
            <h2>Players</h2>
            <div className="grid" style={{ marginTop: 12 }}>

                <Card title="Add Player">
                    <select
                        value={form.teamId}
                        onChange={e => { setForm({ ...form, teamId: e.target.value }); fetchPlayers(e.target.value); }}
                    >
                        <option value="">Select team</option>
                        {teams.map(t => <option key={t.team_id} value={t.team_id}>{t.team_name}</option>)}
                    </select>

                    <input placeholder="First name" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
                    <input placeholder="Middle name" value={form.middleName} onChange={e => setForm({ ...form, middleName: e.target.value })} />
                    <input placeholder="Last name" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
                    <input type="date" value={form.dob} onChange={e => setForm({ ...form, dob: e.target.value })} />
                    <input placeholder="Phone number" value={form.phNumber} onChange={e => setForm({ ...form, phNumber: e.target.value })} />
                    <div style={{ marginTop: 8 }}>
                        <input type="file" onChange={e => setFile(e.target.files[0])} />
                    </div>
                    <div className="form-row"><button onClick={addPlayer}>Add Player</button></div>
                </Card>

                <Card title="Team Players">
                    {!players ? <Loading /> : (
                        <ul style={{ margin: 0, paddingLeft: 16 }}>
                            {players.length === 0 && <li className="small">No players yet</li>}
                            {players.map(p => (
                                <li key={p.player_id} style={{ marginBottom: 8 }}>
                                    <strong>{p.first_name} {p.middle_name || ''} {p.last_name || ''}</strong>
                                    <div className="small">DOB: {p.dob || '—'}</div>
                                    <div className="small">Phone: {p.ph_number || '—'}</div>
                                </li>
                            ))}
                        </ul>
                    )}
                </Card>

            </div>
        </div>
    );
}
