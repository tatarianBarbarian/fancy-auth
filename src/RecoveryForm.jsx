import Button from './Button'
import TextInput from './TextInput'
import { recover } from './recover'
import useSubmitLocker from './useSubmitLocker'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import isEmail from 'validator/es/lib/isEmail'
import * as Yup from 'yup'

const recoverValidationSchema = Yup.object({
  email: Yup.string()
    .required()
    .test('valid-email', 'Please enter a valid email address', isEmail),
})

const recoverInitialValues = {
  email: '',
}

const STATES = {
  IDLE: 'idle',
  SUCCESS: 'success',
}

export default function RecoveryForm() {
  const [formError, setFormError] = useState('')
  const [state, setState] = useState(STATES.IDLE)
  const onSubmit = async (values) => {
    await recover({ email: values.email })
  }
  const submitHandler = useSubmitLocker(
    onSubmit,
    () => {
      setFormError('')
      setState(STATES.SUCCESS)
    },
    (error) => setFormError(error.message)
  )

  if (state === STATES.SUCCESS) {
    return (
      <p className="mb-3">
        Email has been sent. Follow instructions to recover password.
      </p>
    )
  }

  return (
    <Formik
      validationSchema={recoverValidationSchema}
      initialValues={recoverInitialValues}
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
            className="mb-6"
            id="email"
            required
          />
          <Button
            type="submit"
            isLoading={formikRenderProps.isSubmitting}
            aria-describedby="recovery-form-errors"
            className="mb-2"
          >
            Reset password
          </Button>
          <div
            id="recovery-form-errors"
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
