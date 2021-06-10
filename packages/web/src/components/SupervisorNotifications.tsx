import React, { useState, useEffect } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import ky from 'ky'

interface FormValues {
  firstName: string
  lastName: string
  email?: string
  phoneNumber?: string
  supervisor: string
}

export default function SupervisorNotifications() {
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

  return (
    <div>
      <div>
        <h1>Notifications Form</h1>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            supervisor: '',
          }}
          onSubmit={(values: FormValues) => {
            console.log(JSON.stringify(values, null, 2))
          }}
        >
          <Form className="flex-col">
            <div>
              <label htmlFor="firstName">First Name</label>
              <Field name="firstName" type="text" />
              <ErrorMessage name="firstName" />
            </div>

            <div>
              <label htmlFor="lastName">Last Name</label>
              <Field name="lastName" type="text" />
              <ErrorMessage name="lastName" />
            </div>

            <div>
              <label htmlFor="lastName">
                How would you prefer to be notified?
              </label>

              <label>
                <Field name="acceptEmail" type="checkbox" />
                Email
              </label>

              <div>
                <Field name="email" type="text" placeholder="Email Address" />
                <ErrorMessage name="email" />
              </div>
              <div>
                <label>
                  <Field name="acceptPhone" type="checkbox" />
                  Phone Number
                </label>

                <Field
                  name="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                />
                <ErrorMessage name="phoneNumber" />
              </div>
            </div>

            <div>
              <label htmlFor="supervisor">Supervisor</label>
              <Field name="supervisor" as="select">
                <option value="">Select...</option>
                {supervisors.map(s => (
                  <option key={s}>{s}</option>
                ))}
              </Field>
              <ErrorMessage name="supervisor" />
            </div>

            <button type="submit">Sign In</button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
