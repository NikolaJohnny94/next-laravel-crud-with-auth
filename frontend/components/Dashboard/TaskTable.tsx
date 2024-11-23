'use client'
// Core (React and Next)
import React from 'react'
import Link from 'next/link'
// NextUI
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/table'
import { Tooltip } from '@nextui-org/tooltip'
//Components
import { EditModal, DeleteModal, EyeIcon } from '@/components'
//Types
import type { Dispatch, SetStateAction } from 'react'
import type { Task } from '@/types'

type Props = {
  tasks: Task[]
  setNewTaskEdited: Dispatch<SetStateAction<boolean>>
  setTaskDeleted: Dispatch<SetStateAction<boolean>>
}

export default function TaskTable({
  tasks,
  setNewTaskEdited,
  setTaskDeleted,
}: Props) {
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
          <TableColumn>Details</TableColumn>
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
              <TableCell>
                <Tooltip content='Details' color='success'>
                  <Link href={`/tasks/${task.id}/${task.slug}`}>
                    <span className='text-lg text-success cursor-pointer active:opacity-50'>
                      <EyeIcon />
                    </span>
                  </Link>
                </Tooltip>
              </TableCell>
              <TableCell>
                <EditModal
                  taskId={task.id}
                  title={task.title}
                  description={task.description}
                  category={task.category}
                  finished={`${task.finished}` as 'true' | 'false'}
                  setNewTaskEdited={setNewTaskEdited}
                />
              </TableCell>
              <TableCell>
                <DeleteModal taskId={task.id} setTaskDeleted={setTaskDeleted} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
