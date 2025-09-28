import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/apiClient';
import Card from '../components/Card';

export default function ResultsPage() {
    const [searchParams] = useSearchParams();
    const matchId = searchParams.get('matchId');
    const [match, setMatch] = useState(null);
    const [teams, setTeams] = useState([]);

    useEffect(() => { if(matchId) load(); }, [matchId]);

    const load = async () => {
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
        }
    };

    const getTeamName = (teamId) => teams.find(t => t.team_id === teamId)?.team_name || '—';

    return (
        <div className="container">
            <h2>Match Result</h2>
            {!match ? (
                <p>Loading...</p>
            ) : (
                <Card title={match.match_name}>
                    <p>
                        Teams: {getTeamName(match.teamA)} vs {getTeamName(match.teamB)} <br/>
                        Winner: {getTeamName(match.winner)}
                    </p>
                </Card>
            )}
        </div>
    );
}
