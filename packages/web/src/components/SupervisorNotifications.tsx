import React from 'react'
import { useFormik } from 'formik'
import ky from 'ky'

interface FormValues {
  firstName: string
  lastName: string
  email?: string
  phoneNumber?: string
  supervisor: string
}

export default function SupervisorNotifications() {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      supervisor: '',
    },
    onSubmit: (values: FormValues) => {
      console.log(JSON.stringify(values, null, 2))
    },
  })

  return (
    <div>
      <div>
        <h1>Notifications Form</h1>

        <form className="flex-col" onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              {...formik.getFieldProps('firstName')}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div>{formik.errors.firstName}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              {...formik.getFieldProps('lastName')}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div>{formik.errors.lastName}</div>
            ) : null}
          </div>

          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  )
}
