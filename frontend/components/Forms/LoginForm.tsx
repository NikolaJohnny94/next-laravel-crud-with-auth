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
import { login } from '@/lib/actions'
// Schemas
import { loginValidationSchema } from '@/schemas'
// Components
import ErrorMessage from '@/components/ErrorMessage'
//Types
import { LoginDTO } from '@/types'
import { Toaster } from 'react-hot-toast'

export const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()
  const formik = useFormik<LoginDTO>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: toFormikValidationSchema(loginValidationSchema),
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      const response = await login({
        email: values.email,
        password: values.password,
      })
      if (response?.success) {
        router.push(`/tasks/dashboard`)
      } else {
        setErrorMessage(response?.message)
      }
    },
  })

  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />
      <div className='mt-20'>
        <h2 className='text-2xl mb-6 text-center'>Login</h2>
        <form className='w-full' onSubmit={formik.handleSubmit}>
          {errorMessage && <ErrorMessage message={errorMessage} />}
          <div className='mb-4 mt-2 w-full flex flex-col items-center'>
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
          Don&apos;t have an account? Create{' '}
          <Link className='text-danger' href='/auth/registration'>
            one
          </Link>{' '}
          :)
        </div>
      </div>
    </>
  )
}
