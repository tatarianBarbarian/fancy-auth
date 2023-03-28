import AuthForm from './AuthForm'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

describe('AuthForm', () => {
  it('Should callback fn if login attempt is successful', async () => {
    const cb = vi.fn()
    render(<AuthForm onSubmit={cb} />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const signInBtn = screen.getByRole('button', { name: /sign in/i })

    await userEvent.type(emailInput, 'test@test.com')
    await userEvent.type(passwordInput, 'test')
    await userEvent.click(signInBtn)

    expect(cb).toBeCalled()
    expect(cb).toBeCalledTimes(1)
  })

  it('Should render error message if something went wrong', async () => {
    const cb = vi.fn(() => {
      throw new Error('Incorrect user')
    })
    render(<AuthForm onSubmit={cb} />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const signInBtn = screen.getByRole('button', { name: /sign in/i })

    await userEvent.type(emailInput, 'test@test.com')
    await userEvent.type(passwordInput, 'test')
    await userEvent.click(signInBtn)

    expect(screen.getByText(/incorrect user/i)).toBeVisible()
  })
})
