import React, { useEffect, useState } from 'react';
import api from '../api/apiClient';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

export default function MatchesPage() {
    const [matches, setMatches] = useState(null);
    const [teams, setTeams] = useState([]);
    const [form, setForm] = useState({
        match_name: '',
        teamA: '',
        teamB: '',
        start_date: '',
        end_date: '',
        location: '',
        winner: ''
    });
    const navigate = useNavigate();

    useEffect(() => { load(); }, []);

    const load = async () => {
        try {
            const m = await api.get('/api/matches');
            setMatches(m.data || []);
            const t = await api.get('/api/teams');
            setTeams(t.data || []);
        } catch (e) {
            console.error(e);
            setMatches([]);
            setTeams([]);
        }
    };

    const addMatch = async () => {
        if (!form.match_name || !form.teamA || !form.teamB || !form.winner) 
            return alert('Fill all fields including winner');
        try {
            const res = await api.post('/api/matches', form);
            setForm({ match_name:'', teamA:'', teamB:'', start_date:'', end_date:'', location:'', winner:'' });
            load();
            navigate(`/results?matchId=${res.data.match_id}`);
        } catch (e) {
            console.error(e);
            alert('Failed to add match');
        }
    };

    return (
        <div className="container">
            <h2>Matches</h2>
            <div className="grid" style={{ marginTop: 12 }}>

                {/* Schedule Match */}
                <Card title="Schedule Match">
                    <input placeholder="Match name" value={form.match_name} onChange={e => setForm({...form, match_name:e.target.value})} />

                    <select value={form.teamA} onChange={e => setForm({...form, teamA:e.target.value, winner:''})}>
                        <option value="">Team A</option>
                        {teams.map(t => <option key={t.team_id} value={t.team_id}>{t.team_name}</option>)}
                    </select>

                    <select value={form.teamB} onChange={e => setForm({...form, teamB:e.target.value, winner:''})}>
                        <option value="">Team B</option>
                        {teams.map(t => <option key={t.team_id} value={t.team_id}>{t.team_name}</option>)}
                    </select>

                    <input type="date" value={form.start_date} onChange={e => setForm({...form, start_date:e.target.value})} />
                    <input type="date" value={form.end_date} onChange={e => setForm({...form, end_date:e.target.value})} />
                    <input placeholder="Location" value={form.location} onChange={e => setForm({...form, location:e.target.value})} />

                    {/* Winner selection */}
                    <select value={form.winner} onChange={e => setForm({...form, winner:e.target.value})}>
                        <option value="">Select Winner</option>
                        {form.teamA && <option value={form.teamA}>{teams.find(t => t.team_id === parseInt(form.teamA))?.team_name}</option>}
                        {form.teamB && <option value={form.teamB}>{teams.find(t => t.team_id === parseInt(form.teamB))?.team_name}</option>}
                    </select>

                    <div className="form-row"><button onClick={addMatch}>Schedule</button></div>
                </Card>

                {/* All Matches */}
                <Card title="All Matches">
                    {!matches ? <Loading /> : (
                        <ul style={{ margin:0, paddingLeft:16 }}>
                            {matches.length === 0 && <li className="small">No matches yet</li>}
                            {matches.map(m => (
                                <li key={m.match_id} style={{ marginBottom:8 }}>
                                    <strong>{m.match_name}</strong>
                                    <div className="small">
                                        Teams: {teams.find(t => t.team_id === m.teamA)?.team_name || '—'} vs {teams.find(t => t.team_id === m.teamB)?.team_name || '—'}
                                    </div>
                                    {/* <div className="small">ID: {m.match_id} • Winner: {teams.find(t => t.team_id === m.winner)?.team_name || '—'}</div> */}
                                    <div style={{marginTop:6}}>
                                        <button onClick={() => navigate(`/results?matchId=${m.match_id}`)}>View Result</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </Card>

            </div>
        </div>
    );
}
