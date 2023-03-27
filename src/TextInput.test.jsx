import TextInput from './TextInput'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Formik } from 'formik'
import * as Yup from 'yup'

describe('Text input component', () => {
  afterEach(() => cleanup())

  it('Should have label if present', () => {
    render(
      <Formik initialValues={{ name: 'test' }}>
        <TextInput
          id="test"
          label="Hello there 1"
          name="test"
        />
      </Formik>
    )

    expect(screen.getByLabelText('Hello there 1')).toBeInTheDocument()
  })

  it('Should display error message if present', async () => {
    render(
      <Formik
        initialValues={{ name: 'test' }}
        validationSchema={Yup.object({ test: Yup.string().required() })}
      >
        <TextInput
          id="test"
          label="Hello there 2"
          name="test"
          required
        />
      </Formik>
    )

    const el = await screen.getByLabelText('Hello there 2')

    await userEvent.click(el)
    await userEvent.click(el.parentNode)

    expect(screen.getByText(/required field/i)).toBeInTheDocument()
  })
})
