import clsx from 'clsx'
import { Form, Formik, useField } from 'formik'
import PropTypes from 'prop-types'
import { useState } from 'react'
import isEmail from 'validator/es/lib/isEmail'
import * as Yup from 'yup'

/**
 * Input component
 * @param {import('react').InputHTMLAttributes & {label: String}} props Text input props
 */
function TextInput({ label, id, required = false, className = '', ...props }) {
  const [field, meta] = useField(props)
  const labelClasses = clsx('block', 'mb-1')
  const inputClasses = clsx(
    'block',
    'border-[1px]',
    'p-1',
    'mb-1',
    'outline-2',
    'outline-violet-600',
    'placeholder:text-slate-600',
    'p-2',
    'bg-transparent',
    'border-slate-500'
  )

  return (
    <div className={className}>
      <label
        className={labelClasses}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        {...field}
        {...props}
        id={id}
        className={inputClasses}
        aria-required={required}
      />
      {meta.touched && meta.error ? (
        <div className="text-orange-700 first-letter:capitalize text-sm">
          {meta.error}
        </div>
      ) : null}
    </div>
  )
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  required: PropTypes.bool,
}

/**
 * Button component
 * @param {React.ButtonHTMLAttributes & {isLoading: Boolean}} props
 */
function Button({
  className = '',
  children,
  isLoading = false,
  type = 'button',
  ...props
}) {
  const buttonClasses = clsx(
    'px-3 py-2 border-[1px] border-slate-500 text-slate-700 outline-2 outline-violet-600',
    className
  )

  return (
    <button
      className={buttonClasses}
      type={type}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  )
}

const authValidationSchema = Yup.object({
  email: Yup.string()
    .required()
    .test('valid-email', 'Please enter a valid email address', isEmail),
  password: Yup.string().required(),
})

const authInitialValues = {
  email: '',
  password: '',
}

const authFormClasses = clsx(
  'inline-block',
  'p-28',
  'backdrop-blur-[10px]',
  'bg-slate-100/20',
  'backdrop:blur-[10px]',
  'clip-parallelogram',
  'max-w-[490px]'
)

async function authMocked({ email }) {
  const specialEmailsWithErrorMessages = {
    'null@error.com': 'Incorrect username or password',
    '500@error.com': 'Service unavailable. Please, try again later',
    'net@error.com':
      'Network error. Check your internet connection and try again',
  }

  return new Promise((res, rej) => {
    setTimeout(() => {
      if (Object.keys(specialEmailsWithErrorMessages).includes(email)) {
        rej({
          message: specialEmailsWithErrorMessages[email],
        })
      } else {
        res({
          user: {
            username: email,
          },
        })
      }
    }, Math.random() * 1500)
  })
}

/**
 * Authentication form
 *
 * @param {Object} props Component props
 * @param {Function} props.onLogin Login handler
 */
function AuthForm({ onLogin }) {
  const [formError, setFormError] = useState('')

  return (
    <div className={authFormClasses}>
      <Formik
        initialValues={authInitialValues}
        validationSchema={authValidationSchema}
        onSubmit={(values, actions) => {
          authMocked(values)
            .then((auth) => {
              actions.setSubmitting(false)
              onLogin(auth)
            })
            .catch((error) => {
              actions.setSubmitting(false)
              setFormError(error.message)
            })
        }}
      >
        {(formikRenderProps) => (
          <Form>
            <h1 className="text-2xl mb-3">Sign in</h1>
            <TextInput
              label="Email"
              type="email"
              name="email"
              placeholder="hello@example.com"
              className="mb-3"
              id="email"
              required
            />
            <TextInput
              label="Password"
              type="password"
              name="password"
              placeholder="********"
              className="mb-6"
              id="password"
            />
            <Button
              type="submit"
              isLoading={formikRenderProps.isSubmitting}
              className="mb-2"
            >
              Sign in
            </Button>
            <div
              id="auth-form-errors"
              className="text-orange-700 first-letter:capitalize text-sm"
            >
              {formError}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

AuthForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
}

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
