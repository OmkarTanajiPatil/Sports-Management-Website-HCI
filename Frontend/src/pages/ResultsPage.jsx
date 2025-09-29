import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../api/apiClient';
import Card from '../components/Card';
import Loading from '../components/Loading';

export default function ResultsPage() {
    const [searchParams] = useSearchParams();
    const matchId = searchParams.get('matchId');
    const [match, setMatch] = useState(null);
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => { if(matchId) load(); }, [matchId]);

    const load = async () => {
        setLoading(true);
        try {
            const resMatches = await api.get('/api/matches');
            const m = resMatches.data.find(x => x.match_id === parseInt(matchId));
            setMatch(m || null);

            const resTeams = await api.get('/api/teams');
            setTeams(resTeams.data || []);
        } catch (e) {
            console.error(e);
            setMatch(null);
            setTeams([]);
        } finally {
            setLoading(false);
        }
    };

    const getTeamName = (teamId) => teams.find(t => t.team_id === teamId)?.team_name || '—';

    const getWinnerStyle = (teamId) => ({
        fontWeight: match?.winner === teamId ? '700' : '400',
        color: match?.winner === teamId ? '#2dd4bf' : '#fff'
    });

    return (
        <div className="container">
            <h2 style={{ textAlign:'center', marginBottom:'24px' }}>Match Result</h2>
            {loading ? <Loading /> : !match ? (
                <p className="small">Match not found</p>
            ) : (
                <Card title={match.match_name}>
                    <p style={{ marginBottom: '12px' }}>
                        <span style={getWinnerStyle(match.teamA)}>{getTeamName(match.teamA)}</span> vs 
                        <span style={getWinnerStyle(match.teamB)}> {getTeamName(match.teamB)}</span>
                    </p>
                    <p className="small">
                        <strong>Start:</strong> {match.start_date || '—'} <br/>
                        <strong>End:</strong> {match.end_date || '—'} <br/>
                        <strong>Location:</strong> {match.location || '—'} <br/>
                        <strong>Winner:</strong> <span style={{ color:'#2dd4bf', fontWeight:700 }}>{getTeamName(match.winner)}</span>
                    </p>
                    <div style={{ marginTop:12 }}>
                        <button className="btn-primary" onClick={() => navigate('/matches')}>Back to Matches</button>
                    </div>
                </Card>
            )}
        </div>
    );
}
