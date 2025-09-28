import React, { useEffect, useState } from "react";
import api from "../api/apiClient";
import Card from "../components/Card";
import Loading from "../components/Loading";
import "./PlayerPage.css";

export default function PlayersPage() {
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
