import Button from './Button'
import TextInput from './TextInput'
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
  const [, setFormError] = useState('')
  const [state, setState] = useState(STATES.IDLE)
  const onSubmit = async () => {
    return new Promise((res) => {
      setTimeout(() => {
        res({
          success: true,
        })
      }, Math.random() * 800)
    })
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
      onSubmit={submitHandler}
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
            className="mb-2"
          >
            Reset password
          </Button>
        </Form>
      )}
    </Formik>
  )
}
