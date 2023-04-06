import AuthForm from './AuthForm'
import Button from './Button'
import { authenticate } from './auth'
import { useState } from 'react'

const STATES = {
  AUTH: 'auth',
  SESSION: 'session',
}

export default function App() {
  const [state, setState] = useState(STATES.AUTH)
  const [user, setUser] = useState(null)

  if (state === STATES.AUTH) {
    return (
      <div className="min-h-screen grid place-items-center gap-[1ch]">
        <AuthForm
          onSubmit={async (values) => {
            const auth = await authenticate(values)

            setUser(auth.user)
            setState(STATES.SESSION)
          }}
        />
      </div>
    )
  }

  if (state === STATES.SESSION) {
    return (
      <div className="min-h-screen grid place-items-center gap-[1ch] text-center">
        <div>
          <p className="mb-3">Welcome, {user.username}</p>
          <Button
            onClick={() => {
              setUser(null)
              setState(STATES.AUTH)
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    )
  }
}
