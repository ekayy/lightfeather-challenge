import React from 'react'
import { useField } from 'formik'
import InputError from './InputError'

interface TextInputProps {
  name: string
  [x: string]: any
}

export default function TextInput({ ...props }: TextInputProps) {
  const [field, meta] = useField(props)

  return (
    <>
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor={props.id || props.name}
      >
        {props.label}
      </label>
      <input {...field} {...props} type="text" />

      <InputError meta={meta} />
    </>
  )
}
