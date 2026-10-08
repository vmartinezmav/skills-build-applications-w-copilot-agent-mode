import { useEffect, useState } from 'react'
import { API_BASE_URL, getCollectionRows } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    async function loadLeaderboard() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/leaderboard/`, { signal: controller.signal })
        if (!response.ok) throw new Error(`Request failed (${response.status})`)
        setEntries(getCollectionRows(await response.json()))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }
    loadLeaderboard()
    return () => controller.abort()
  }, [])

  return (
    <main className="container py-5">
      <div className="d-flex justify-content-between align-items-end gap-3 mb-4">
        <div><p className="text-uppercase text-success small fw-bold mb-1">Friendly competition</p><h1>Leaderboard</h1></div>
        <p className="text-secondary mb-1">Points earned by members and teams.</p>
      </div>
      {loading ? <p>Loading leaderboard…</p> : null}
      {error ? <p className="alert alert-danger" role="alert">Could not load leaderboard: {error}</p> : null}
      {!loading && !error && entries.length === 0 ? <p>No rankings available yet.</p> : null}
      {entries.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead><tr><th>Rank</th><th>Entry</th><th>Period</th><th>Points</th></tr></thead>
            <tbody>{entries.map((entry, index) => (
              <tr key={entry._id ?? `${entry.rank}-${index}`}>
                <td>{entry.rank ?? index + 1}</td>
                <td>{entry.teamId ? 'Team' : 'Member'}<small className="d-block text-secondary">{String(entry.teamId ?? entry.userId ?? '—').slice(-8)}</small></td>
                <td>{entry.period ?? 'All time'}</td>
                <td className="fw-bold">{entry.points ?? 0}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      ) : null}
    </main>
  )
}

export default Leaderboard