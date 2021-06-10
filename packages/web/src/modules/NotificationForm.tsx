import React, { useState, useEffect } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import ky from 'ky'
import * as Yup from 'yup'

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

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
        .required('Please provide either email or phone number'),
    }),
    phone: Yup.string().when('email', {
      is: email => !email || email.length === 0,
      then: Yup.string().required(
        'Please provide either email or phone number'
      ),
    }),
    supervisor: Yup.string().required('Required'),
  },
  [['phone', 'email']]
)

export default function NotificationForm({ onSubmit }: { onSubmit?: any }) {
  const [supervisors, setSupervisors] = useState<string[]>([])

  useEffect(() => {
    let ignore = false

    async function getSupervisors() {
      // const json: Supervisor[] = await ky
      //   .get('http://localhost:8888/api/supervisors')
      //   .json()

      const json = ['b - Cremin, Elijah', 'b - Denesik, Kobe']

      if (!ignore) setSupervisors(json)
    }

    getSupervisors()

    return () => {
      ignore = true
    }
  }, [])

  const handleSubmit = async (values: FormValues) => {
    console.log(JSON.stringify(values, null, 2))
    await sleep(500)
    onSubmit(values)
  }

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
          <div className="flex -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <Field id="firstName" name="firstName" type="text" />
              <ErrorMessage name="firstName" />
            </div>

            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <Field id="lastName" name="lastName" type="text" />
              <ErrorMessage name="lastName" />
            </div>
          </div>

          <div>
            <p className="mb-3">How would you prefer to be notified?</p>

            <div className="flex -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <Field
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Email Address"
                />
                <ErrorMessage name="email" />
              </div>

              <div className="w-full md:w-1/2 px-3">
                <Field
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Phone Number"
                />
                <ErrorMessage name="phone" />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="supervisor"
            >
              Supervisor
            </label>
            <Field id="supervisor" name="supervisor" as="select">
              <option value="">Select...</option>
              {supervisors.map(s => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Field>
            <ErrorMessage name="supervisor" />
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
