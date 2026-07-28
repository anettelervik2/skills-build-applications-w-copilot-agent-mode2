import { useEffect, useState } from 'react'

const readItems = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.docs)) return payload.docs
  return []
}

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : null

function Teams({ apiBaseUrl }) {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    const loadTeams = async () => {
      try {
        const response = await fetch(teamsEndpoint ?? `${apiBaseUrl}/teams/`)
        if (!response.ok) throw new Error(`Request failed with ${response.status}`)
        const payload = await response.json()

        if (!ignore) {
          setTeams(readItems(payload))
          setStatus('ready')
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message)
          setStatus('error')
        }
      }
    }

    loadTeams()

    return () => {
      ignore = true
    }
  }, [apiBaseUrl])

  if (status === 'loading') return <p className="state-message">Loading teams...</p>
  if (status === 'error') return <p className="state-message">Unable to load teams: {error}</p>

  return (
    <section>
      <div className="section-heading">
        <p className="eyebrow">Groups</p>
        <h2>Teams</h2>
      </div>
      <div className="data-grid teams-grid">
        {teams.map((team) => (
          <article className="data-card" key={team._id ?? team.name}>
            <h3>{team.name}</h3>
            <p>{team.motto}</p>
            <div className="tag-list">
              {(team.members ?? []).map((member) => (
                <span key={member}>{member}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Teams