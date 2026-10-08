import { useEffect, useState } from 'react'
import { API_BASE_URL, getCollectionRows } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    async function loadUsers() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/`, { signal: controller.signal })
        if (!response.ok) throw new Error(`Request failed (${response.status})`)
        setUsers(getCollectionRows(await response.json()))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }
    loadUsers()
    return () => controller.abort()
  }, [])

  return (
    <main className="container py-5">
      <div className="d-flex justify-content-between align-items-end gap-3 mb-4">
        <div><p className="text-uppercase text-success small fw-bold mb-1">Your community</p><h1>Members</h1></div>
        <p className="text-secondary mb-1">Meet the people moving with you.</p>
      </div>
      {loading ? <p>Loading members…</p> : null}
      {error ? <p className="alert alert-danger" role="alert">Could not load members: {error}</p> : null}
      {!loading && !error && users.length === 0 ? <p>No members registered yet.</p> : null}
      {users.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead><tr><th>Name</th><th>Email</th><th>Team</th></tr></thead>
            <tbody>{users.map((user, index) => (
              <tr key={user._id ?? user.email ?? index}>
                <td>{user.name}<small className="d-block text-secondary">OctoFit member</small></td>
                <td>{user.email}</td>
                <td>{user.teamId ? String(user.teamId).slice(-8) : 'Unassigned'}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      ) : null}
    </main>
  )
}

export default Users