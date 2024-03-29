import React, { useState, useEffect } from 'react'
import ky from 'ky'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import TextInput from '../components/TextInput'
import SelectInput from '../components/SelectInput'
import PhoneInput from '../components/PhoneInput'

interface NotificationFormProps {
  handleSubmit: any
  supervisors: string[]
}

interface FormValues {
  firstName: string
  lastName: string
  email?: string
  phone?: string
  supervisor: string
}

const validationSchema = Yup.object().shape(
  {
    firstName: Yup.string()
      .max(15, 'Must be 20 characters or less')
      .matches(/[a-z]/i, 'Must only contain letters')
      .required('Required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .matches(/[a-z]/i, 'Must only contain letters')
      .required('Required'),
    email: Yup.string().when('phone', {
      is: phone => !phone || phone.length === 0,
      then: Yup.string()
        .email('Invalid email address')
        .required('Please provide email and/or phone #'),
      otherwise: Yup.string().email('Invalid email address'),
    }),
    phone: Yup.string().when('email', {
      is: email => !email || email.length === 0,
      then: Yup.string()
        .matches(/\d{10}/i, 'Please provide valid phone #')
        .required('Please provide email and/or phone #'),
      otherwise: Yup.string().matches(
        /\d{10}/i,
        'Please provide valid phone #'
      ),
    }),
    supervisor: Yup.string().required('Required'),
  },
  [['phone', 'email']]
)

export default function NotificationFormContainer() {
  const [supervisors, setSupervisors] = useState<string[]>([])

  useEffect(() => {
    let ignore = false

    async function getSupervisors() {
      const json: string[] = await ky
        .get('http://localhost:8888/api/supervisors')
        .json()

      if (!ignore) setSupervisors(json)
    }

    getSupervisors()

    return () => {
      ignore = true
    }
  }, [])

  const handleSubmit = async (values: FormValues) => {
    const response = await ky
      .post('http://localhost:8888/api/submit', {
        json: {
          ...values,
        },
      })
      .json()

    console.log('form submitted', response)
  }

  return (
    <NotificationForm handleSubmit={handleSubmit} supervisors={supervisors} />
  )
}

export function NotificationForm({
  handleSubmit,
  supervisors,
}: NotificationFormProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-10 text-2xl">Notifications Form</h1>

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          supervisor: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="w-full max-w-lg">
          <div className="flex -mx-3 mb-1">
            <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
              <TextInput id="firstName" name="firstName" label="First Name" />
            </div>

            <div className="w-full md:w-1/2 px-3">
              <TextInput id="lastName" name="lastName" label="Last Name" />
            </div>
          </div>

          <div>
            <p className="mb-3">
              How would you prefer to be notified? (Fill either or both)
            </p>

            <div className="flex -mx-3 mb-1">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <TextInput id="email" name="email" label="Email" />
              </div>

              <div className="w-full md:w-1/2 px-3">
                <PhoneInput id="phone" name="phone" label="Phone Number" />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <SelectInput name="supervisor" label="Supervisor">
              <option value="">Select...</option>
              {supervisors.map(s => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </SelectInput>
          </div>

          <div className="mt-3">
            <button
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}
