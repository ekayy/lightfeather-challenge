import React from 'react'
import { FieldMetaProps } from 'formik'

interface InputErrorProps {
  meta: FieldMetaProps<any>
}

export default function InputError({ meta }: InputErrorProps) {
  return (
    <span
      className="block tracking-wide text-xs font-bold h-5 mb-2"
      style={{ color: 'red' }}
    >
      {meta.touched && meta.error}
    </span>
  )
}
