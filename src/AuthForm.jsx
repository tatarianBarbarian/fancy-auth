import Button from './Button'
import TextInput from './TextInput'
import clsx from 'clsx'
import { Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import { useState } from 'react'
import isEmail from 'validator/es/lib/isEmail'
import * as Yup from 'yup'

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
  'sm:p-28 px-10 py-14',
  'backdrop-blur-[10px]',
  'bg-slate-100/20',
  'backdrop:blur-[10px]',
  'sm:clip-form',
  'w-full',
  'max-w-full',
  'sm:max-w-[490px]'
)

const useSubmitLocker = (onSubmit, onSuccess, onError) => {
  const [preventSubmit, setPreventSubmit] = useState(false)

  const handler = async (values, actions) => {
    setPreventSubmit(true)

    if (preventSubmit) return

    try {
      await onSubmit(values, actions)
      onSuccess()
      actions.setSubmitting(false)
      setPreventSubmit(false)
    } catch (error) {
      actions.setSubmitting(false)
      setPreventSubmit(false)
      onError(error)
    }
  }

  return handler
}

/**
 * Authentication form
 *
 * @param {Object} props Component props
 * @param {Function} props.onSubmit Login handler
 */
export default function AuthForm({ onSubmit }) {
  const [formError, setFormError] = useState('')
  const submitHandler = useSubmitLocker(
    onSubmit,
    () => setFormError(''),
    (error) => setFormError(error.message)
  )

  return (
    <div className={authFormClasses}>
      <Formik
        initialValues={authInitialValues}
        validationSchema={authValidationSchema}
        onSubmit={submitHandler}
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
              aria-placeholder=""
              className="mb-6"
              id="password"
              required
            />
            <Button
              type="submit"
              isLoading={formikRenderProps.isSubmitting}
              className="mb-2"
              aria-describedby="auth-form-errors"
            >
              Sign in
            </Button>
            <div
              id="auth-form-errors"
              aria-live="assertive"
              className="text-orange-700 first-letter:capitalize text-sm"
            >
              {formError && (
                <>
                  <span className="sr-only">There is an error in form:</span>
                  {formError}
                </>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

AuthForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
