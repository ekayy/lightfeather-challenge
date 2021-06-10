import React from 'react'
import { useField } from 'formik'
import MaskedInput from 'react-text-mask'

interface PhoneInputProps {
  name: string
  id: string
  label: string
}

const phoneNumberMask = [
  '(',
  /[1-9]/,
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
]

export default function PhoneInput({ ...props }: PhoneInputProps) {
  const [field, meta] = useField(props)

  return (
    <>
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor={props.id || props.name}
      >
        {props.label}
      </label>

      <MaskedInput
        {...field}
        id={props.id}
        mask={phoneNumberMask}
        placeholder="(999) 999-9999"
        type="text"
      />

      <span
        className="block tracking-wide text-xs font-bold mb-2"
        style={{ color: 'red' }}
      >
        {meta.touched && meta.error}
      </span>
    </>
  )
}
