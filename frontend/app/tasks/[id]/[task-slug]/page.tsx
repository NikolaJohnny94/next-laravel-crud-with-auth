// Core (React and Next)
import React from 'react'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
// React Icons
import { FaArrowAltCircleLeft } from 'react-icons/fa'
// Actions
import { getTask } from '@/lib/actions'

type Params = {
  params: {
    id: string
    'task-slug': string
  }
}

export default async function TaskDetailsPage({ params }: Params) {
  const taskId = parseInt(params.id, 10)
  const slug = params['task-slug']

  // Validate `id` and `task-slug` format
  const isValidId = Number.isInteger(taskId) && taskId > 0
  const isValidSlug = Boolean(slug?.trim())

  // Shows 404 page if validation fails
  if (!isValidId || !isValidSlug) notFound()

  // Fetch task details
  const { data: task, message } = await getTask(taskId)

  // Handle authentication error
  if (message === 'Unauthenticated.') redirect('/auth/login')

  // Handle case where task is not found or slug mismatch
  if (!task || task.slug !== slug) notFound()

  return (
    <div>
      <h2 className='text-4xl mb-2 font-bold'>{task.title}</h2>
      <p className='text-xl my-1'>
        <strong>Description:</strong> {task.description}
      </p>
      <p className='text-xl my-1'>
        <strong>Category:</strong> {task.category}
      </p>
      <p className='text-xl my-1'>
        <strong>Completed:</strong> {task.finished ? 'Yes' : 'No'}
      </p>
      <Link
        href='/tasks/dashboard'
        className='my-4 flex items-center justify-center w-[90px] text-center bg-danger-500 px-4 py-2 rounded-md'
      >
        <span className='mr-2'>
          <FaArrowAltCircleLeft size={20} />
        </span>{' '}
        Back
      </Link>
    </div>
  )
}
