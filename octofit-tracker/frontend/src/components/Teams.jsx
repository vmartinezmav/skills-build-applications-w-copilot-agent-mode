import { useEffect, useState } from 'react'
import { API_BASE_URL, getCollectionRows } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    async function loadTeams() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/teams/`, { signal: controller.signal })
        if (!response.ok) throw new Error(`Request failed (${response.status})`)
        setTeams(getCollectionRows(await response.json()))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }
    loadTeams()
    return () => controller.abort()
  }, [])

  return (
    <main className="container py-5">
      <div className="d-flex justify-content-between align-items-end gap-3 mb-4">
        <div><p className="text-uppercase text-success small fw-bold mb-1">Find your crew</p><h1>Teams</h1></div>
        <p className="text-secondary mb-1">Shared goals, stronger momentum.</p>
      </div>
      {loading ? <p>Loading teams…</p> : null}
      {error ? <p className="alert alert-danger" role="alert">Could not load teams: {error}</p> : null}
      {!loading && !error && teams.length === 0 ? <p>No teams have joined yet.</p> : null}
      {teams.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead><tr><th>Team</th><th>Members</th><th>Points</th></tr></thead>
            <tbody>{teams.map((team, index) => (
              <tr key={team._id ?? `${team.name}-${index}`}>
                <td>{team.name}<small className="d-block text-secondary">Team standings</small></td>
                <td>{Array.isArray(team.members) ? team.members.length : 0}</td>
                <td className="fw-bold">{team.points ?? 0}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      ) : null}
    </main>
  )
}

export default Teams