import AuthForm from './AuthForm'
import Button from './Button'
import { authenticate } from './auth'
import clsx from 'clsx'
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
        <div
          className={clsx(
            'sm:clip-form',
            'backdrop:blur-[10px]',
            'w-full',
            'max-w-full',
            'sm:max-w-[490px]',
            'inline-block',
            'sm:p-28 px-10 py-14',
            'bg-slate-100/20'
          )}
        >
          <h1 className="text-2xl mb-3">Sign in</h1>
          <AuthForm
            onSubmit={async (values) => {
              const auth = await authenticate(values)

              setUser(auth.user)
              setState(STATES.SESSION)
            }}
          />
        </div>
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
