import clsx from 'clsx'
import { Form, Formik, useField } from 'formik'
import PropTypes from 'prop-types'
import * as Yup from 'yup'

/**
 * #TODO:
 * @param {import('react').InputHTMLAttributes} props Text input props
 */
function TextInput({ label, id, required = false, ...props }) {
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
    <div>
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

const authValidationSchema = Yup.object({
  email: Yup.string().required().email(),
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
  'text-slate-700',
  'font-primary',
  'clip-parallelogram',
  'font-bold'
)

function AuthForm() {
  return (
    <div className={authFormClasses}>
      <Formik
        initialValues={authInitialValues}
        validationSchema={authValidationSchema}
      >
        <Form>
          <h1 className="text-2xl mb-3">Sign in</h1>
          <div className="mb-3">
            <TextInput
              label="Email"
              type="email"
              name="email"
              placeholder="hello@example.com"
              required
            />
          </div>
          <div className="mb-6">
            <TextInput
              label="Password"
              type="password"
              name="password"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-2 border-[1px] border-slate-500 text-slate-700 outline-2 outline-violet-600"
          >
            Sign in
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen grid place-items-center gap-[1ch] relative">
      <AuthForm />
    </div>
  )
}
