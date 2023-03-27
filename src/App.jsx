import AuthForm from './AuthForm'
import Button from './Button'
import { useState } from 'react'

export default function App() {
  const [state, setState] = useState('auth')
  const [user, setUser] = useState(null)

  if (state === 'auth') {
    return (
      <div className="min-h-screen grid place-items-center gap-[1ch]">
        <AuthForm
          onLogin={(auth) => {
            setUser(auth.user)
            setState('session')
          }}
        />
      </div>
    )
  }

  if (state === 'session') {
    return (
      <div className="min-h-screen grid place-items-center gap-[1ch] text-center">
        <div>
          <p className="mb-3">Welcome, {user.username}</p>
          <Button
            onClick={() => {
              setUser(null)
              setState('auth')
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    )
  }
}
