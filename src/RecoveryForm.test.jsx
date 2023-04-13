import RecoveryForm from './RecoveryForm'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

describe('AuthForm', () => {
  it('Should callback fn if login attempt is successful', async () => {
    const cb = vi.fn()
    render(<RecoveryForm onSubmit={cb} />)

    const emailInput = screen.getByLabelText(/email/i)
    const resetBtn = screen.getByRole('button', { name: /reset password/i })

    await userEvent.type(emailInput, 'test@test.com')
    await userEvent.click(resetBtn)

    expect(cb).toBeCalled()
    expect(cb).toBeCalledTimes(1)
  })

  it('Should render error message if something went wrong', async () => {
    const cb = vi.fn(() => {
      throw new Error('Incorrect user')
    })
    render(<RecoveryForm onSubmit={cb} />)

    const emailInput = screen.getByLabelText(/email/i)
    const resetBtn = screen.getByRole('button', { name: /reset password/i })

    await userEvent.type(emailInput, 'test@test.com')
    await userEvent.click(resetBtn)

    expect(screen.getByText(/incorrect user/i)).toBeVisible()
  })

  it('Should render success message if everything is fine', async () => {
    const cb = vi.fn()
    render(<RecoveryForm onSubmit={cb} />)

    const emailInput = screen.getByLabelText(/email/i)
    const resetBtn = screen.getByRole('button', { name: /reset password/i })

    await userEvent.type(emailInput, 'test@test.com')
    await userEvent.click(resetBtn)

    const successMessage = screen.getByText(/email has been sent/i)

    expect(successMessage).toBeVisible()
  })
})
