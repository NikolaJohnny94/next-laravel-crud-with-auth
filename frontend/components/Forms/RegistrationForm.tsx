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
import { registration } from '@/app/actions'
// Schemas
import { registrationValidationSchema } from '@/schemas'
// Components
import ErrorMessage from '@/components/ErrorMessage'
// Types
import { RegistrationFormData } from '@/types'

export function RegistrationForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()
  const formik = useFormik<RegistrationFormData>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
    validationSchema: toFormikValidationSchema(registrationValidationSchema),
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      const response = await registration(
        values.name,
        values.email,
        values.password,
        values.password_confirmation
      )
      if (response?.success) {
        router.push('/auth/login')
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
          type='text'
          label='Name'
          name='name'
          value={formik.values.name}
          onChange={formik.handleChange}
          className='max-w-xs'
        />
        {formik.touched.name && formik.errors.name && (
          <ErrorMessage message={formik.errors.name} />
        )}
      </div>
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
      <div className='mb-4'>
        <Input
          isRequired
          type='password'
          label='Confirm password'
          name='password_confirmation'
          value={formik.values.password_confirmation}
          onChange={formik.handleChange}
          className='max-w-xs'
        />
        {formik.touched.password_confirmation &&
          formik.errors.password_confirmation && (
            <ErrorMessage message={formik.errors.password_confirmation} />
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
