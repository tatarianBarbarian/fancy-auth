import Button from './Button'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

describe('Button component', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('Should display given label', () => {
    render(<Button>Hello there</Button>)

    expect(screen.getByRole('button')).toHaveTextContent('Hello there')
  })

  it('Should handle loading state', () => {
    render(<Button isLoading>Hello there</Button>)

    expect(screen.getByRole('button')).toHaveTextContent('Loading...')
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy')
  })

  it('Should call a callback when clicked', async () => {
    const callback = vi.fn()
    render(<Button onClick={callback}>Hello there</Button>)

    await userEvent.click(screen.getByRole('button', { name: 'Hello there' }))

    expect(callback).toBeCalled()
    expect(callback).toBeCalledTimes(1)
  })
})
