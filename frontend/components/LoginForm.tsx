'use client'
// Core (React and Next)
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
// Formik
import { useFormik } from 'formik'
// Next UI
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
// Zod related
import { toFormikValidationSchema } from 'zod-formik-adapter'
// Server actions
import { login } from '@/app/actions'
// Schemas
import { loginValidationSchema } from '@/schemas'
// Components
import ErrorMessage from '@/components/ErrorMessage'

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState(null)
  const router = useRouter()
  const formik = useFormik<{
    email: string
    password: string
  }>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: toFormikValidationSchema(loginValidationSchema),
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      const response = await login(values.email, values.password)
      if (response?.success) {
        router.push('/')
      } else {
        setErrorMessage(response?.message)
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <div className='mb-4 mt-2'>
        <Input
          isRequired
          type='email'
          label='Email'
          name='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          className='max-w-xs'
        />
        {formik.touched.email && formik.errors.email && (
          <ErrorMessage message={formik.errors.email} />
        )}
      </div>
      <div className='mb-4'>
        <Input
          isRequired
          type='password'
          label='Password'
          name='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          className='max-w-xs'
        />
        {formik.touched.password && formik.errors.password && (
          <ErrorMessage message={formik.errors.password} />
        )}
      </div>
      <Button
        type='submit'
        color='danger'
        className='text-white'
        disabled={formik.isSubmitting}
      >
        Submit
      </Button>
    </form>
  )
}