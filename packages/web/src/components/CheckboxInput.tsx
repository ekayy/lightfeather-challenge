import React from 'react'
import { useField } from 'formik'

interface CheckboxInputProps {
  name: string
  [x: string]: any
}

export default function CheckboxInput({
  children,
  ...props
}: CheckboxInputProps) {
  const [field, meta] = useField({ ...props, type: 'checkbox' })

  return (
    <>
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor={props.id || props.name}
      >
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>

      <span
        className="block tracking-wide text-xs font-bold mb-2"
        style={{ color: 'red' }}
      >
        {meta.touched && meta.error}
      </span>
    </>
  )
}
