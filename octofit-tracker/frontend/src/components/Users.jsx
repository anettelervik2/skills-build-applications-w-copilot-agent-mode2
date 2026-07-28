import { useEffect, useState } from 'react'

const readItems = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.docs)) return payload.docs
  return []
}

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : null

function Users({ apiBaseUrl }) {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    const loadUsers = async () => {
      try {
        const response = await fetch(usersEndpoint ?? `${apiBaseUrl}/users/`)
        if (!response.ok) throw new Error(`Request failed with ${response.status}`)
        const payload = await response.json()

        if (!ignore) {
          setUsers(readItems(payload))
          setStatus('ready')
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message)
          setStatus('error')
        }
      }
    }

    loadUsers()

    return () => {
      ignore = true
    }
  }, [apiBaseUrl])

  if (status === 'loading') return <p className="state-message">Loading users...</p>
  if (status === 'error') return <p className="state-message">Unable to load users: {error}</p>

  return (
    <section>
      <div className="section-heading">
        <p className="eyebrow">Profiles</p>
        <h2>Users</h2>
      </div>
      <div className="data-grid users-grid">
        {users.map((user) => (
          <article className="data-card" key={user._id ?? user.email}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <dl>
              <div>
                <dt>Team</dt>
                <dd>{user.team}</dd>
              </div>
              <div>
                <dt>Age</dt>
                <dd>{user.age}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Users