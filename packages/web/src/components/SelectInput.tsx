import React from 'react'
import { useField } from 'formik'

interface SelectInputProps {
  name: string
  [x: string]: any
}

export default function SelectInput({ ...props }: SelectInputProps) {
  const [field, meta] = useField(props)

  return (
    <>
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor={props.id || props.name}
      >
        {props.label}
      </label>
      <select {...field} {...props} />
      <span
        className="block tracking-wide text-xs font-bold mb-2"
        style={{ color: 'red' }}
      >
        {meta.touched && meta.error}
      </span>
    </>
  )
}
