'use client'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/table'
import { getTasks } from '../actions'
//Types
import type { Task } from '@/types'

export default function UserPage() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const fetchTasks = async () => {
      const { success, data } = await getTasks()
      if (success) setTasks(data)
    }
    fetchTasks()
  }, [])

  return (
    <div className='flex flex-col gap-3'>
      <Table
        color='danger'
        selectionMode='single'
        defaultSelectedKeys={['2']}
        aria-label='Tasks Table'
      >
        <TableHeader>
          <TableColumn>Id</TableColumn>
          <TableColumn>Title</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Category</TableColumn>
          <TableColumn>Completed</TableColumn>
          <TableColumn>Edit</TableColumn>
          <TableColumn>Delete</TableColumn>
        </TableHeader>
        <TableBody>
          {tasks.map((task: Task) => (
            <TableRow key={task.id}>
              <TableCell>{task.id}</TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.category}</TableCell>
              <TableCell>{task.finished ? 'Yes' : 'No'}</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
