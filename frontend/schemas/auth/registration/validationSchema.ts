//Zod
import * as z from 'zod'
// Types
import type { RegistrationFormData } from '@/types'

export const registrationValidationSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters long'),
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
    password_confirmation: z
      .string()
      .min(8, 'Password confirmation must be at least 8 characters long'),
  })
  .refine(
    (data: RegistrationFormData) =>
      data.password === data.password_confirmation,
    {
      message: 'Password confirmation does not match password',
      path: ['password_confirmation'],
    }
  )
