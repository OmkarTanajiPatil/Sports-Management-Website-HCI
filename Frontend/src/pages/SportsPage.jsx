import React, { useEffect, useState } from 'react';
import api from '../api/apiClient';
import Card from '../components/Card';
import Loading from '../components/Loading';

export default function SportsPage() {
    const [list, setList] = useState(null);
    const [name, setName] = useState('');

    useEffect(() => { fetchSports(); }, []);

    const fetchSports = async () => {
        try {
            const { data } = await api.get('/api/sports');
            setList(data);
        } catch (e) { console.error(e); setList([]); }
    };

    const add = async () => {
        if (!name) return alert('Enter sport name');
        try {
            await api.post('/api/sports', { name });
            setName('');
            fetchSports();
        } catch (e) { console.error(e); alert('Failed to add'); }
    };

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Sports</h2>
            </div>

            <div className="grid" style={{ marginTop: 12 }}>
                <Card title="Create Sport">
                    <input placeholder="Sport name" value={name} onChange={e => setName(e.target.value)} />
                    <div className="form-row"><button onClick={add}>Add Sport</button></div>
                </Card>

                <Card title="All Sports">
                    {!list ? <Loading /> : (
                        <ul style={{ margin: 0, paddingLeft: 16 }}>
                            {list.length === 0 && <li className="small">No sports yet</li>}
                            {list.map(s => (
                                <li key={s.sport_id} style={{ marginBottom: 8 }}>
                                    <strong>{s.sport_name}</strong>
                                    <div className="small">ID: {s.sport_id}</div>
                                </li>
                            ))}

                        </ul>
                    )}
                </Card>
            </div>
        </div>
    );
}
