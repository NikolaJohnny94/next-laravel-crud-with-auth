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
import { DeleteIcon, EditIcon, EditModal, EyeIcon } from '@/components'
//Utils
import { slugify } from '@/utils/slugify'
//Types
import type { Dispatch, SetStateAction } from 'react'
import type { Task } from '@/types'

type Props = {
  tasks: Task[]
  setNewTaskEdited: Dispatch<SetStateAction<boolean>>
}

export default function TaskTable({ tasks, setNewTaskEdited }: Props) {
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
                  <Link
                    href={`/user/new-user/tasks/${task.id}/${slugify(task.title)}`}
                  >
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
                {/* <Tooltip color='primary' content='Edit user'>
                  <span className='text-lg text-primary cursor-pointer active:opacity-50'>
                    <EditIcon />
                  </span>
                </Tooltip> */}
              </TableCell>
              <TableCell>
                <Tooltip color='danger' content='Delete user'>
                  <span className='text-lg text-danger cursor-pointer active:opacity-50'>
                    <DeleteIcon />
                  </span>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
