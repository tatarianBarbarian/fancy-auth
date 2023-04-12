import Button from './Button'
import TextInput from './TextInput'
import useSubmitLocker from './useSubmitLocker'
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
    <Formik
      initialValues={authInitialValues}
      validationSchema={authValidationSchema}
      onSubmit={(...args) => {
        setFormError('')
        submitHandler(...args)
      }}
    >
      {(formikRenderProps) => (
        <Form>
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
            className="text-orange-700 first-letter:capitalize text-sm mb-3"
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
  )
}

AuthForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
