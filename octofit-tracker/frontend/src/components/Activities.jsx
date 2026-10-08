import { useEffect, useState } from 'react'
import { API_BASE_URL, getCollectionRows } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    async function loadActivities() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/activities/`, { signal: controller.signal })
        if (!response.ok) throw new Error(`Request failed (${response.status})`)
        setActivities(getCollectionRows(await response.json()))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }
    loadActivities()
    return () => controller.abort()
  }, [])

  return (
    <main className="container py-5">
      <div className="d-flex justify-content-between align-items-end gap-3 mb-4">
        <div><p className="text-uppercase text-success small fw-bold mb-1">Training log</p><h1>Activities</h1></div>
        <p className="text-secondary mb-1">Recent movement from across your teams.</p>
      </div>
      {loading ? <p>Loading activities…</p> : null}
      {error ? <p className="alert alert-danger" role="alert">Could not load activities: {error}</p> : null}
      {!loading && !error && activities.length === 0 ? <p>No activities recorded yet.</p> : null}
      {activities.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead><tr><th>Activity</th><th>Duration</th><th>Distance</th><th>Points</th><th>Logged</th></tr></thead>
            <tbody>{activities.map((activity, index) => (
              <tr key={activity._id ?? `${activity.activityType}-${index}`}>
                <td>{activity.activityType}<small className="d-block text-secondary">Member {String(activity.userId ?? '—').slice(-6)}</small></td>
                <td>{activity.durationMinutes} min</td>
                <td>{activity.distanceKm == null ? '—' : `${activity.distanceKm} km`}</td>
                <td>{activity.points ?? 0}</td>
                <td>{activity.loggedAt ? new Date(activity.loggedAt).toLocaleDateString() : '—'}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      ) : null}
    </main>
  )
}

export default Activities