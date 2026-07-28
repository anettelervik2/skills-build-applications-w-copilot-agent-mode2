import { useEffect, useState } from 'react'

const readItems = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.docs)) return payload.docs
  return []
}

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : null

function Leaderboard({ apiBaseUrl }) {
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    const loadLeaderboard = async () => {
      try {
        const response = await fetch(leaderboardEndpoint ?? `${apiBaseUrl}/leaderboard/`)
        if (!response.ok) throw new Error(`Request failed with ${response.status}`)
        const payload = await response.json()

        if (!ignore) {
          setEntries(readItems(payload))
          setStatus('ready')
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message)
          setStatus('error')
        }
      }
    }

    loadLeaderboard()

    return () => {
      ignore = true
    }
  }, [apiBaseUrl])

  if (status === 'loading') return <p className="state-message">Loading leaderboard...</p>
  if (status === 'error') return <p className="state-message">Unable to load leaderboard: {error}</p>

  return (
    <section>
      <div className="section-heading">
        <p className="eyebrow">Competition</p>
        <h2>Leaderboard</h2>
      </div>
      <ol className="leaderboard-list">
        {entries.map((entry) => (
          <li key={entry._id ?? `${entry.rank}-${entry.user}`}>
            <span className="rank">#{entry.rank}</span>
            <span>
              <strong>{entry.user}</strong>
              <small>{entry.team}</small>
            </span>
            <span className="points">{entry.points} pts</span>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Leaderboard