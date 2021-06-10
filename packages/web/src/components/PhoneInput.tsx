import React from 'react'
import { useField } from 'formik'
import MaskedInput from 'react-text-mask'
import InputError from './InputError'

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
  const [field, meta, helpers] = useField(props)
  const { setValue } = helpers

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
        onChange={e => setValue(e.target.value.replace(/\D/g, ''))}
      />

      <InputError meta={meta} />
    </>
  )
}
