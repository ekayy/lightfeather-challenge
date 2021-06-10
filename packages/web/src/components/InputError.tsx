import React from 'react'
import { FieldMetaProps } from 'formik'

interface InputErrorProps {
  meta: FieldMetaProps<any>
  testId?: string
}

export default function InputError({ meta, ...props }: InputErrorProps) {
  return (
    <span
      data-testid={props.testId}
      className="block tracking-wide text-xs font-bold h-5 mb-2"
      style={{ color: 'red' }}
    >
      {meta.touched && meta.error}
    </span>
  )
}
