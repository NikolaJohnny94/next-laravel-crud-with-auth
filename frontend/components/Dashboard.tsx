'use client'
// Core (React and Next)
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
//Components
import { CreateModal } from '@/components'
import TaskTable from '@/components/TaskTable'
//Actions
import { getTasks } from '@/app/actions'
//Types
import { Task } from '@/types'

export default function Dashboard() {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskCreted, setNewTaskCreted] = useState<boolean>(false)
  const [newTaskEdited, setNewTaskEdited] = useState<boolean>(false)

  useEffect(() => {
    const fetchTasks = async () => {
      const { success, data, message } = await getTasks()
      if (success) setTasks(data)
      if (message === 'Unauthenticated.') router.push('/auth/login')
    }
    fetchTasks()
  }, [newTaskCreted, newTaskEdited])

  return (
    <div>
      <div className='flex justify-end mb-4'>
        <CreateModal setNewTaskCreted={setNewTaskCreted} />
      </div>
      <TaskTable tasks={tasks} setNewTaskEdited={setNewTaskEdited} />
    </div>
  )
}
