import { useEffect, useState } from 'react'

const readItems = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.docs)) return payload.docs
  return []
}

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : null

const formatDate = (value) => {
  if (!value) return 'Not recorded'
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
}

function Activities({ apiBaseUrl }) {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    const loadActivities = async () => {
      try {
        const response = await fetch(activitiesEndpoint ?? `${apiBaseUrl}/activities/`)
        if (!response.ok) throw new Error(`Request failed with ${response.status}`)
        const payload = await response.json()

        if (!ignore) {
          setActivities(readItems(payload))
          setStatus('ready')
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message)
          setStatus('error')
        }
      }
    }

    loadActivities()

    return () => {
      ignore = true
    }
  }, [apiBaseUrl])

  if (status === 'loading') return <p className="state-message">Loading activities...</p>
  if (status === 'error') return <p className="state-message">Unable to load activities: {error}</p>

  return (
    <section>
      <div className="section-heading">
        <p className="eyebrow">Logs</p>
        <h2>Activities</h2>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Team</th>
              <th>Type</th>
              <th>Minutes</th>
              <th>Calories</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id ?? `${activity.user}-${activity.completedAt}`}>
                <td>{activity.user}</td>
                <td>{activity.team}</td>
                <td>{activity.type}</td>
                <td>{activity.durationMinutes}</td>
                <td>{activity.caloriesBurned}</td>
                <td>{formatDate(activity.completedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Activities