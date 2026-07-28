import { useEffect, useState } from 'react'

const readItems = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.docs)) return payload.docs
  return []
}

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : null

function Workouts({ apiBaseUrl }) {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    const loadWorkouts = async () => {
      try {
        const response = await fetch(workoutsEndpoint ?? `${apiBaseUrl}/workouts/`)
        if (!response.ok) throw new Error(`Request failed with ${response.status}`)
        const payload = await response.json()

        if (!ignore) {
          setWorkouts(readItems(payload))
          setStatus('ready')
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message)
          setStatus('error')
        }
      }
    }

    loadWorkouts()

    return () => {
      ignore = true
    }
  }, [apiBaseUrl])

  if (status === 'loading') return <p className="state-message">Loading workouts...</p>
  if (status === 'error') return <p className="state-message">Unable to load workouts: {error}</p>

  return (
    <section>
      <div className="section-heading">
        <p className="eyebrow">Suggestions</p>
        <h2>Workouts</h2>
      </div>
      <div className="data-grid workouts-grid">
        {workouts.map((workout) => (
          <article className="data-card" key={workout._id ?? workout.name}>
            <span className="pill">{workout.difficulty}</span>
            <h3>{workout.name}</h3>
            <p>{workout.focus}</p>
            <dl>
              <div>
                <dt>Duration</dt>
                <dd>{workout.durationMinutes} min</dd>
              </div>
              <div>
                <dt>Best for</dt>
                <dd>{workout.suggestedFor}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Workouts