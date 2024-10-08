'use client'

import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import React from 'react'
import { useFormik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import * as z from 'zod'
import apiService from '@/services/apiService'

const validationSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[^a-zA-Z0-9]/,
      'Password must contain at least one special character'
    ),
})

type FormData = {
  email: string
  password: string
}

/**
 * The login page component
 * @returns The login page
 */

// const login = async (email: string, password: string) => {
//   const response = await apiService.login(email, password)
//   localStorage.setItem('access_token', response.data.token)
//   console.log('Login response:', response)
// }
export default function LoginPage() {
  const formik = useFormik<FormData>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: toFormikValidationSchema(validationSchema),
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      apiService.login(values.email, values.password)
      console.log('Form data:', values)
    },
  })

  return (
    <div>
      <h2 className='text-2xl mb-4'>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className='mb-4'>
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
            <div className='text-red-500'>{formik.errors.email}</div>
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
            <div className='text-red-500'>{formik.errors.password}</div>
          )}
        </div>
        <Button type='submit' color='danger' className='text-white'>
          Submit
        </Button>
      </form>
    </div>
  )
}
