// Core (React and Next)
import React from 'react'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
// Actions
import { getTask } from '@/app/actions'

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
  // const isValidId = !isNaN(taskId) && taskId > 0
  // const isValidSlug = typeof slug === 'string' && slug.length > 0

  if (!isValidId || !isValidSlug) {
    notFound() // Show 404 page if validation fails
  }

  // Fetch task details
  const { data: task, message } = await getTask(taskId)

  // Handle authentication error
  if (message === 'Unauthenticated.') {
    redirect('/auth/login')
  }

  // Handle case where task is not found or slug mismatch
  if (!task || task.slug !== slug) {
    notFound() // Show 404 page if task doesn't exist or slug is incorrect
  }

  // Render the task details if valid
  return (
    <div>
      <h2 className='text-2xl mb-2 font-bold'>{task.title}</h2>
      <p className='text-xl'>
        <strong>Description:</strong> {task.description}
      </p>
      <p className='text-xl'>
        <strong>Category:</strong> {task.category}
      </p>
      <p className='text-xl'>
        <strong>Completed:</strong> {task.finished ? 'Yes' : 'No'}
      </p>
      <Link
        href='/tasks/dashboard'
        className='my-4 block w-[80px] text-center bg-danger-500 px-4 py-2 rounded-md'
      >
        Back
      </Link>
    </div>
  )
}

// // Core (React and Next)
// import React from 'react'
// import Link from 'next/link'
// import { redirect } from 'next/navigation'
// //Actions
// import { getTask } from '@/app/actions'

// type Params = {
//   params: {
//     id: string
//     'task-slug': string
//   }
// }
// export default async function TaskDetailsPage({ params }: Params) {
//   const { data: task, message } = await getTask(parseInt(params.id))
//   if (message === 'Unauthenticated.') redirect('/auth/login')

//   return (
//     <div>
//       <h2 className='text-2xl mb-2 font-bold'>{task?.title}</h2>
//       <p className='text-xl'>
//         <strong>Description</strong>: {task?.description}
//       </p>
//       <p className='text-xl'>
//         <strong>Category</strong>: {task?.category}
//       </p>
//       <p className='text-xl'>
//         <strong>Completed</strong>: {task?.finished ? 'Yes' : 'No'}
//       </p>
//       <Link
//         href='/tasks/dashboard'
//         className='my-4 block w-[80px] text-center bg-danger-500 px-4 py-2 rounded-md'
//       >
//         Back
//       </Link>
//     </div>
//   )
// }
