import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { NotificationForm } from '../NotificationForm'

describe('NotificationForm', () => {
  let handleSubmit: any

  beforeEach(async () => {
    handleSubmit = jest.fn()
    const supervisors = ['b - Cremin, Elijah', 'c - Damodred, Moraine']
    render(
      <NotificationForm handleSubmit={handleSubmit} supervisors={supervisors} />
    )
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
    userEvent.type(screen.getByLabelText(/email/i), 'john.mcclane@mail.com')
    userEvent.selectOptions(
      screen.getByDisplayValue(/select.../i),
      'b - Cremin, Elijah'
    )
    userEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          firstName: 'John',
          lastName: 'McClane',
          email: 'john.mcclane@mail.com',
          phone: '',
          supervisor: 'b - Cremin, Elijah',
        },
        expect.anything()
      )
    )
  })

  test('should submit form if at least phone filled', async () => {
    userEvent.type(screen.getByLabelText(/first name/i), 'John')
    userEvent.type(screen.getByLabelText(/last name/i), 'McClane')
    userEvent.type(screen.getByLabelText(/phone number/i), '4081234567')
    userEvent.selectOptions(
      screen.getByDisplayValue(/select.../i),
      'b - Cremin, Elijah'
    )
    userEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          firstName: 'John',
          lastName: 'McClane',
          email: '',
          phone: '4081234567',
          supervisor: 'b - Cremin, Elijah',
        },
        expect.anything()
      )
    )
  })

  test('should show phone error message if type non number characters in phone', async () => {
    userEvent.type(screen.getByLabelText(/first name/i), 'John')
    userEvent.type(screen.getByLabelText(/last name/i), 'McClane')
    userEvent.type(screen.getByLabelText(/phone number/i), '408123abcd')
    userEvent.selectOptions(
      screen.getByDisplayValue(/select.../i),
      'b - Cremin, Elijah'
    )
    userEvent.click(screen.getByRole('button', { name: /submit/i }))

    expect(screen.getByTestId('error.phone')).toBeInTheDocument()

    await waitFor(() => expect(handleSubmit).not.toHaveBeenCalledWith())
  })
})
