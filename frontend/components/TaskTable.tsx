// 'use client'
// import React from 'react'
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   User,
//   Chip,
//   Tooltip,
//   getKeyValue,
// } from '@nextui-org/react'
// import { EditIcon, EyeIcon, DeleteIcon } from '@/components'

// const statusColorMap: any = {
//   active: 'success',
//   paused: 'danger',
//   vacation: 'warning',
// }

// const columns = [
//   { name: 'ID', uid: 'id' },
//   { name: 'TITLE', uid: 'title' },
//   { name: 'DESCRIPTION', uid: 'description' },
//   { name: 'CATEGORY', uid: 'category' },
//   { name: 'COMPLETED', uid: 'finished' },
//   { name: 'ACTIONS', uid: 'actions' },
// ]

// const users = [
//   {
//     id: 1,
//     title: 'Task Title',
//     description: 'Task Description',
//     category: 'Task Category',
//     finished: false,
//     actions: 'Task Actions',
//   },
// {
//   id: 2,
//   name: 'Zoey Lang',
//   role: 'Technical Lead',
//   team: 'Development',
//   status: 'paused',
//   age: '25',
//   avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
//   email: 'zoey.lang@example.com',
// },
// {
//   id: 3,
//   name: 'Jane Fisher',
//   role: 'Senior Developer',
//   team: 'Development',
//   status: 'active',
//   age: '22',
//   avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
//   email: 'jane.fisher@example.com',
// },
// {
//   id: 4,
//   name: 'William Howard',
//   role: 'Community Manager',
//   team: 'Marketing',
//   status: 'vacation',
//   age: '28',
//   avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
//   email: 'william.howard@example.com',
// },
// {
//   id: 5,
//   name: 'Kristen Copper',
//   role: 'Sales Manager',
//   team: 'Sales',
//   status: 'active',
//   age: '24',
//   avatar: 'https://i.pravatar.cc/150?u=a092581d4ef9026700d',
//   email: 'kristen.cooper@example.com',
// },
// ]

// export default function App() {
//   const renderCell = React.useCallback((user: any, columnKey: any) => {
//     const cellValue = user[columnKey]

//     switch (columnKey) {
//       case 'name':
//         return (
//           <User
//             avatarProps={{ radius: 'lg', src: user.avatar }}
//             description={user.email}
//             name={cellValue}
//           >
//             {user.email}
//           </User>
//         )
//       case 'role':
//         return (
//           <div className='flex flex-col'>
//             <p className='text-bold text-sm capitalize'>{cellValue}</p>
//             <p className='text-bold text-sm capitalize text-default-400'>
//               {user.team}
//             </p>
//           </div>
//         )
//       case 'status':
//         return (
//           <Chip
//             className='capitalize'
//             color={statusColorMap[user.status]}
//             size='sm'
//             variant='flat'
//           >
//             {cellValue}
//           </Chip>
//         )
//       case 'actions':
//         return (
//           <div className='relative flex items-center gap-2'>
//             <Tooltip content='Details'>
//               <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
//                 <EyeIcon />
//               </span>
//             </Tooltip>
//             <Tooltip content='Edit user'>
//               <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
//                 <EditIcon />
//               </span>
//             </Tooltip>
//             <Tooltip color='danger' content='Delete user'>
//               <span className='text-lg text-danger cursor-pointer active:opacity-50'>
//                 <DeleteIcon />
//               </span>
//             </Tooltip>
//           </div>
//         )
//       default:
//         return cellValue
//     }
//   }, [])

//   return (
//     <Table
//       color='danger'
//       selectionMode='single'
//       defaultSelectedKeys={['2']}
//       aria-label='Tasks Table'
//     >
//       <TableHeader columns={columns}>
//         {(column) => (
//           <TableColumn
//             key={column.uid}
//             align={column.uid === 'actions' ? 'center' : 'start'}
//           >
//             {column.name}
//           </TableColumn>
//         )}
//       </TableHeader>
//       <TableBody items={users}>
//         {(item) => (
//           <TableRow className='cursor-pointer' key={item.id}>
//             {(columnKey) => (
//               <TableCell>{renderCell(item, columnKey)}</TableCell>
//             )}
//           </TableRow>
//         )}
//       </TableBody>
//     </Table>
//   )
// }

'use client'
// Core (React and Next)
import React, { useEffect, useState } from 'react'
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
import { DeleteIcon, EditIcon, EyeIcon } from '@/components'
//Utils
import { slugify } from '@/utils/slugify'
//Types
import type { Task } from '@/types'

type Props = {
  tasks: Task[]
}

export default function TaskTable({ tasks }: Props) {
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
                <Tooltip color='primary' content='Edit user'>
                  <span className='text-lg text-primary cursor-pointer active:opacity-50'>
                    <EditIcon />
                  </span>
                </Tooltip>
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
