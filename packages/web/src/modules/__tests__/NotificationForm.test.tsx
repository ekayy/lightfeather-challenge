import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import NotificationForm from '../NotificationForm'

describe('Notification form', () => {
  let handleSubmit: any

  beforeEach(async () => {
    handleSubmit = jest.fn()
    render(<NotificationForm onSubmit={handleSubmit} />)
  })

  test('should not submit form if both email and phone not filled out', async () => {
    userEvent.type(screen.getByLabelText(/first name/i), 'John')
    userEvent.type(screen.getByLabelText(/last name/i), 'McClane')
    userEvent.selectOptions(
      screen.getByDisplayValue(/select.../i),
      'b - Cremin, Elijah'
    )
    userEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => expect(handleSubmit).not.toHaveBeenCalledWith())
  })

  test('should submit form if at least email filled', async () => {
    userEvent.type(screen.getByLabelText(/first name/i), 'John')
    userEvent.type(screen.getByLabelText(/last name/i), 'McClane')
    userEvent.type(
      screen.getByPlaceholderText(/email/i),
      'john.mcclane@mail.com'
    )
    userEvent.selectOptions(
      screen.getByDisplayValue(/select.../i),
      'b - Cremin, Elijah'
    )
    userEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'McClane',
        email: 'john.mcclane@mail.com',
        phone: '',
        supervisor: 'b - Cremin, Elijah',
      })
    )
  })

  test('should submit form if at least phone filled', async () => {
    userEvent.type(screen.getByLabelText(/first name/i), 'John')
    userEvent.type(screen.getByLabelText(/last name/i), 'McClane')
    userEvent.type(screen.getByPlaceholderText(/phone/i), '408-123-4567')
    userEvent.selectOptions(
      screen.getByDisplayValue(/select.../i),
      'b - Cremin, Elijah'
    )
    userEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'McClane',
        email: '',
        phone: '408-123-4567',
        supervisor: 'b - Cremin, Elijah',
      })
    )
  })
})
