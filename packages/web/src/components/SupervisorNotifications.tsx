import React, { useState, useEffect } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import ky from 'ky'
import * as Yup from 'yup'

interface FormValues {
  firstName: string
  lastName: string
  email?: string
  phone?: string
  supervisor: string
}

const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(15, 'Must be 20 characters or less')
    .matches(/[a-z]/i, 'Must only contain letters')
    .required('Required'),
  lastName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .matches(/[a-z]/i, 'Must only contain letters')
    .required('Required'),
  email: Yup.string().email('Invalid email address'),
  phone: Yup.string(),
  supervisor: Yup.string().required('Required'),
})

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

  const handleSubmit = (values: FormValues) => {
    console.log(JSON.stringify(values, null, 2))
  }

  return (
    <div>
      <div>
        <h1>Notifications Form</h1>

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
              <p>How would you prefer to be notified?</p>

              <div>
                <label>
                  <Field name="acceptEmail" type="checkbox" />
                  Email
                </label>

                <Field name="email" type="text" placeholder="Email Address" />
                <ErrorMessage name="email" />
              </div>

              <div>
                <label>
                  <Field name="acceptPhone" type="checkbox" />
                  Phone Number
                </label>

                <Field name="phone" type="text" placeholder="Phone Number" />
                <ErrorMessage name="phone" />
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
