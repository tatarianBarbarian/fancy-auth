import AuthForm from './AuthForm'
import Button from './Button'
import RecoveryForm from './RecoveryForm'
import { authenticate } from './auth'
import { recover } from './recover'
import clsx from 'clsx'
import { useState } from 'react'

const STATES = {
  AUTH: 'auth',
  SESSION: 'session',
  RECOVER: 'recover',
}

export default function App() {
  const [state, setState] = useState(STATES.AUTH)
  const [user, setUser] = useState(null)
  const authWrapperStyles = clsx(
    'sm:clip-form',
    'backdrop:blur-[10px]',
    'w-full',
    'max-w-full',
    'sm:max-w-[490px]',
    'inline-block',
    'sm:py-28 sm:px-24 px-10 py-14',
    'bg-slate-100/20'
  )

  if (state === STATES.SESSION) {
    return (
      <div className="min-h-screen grid place-items-center gap-[1ch]">
        <div className="text-center">
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

  return (
    <div className="min-h-screen grid place-items-center gap-[1ch]">
      <div className={authWrapperStyles}>
        <h1 className="text-3xl mb-10 text-center">
          {state === STATES.AUTH ? 'Sign in' : 'Recover password'}
        </h1>
        {state === STATES.AUTH ? (
          <>
            <AuthForm
              onSubmit={async (values) => {
                const auth = await authenticate(values)

                setUser(auth.user)
                setState(STATES.SESSION)
              }}
            />
            <Button
              onClick={() => setState(STATES.RECOVER)}
              size="s"
            >
              Forgot password?
            </Button>
          </>
        ) : (
          <>
            <RecoveryForm
              onSubmit={async (values) => {
                await recover({ email: values.email })
              }}
            />
            <Button
              onClick={() => setState(STATES.AUTH)}
              size="s"
            >
              Back to login
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
