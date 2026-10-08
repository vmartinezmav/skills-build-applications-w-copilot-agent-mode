import { useEffect, useState } from 'react'
import { API_BASE_URL, getCollectionRows } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    async function loadWorkouts() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/workouts/`, { signal: controller.signal })
        if (!response.ok) throw new Error(`Request failed (${response.status})`)
        setWorkouts(getCollectionRows(await response.json()))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }
    loadWorkouts()
    return () => controller.abort()
  }, [])

  return (
    <main className="container py-5">
      <div className="d-flex justify-content-between align-items-end gap-3 mb-4">
        <div><p className="text-uppercase text-success small fw-bold mb-1">Plan your next session</p><h1>Workouts</h1></div>
        <p className="text-secondary mb-1">Sessions to keep your progress moving.</p>
      </div>
      {loading ? <p>Loading workouts…</p> : null}
      {error ? <p className="alert alert-danger" role="alert">Could not load workouts: {error}</p> : null}
      {!loading && !error && workouts.length === 0 ? <p>No workouts available yet.</p> : null}
      {workouts.length > 0 ? (
        <div className="list-group list-group-flush">
          {workouts.map((workout, index) => (
            <article className="list-group-item py-4" key={workout._id ?? `${workout.title}-${index}`}>
              <div className="d-flex justify-content-between gap-3">
                <div>
                  <p className="text-uppercase text-success small fw-bold mb-1">{workout.difficulty ?? 'All levels'} · {workout.durationMinutes ?? '—'} min</p>
                  <h2 className="h4">{workout.title}</h2>
                  <p className="text-secondary mb-2">{workout.description}</p>
                  {Array.isArray(workout.exercises) && workout.exercises.length > 0 ? <ul className="mb-0">{workout.exercises.map((exercise, exerciseIndex) => <li key={`${exercise}-${exerciseIndex}`}>{exercise}</li>)}</ul> : null}
                </div>
                <span className="text-secondary font-monospace">{String(index + 1).padStart(2, '0')}</span>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </main>
  )
}

export default Workouts