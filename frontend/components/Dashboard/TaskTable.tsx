'use client'

// Core (React and Next)
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
import { Spinner } from '@nextui-org/spinner'
// Components
import { EditModal, DeleteModal, EyeIcon } from '@/components'
// Types
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
  const [isLoading, setIsLoading] = useState(false)
  const [taskDetailsClicked, setTaskDetailsClicked] = useState<number>()

  const router = useRouter()

  const handleDetailsClick = (url: string) => {
    setIsLoading(true)
    setTaskDetailsClicked(parseInt(url.split('/')[2]))
    router.push(url)
  }

  return (
    <div className='flex flex-col gap-3 relative'>
      {/* {isLoading && (
        <div className='absolute inset-0  flex justify-center items-center z-50'>
          <Spinner size='lg' color='white' />
        </div>
      )} */}
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
              {/* <TableCell>
                <Tooltip content='Details' color='success'>
                  <span
                    className='text-lg text-success cursor-pointer active:opacity-50'
                    onClick={() =>
                      handleDetailsClick(`/tasks/${task.id}/${task.slug}`)
                    }
                  >
                    <span className='flex gap-2'>
                      {' '}
                      <EyeIcon />{' '}
                      {taskDetailsClicked === task.id && isLoading && (
                        <Spinner size='sm' color='white' />
                      )}
                    </span>
                  </span>
                </Tooltip>
              </TableCell> */}
              <TableCell>
                <Tooltip
                  content='Details'
                  color='success'
                  className='text-white'
                >
                  <span
                    className='text-lg text-success cursor-pointer active:opacity-50'
                    onClick={() =>
                      handleDetailsClick(`/tasks/${task.id}/${task.slug}`)
                    }
                  >
                    <span className='flex gap-2 items-center'>
                      <EyeIcon />
                      <span className='w-4 flex justify-center'>
                        {taskDetailsClicked === task.id && isLoading && (
                          <Spinner size='sm' color='white' />
                        )}
                      </span>
                    </span>
                  </span>
                </Tooltip>
              </TableCell>
              <TableCell>
                <EditModal
                  taskId={task.id}
                  title={task.title}
                  description={task.description}
                  category={task.category}
                  finished={task.finished}
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
