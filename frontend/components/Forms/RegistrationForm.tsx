'use client'
// Core (React and Next)
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
// Formik
import { useFormik } from 'formik'
// Next UI
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { Spinner } from '@nextui-org/spinner'
// Zod related
import { toFormikValidationSchema } from 'zod-formik-adapter'
// Server actions
import { registration } from '@/lib/actions'
// Schemas
import { registrationValidationSchema } from '@/schemas'
// Components
import ErrorMessage from '@/components/ErrorMessage'
// Types
import { RegistrationDTO } from '@/types'
import toast from 'react-hot-toast'

export function RegistrationForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()
  const formik = useFormik<RegistrationDTO>({
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
      const response = await registration({
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation,
      })
      if (response?.success) {
        router.push('/auth/login')
        setTimeout(() => toast.success(response.message), 2000)
      } else {
        setErrorMessage(response?.message)
      }
    },
  })

  return (
    <div className='mt-20'>
      <h2 className='text-2xl mb-6 text-center'>Registration</h2>
      <form className='w-full' onSubmit={formik.handleSubmit}>
        {errorMessage && <ErrorMessage message={errorMessage} />}
        <div className='mb-4 mt-2 flex flex-col justify-center items-center'>
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
            <div className='mt-2'>
              <ErrorMessage message={formik.errors.name} />
            </div>
          )}
        </div>
        <div className='mb-4 mt-2 flex flex-col justify-center items-center'>
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
            <div className='mt-2'>
              <ErrorMessage message={formik.errors.email} />
            </div>
          )}
        </div>
        <div className='mb-4 flex flex-col justify-center items-center'>
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
            <div className='mt-2'>
              <ErrorMessage message={formik.errors.password} />
            </div>
          )}
        </div>
        <div className='mb-4 flex flex-col justify-center items-center'>
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
              <div className='mt-2'>
                <ErrorMessage message={formik.errors.password_confirmation} />
              </div>
            )}
        </div>
        <Button
          type='submit'
          color='danger'
          className='text-white block mt-6 mx-auto'
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? (
            <span className='flex items-center'>
              {' '}
              Submitting...
              <Spinner color='white' size='sm' />
            </span>
          ) : (
            <span>Submit</span>
          )}
        </Button>
      </form>
      <div className='text-center mt-4 text-gray-300'>
        Already have an account? Log in{' '}
        <Link className='text-danger' href='/auth/login'>
          here
        </Link>{' '}
        :)
      </div>
    </div>
  )
}
