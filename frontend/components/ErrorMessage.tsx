//Core
import React from 'react'

type Props = { message: string }

export default function ErrorMessage({ message }: Props) {
  return <div className='text-red-500'>{message}</div>
}
