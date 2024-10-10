'use client'
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Task } from '@/types'
import { getTask } from '@/app/actions'
import { Button } from '@nextui-org/button'
import Link from 'next/link'

export default function TaskDetailsPage() {
  const [task, setTask] = useState<Task | null>(null)
  const { slug } = useParams()

  useEffect(() => {
    const fetchTask = async () => {
      const taskId = Array.isArray(slug)
        ? Number(slug[slug.length - 1])
        : typeof slug === 'string'
          ? Number(slug.split('-').pop())
          : 0

      const { success, data } = await getTask(taskId)
      if (success) setTask(data)
    }
    fetchTask()
  }, [slug])

  if (!task) return null

  return (
    <div>
      <h2 className='text-2xl mb-2 font-bold'>{task.title}</h2>
      <p className='text-xl'>
        <strong>Description</strong>: {task.description}
      </p>
      <p className='text-xl'>
        <strong>Category</strong>: {task.category}
      </p>
      <p className='text-xl'>
        <strong>Completed</strong>: {task.finished ? 'Yes' : 'No'}
      </p>
      <Link
        href='/user'
        className='my-4 block w-[80px] text-center bg-danger-500 px-4 py-2 rounded-md'
      >
        Back
      </Link>
    </div>
  )
}
