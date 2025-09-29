import React, { useEffect, useState } from "react";
import api from "../api/apiClient";
import Card from "../components/Card";
import Loading from "../components/Loading";
import "./PlayerPage.css";

export default function PlayersPage() {
<<<<<<< HEAD
    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [form, setForm] = useState({ teamId: '', firstName: '', middleName: '', lastName: '', dob: '', phNumber: '' });
    const [file, setFile] = useState(null);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
=======
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [form, setForm] = useState({
    teamId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    phNumber: "",
  });
  const [file, setFile] = useState(null);
  const [activeTab, setActiveTab] = useState("add"); // 'add' or 'list'
>>>>>>> ec79867fda4430c2f70a2689b0bdf99802fcbb82

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      const t = await api.get("/api/teams");
      setTeams(t.data || []);
    } catch (e) {
      console.error(e);
      setTeams([]);
    }
  };

<<<<<<< HEAD
    const fetchPlayers = async teamId => {
        if (!teamId) return setPlayers([]);
        setLoading(true);
        try {
            const res = await api.get('/api/players', { params: { teamId } });
            setPlayers(res.data || []);
            setFilteredPlayers(res.data || []);
        } catch (e) {
            console.error(e);
            setPlayers([]);
            setFilteredPlayers([]);
        } finally {
            setLoading(false);
        }
    };
=======
  const fetchPlayers = async (teamId) => {
    if (!teamId) return setPlayers([]);
    try {
      const res = await api.get("/api/players", { params: { teamId } });
      setPlayers(res.data || []);
    } catch (e) {
      console.error(e);
      setPlayers([]);
    }
  };
>>>>>>> ec79867fda4430c2f70a2689b0bdf99802fcbb82

  const addPlayer = async () => {
    if (!form.teamId || !form.firstName) return alert("Fill team & first name");
    try {
      const fd = new FormData();
      fd.append("team_id", form.teamId);
      fd.append("first_name", form.firstName);
      fd.append("middle_name", form.middleName);
      fd.append("last_name", form.lastName);
      fd.append("dob", form.dob);
      fd.append("ph_number", form.phNumber);
      if (file) fd.append("doc", file);

      await api.post("/api/players", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

<<<<<<< HEAD
            setForm({ teamId: '', firstName: '', middleName: '', lastName: '', dob: '', phNumber: '' });
            setFile(null);
            fetchPlayers(form.teamId);
        } catch (e) {
            console.error(e);
            alert('Failed to add player');
        }
    };

    const deletePlayer = async id => {
        if (!window.confirm('Are you sure you want to delete this player?')) return;
        try {
            await api.delete(`/api/players/${id}`);
            fetchPlayers(form.teamId);
        } catch (e) {
            console.error(e);
            alert('Failed to delete player');
        }
    };

    const filterPlayers = () => {
        if (!search) return setFilteredPlayers(players);
        const filtered = players.filter(p => 
            `${p.first_name} ${p.middle_name || ''} ${p.last_name || ''}`
            .toLowerCase()
            .includes(search.toLowerCase())
        );
        setFilteredPlayers(filtered);
    };

    useEffect(() => { filterPlayers(); }, [search, players]);

    return (
        <div className="container">
            <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Player Management</h2>

            <div className="grid">

                {/* Add Player Card */}
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

                {/* Player List Card */}
                <Card title="Team Players">
                    <input
                        className="search-box"
                        placeholder="Search player..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    {loading ? <Loading /> : (
                        <ul style={{ margin: 0, paddingLeft: 16 }}>
                            {filteredPlayers.length === 0 && <li className="small">No players found</li>}
                            {filteredPlayers.map(p => (
                                <li key={p.player_id} style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.02)' }}>
                                    <div>
                                        <strong>{p.first_name} {p.middle_name || ''} {p.last_name || ''}</strong>
                                        <div className="small">DOB: {p.dob || '—'} | Phone: {p.ph_number || '—'}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button className="btn-secondary" onClick={() => deletePlayer(p.player_id)}>Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </Card>

            </div>
=======
      // Reset form & refresh
      setForm({
        teamId: "",
        firstName: "",
        middleName: "",
        lastName: "",
        dob: "",
        phNumber: "",
      });
      setFile(null);
      fetchPlayers(form.teamId);
    } catch (e) {
      console.error(e);
      alert("Failed to add player");
    }
  };

  const removePlayer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this player?")) return;
    try {
      await api.delete(`/api/players/${id}`);
      fetchPlayers(form.teamId);
    } catch (e) {
      console.error(e);
      alert("Failed to delete player");
    }
  };

  return (
    <div className="players-container">
      <div className="players-header">
        <h2>Players Management</h2>
        <div className="players-subtitle">
          Add, view, and manage all players
>>>>>>> ec79867fda4430c2f70a2689b0bdf99802fcbb82
        </div>
      </div>

      {/* Toggle buttons */}
      <div className="players-tabs">
        <button
          className={activeTab === "add" ? "active" : ""}
          onClick={() => setActiveTab("add")}
        >
          Add Player
        </button>
        <button
          className={activeTab === "list" ? "active" : ""}
          onClick={() => setActiveTab("list")}
        >
          Team Players
        </button>
      </div>

      <div className="players-main">
        <div className="players-cards">
          {activeTab === "add" && (
            <Card title="Add Player">
              <div className="add-player-card">
                <select
                  value={form.teamId}
                  onChange={(e) => {
                    setForm({ ...form, teamId: e.target.value });
                    fetchPlayers(e.target.value);
                  }}
                >
                  <option value="">Select team</option>
                  {teams.map((t) => (
                    <option key={t.team_id} value={t.team_id}>
                      {t.team_name}
                    </option>
                  ))}
                </select>

                <div className="row">
                  <input
                    placeholder="First name"
                    value={form.firstName}
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                  />
                  <input
                    placeholder="Middle name"
                    value={form.middleName}
                    onChange={(e) =>
                      setForm({ ...form, middleName: e.target.value })
                    }
                  />
                </div>

                <input
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                />
                <input
                  type="date"
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                />
                <input
                  placeholder="Phone number"
                  value={form.phNumber}
                  onChange={(e) =>
                    setForm({ ...form, phNumber: e.target.value })
                  }
                />

                <div className="file-input">
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>

                <button onClick={addPlayer}>Add Player</button>
              </div>
            </Card>
          )}

          {activeTab === "list" && (
            <Card title="Team Players">
              {!players ? (
                <Loading />
              ) : players.length === 0 ? (
                <div className="small">No players yet</div>
              ) : (
                <table className="players-table">
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Middle Name</th>
                      <th>Last Name</th>
                      <th>DOB</th>
                      <th>Phone</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((p) => (
                      <tr key={p.player_id}>
                        <td>{p.first_name}</td>
                        <td>{p.middle_name || "-"}</td>
                        <td>{p.last_name || "-"}</td>
                        <td>{p.dob || "-"}</td>
                        <td>{p.ph_number || "-"}</td>
                        <td>
                          <button
                            className="delete-btn"
                            onClick={() => removePlayer(p.player_id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
