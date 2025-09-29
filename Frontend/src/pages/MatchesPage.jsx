import React, { useEffect, useState } from 'react';
import api from '../api/apiClient';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

export default function MatchesPage() {
    const [matches, setMatches] = useState([]);
    const [teams, setTeams] = useState([]);
    const [filteredMatches, setFilteredMatches] = useState([]);
    const [form, setForm] = useState({
        match_name: '',
        teamA: '',
        teamB: '',
        start_date: '',
        end_date: '',
        location: '',
        winner: ''
    });
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => { load(); }, []);

    const load = async () => {
        setLoading(true);
        try {
            const m = await api.get('/api/matches');
            setMatches(m.data || []);
            setFilteredMatches(m.data || []);
            const t = await api.get('/api/teams');
            setTeams(t.data || []);
        } catch (e) {
            console.error(e);
            setMatches([]);
            setFilteredMatches([]);
            setTeams([]);
        } finally {
            setLoading(false);
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

    const deleteMatch = async (id) => {
        if (!window.confirm('Are you sure you want to delete this match?')) return;
        try {
            await api.delete(`/api/matches/${id}`);
            load();
        } catch (e) {
            console.error(e);
            alert('Failed to delete match');
        }
    };

    const filterMatches = () => {
        if (!search) return setFilteredMatches(matches);
        const filtered = matches.filter(m => 
            m.match_name.toLowerCase().includes(search.toLowerCase()) ||
            (teams.find(t => t.team_id === m.teamA)?.team_name.toLowerCase().includes(search.toLowerCase()) || false) ||
            (teams.find(t => t.team_id === m.teamB)?.team_name.toLowerCase().includes(search.toLowerCase()) || false)
        );
        setFilteredMatches(filtered);
    };

    useEffect(() => { filterMatches(); }, [search, matches, teams]);

    return (
        <div className="container">
            <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Match Management</h2>

            <div className="grid">

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

                    <select value={form.winner} onChange={e => setForm({...form, winner:e.target.value})}>
                        <option value="">Select Winner</option>
                        {form.teamA && <option value={form.teamA}>{teams.find(t => t.team_id === parseInt(form.teamA))?.team_name}</option>}
                        {form.teamB && <option value={form.teamB}>{teams.find(t => t.team_id === parseInt(form.teamB))?.team_name}</option>}
                    </select>

                    <div className="form-row">
                        <button onClick={addMatch}>Schedule</button>
                    </div>
                </Card>

                {/* All Matches */}
                <Card title="All Matches">
                    <input
                        className="search-box"
                        placeholder="Search matches..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    {loading ? <Loading /> : (
                        <ul style={{ margin:0, paddingLeft:16 }}>
                            {filteredMatches.length === 0 && <li className="small">No matches found</li>}
                            {filteredMatches.map(m => (
                                <li key={m.match_id} style={{ marginBottom:12, display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 10px', borderRadius:8, background:'rgba(255,255,255,0.02)' }}>
                                    <div>
                                        <strong>{m.match_name}</strong>
                                        <div className="small">
                                            {teams.find(t => t.team_id === m.teamA)?.team_name || '—'} vs {teams.find(t => t.team_id === m.teamB)?.team_name || '—'}
                                        </div>
                                        <div className="small">
                                            Start: {m.start_date || '—'} | End: {m.end_date || '—'} | Location: {m.location || '—'} | Winner: {teams.find(t => t.team_id === m.winner)?.team_name || '—'}
                                        </div>
                                    </div>
                                    <div style={{ display:'flex', gap:'8px' }}>
                                        <button onClick={() => navigate(`/results?matchId=${m.match_id}`)}>View Result</button>
                                        <button className="btn-secondary" onClick={() => deleteMatch(m.match_id)}>Delete</button>
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
