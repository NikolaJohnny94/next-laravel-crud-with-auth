import { z } from 'zod'

export const taskValidationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z
    .enum(['', 'work', 'personal', 'other'])
    .refine((value) => value !== '', 'Invalid category'),
  finished: z.enum(['true', 'false']),
})
