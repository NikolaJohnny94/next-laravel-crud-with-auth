// 'use client'
// // Core (React and Next)
// import React, { useEffect, useState } from 'react'
// import Modal from '@/components/Modal'
// //Actions
// import { getTasks } from '@/app/actions'

// //Types
// import type { Task } from '@/types'
// import TaskTable from '@/components/TaskTable'

// export default function UserPage() {
//   const [tasks, setTasks] = useState<Task[]>([])

//   useEffect(() => {
//     const fetchTasks = async () => {
//       const { success, data } = await getTasks()
//       if (success) setTasks(data)
//     }
//     fetchTasks()
//   }, [])

//   return (
//     <div>
//       <div className='flex justify-end mb-4'>
//         <Modal />
//       </div>
//       <TaskTable tasks={tasks} />
//     </div>
//   )
// }

//Core (React and Next)
// import React from 'react'
// // NextUI
// import { Button } from '@nextui-org/button'
// // Actions
// import { getTasks } from '@/app/actions'
// // Components
// import TaskTable from '@/components/TaskTable'
// import Modal from '@/components/Modal'

// export default async function DashboardPage() {
//   const { data: tasks } = await getTasks()
//   return (
//     <div>
//       <div className='flex justify-end mb-4'>
//         <Modal />
//       </div>
//       <TaskTable tasks={tasks} />
//     </div>
//   )
// }

// export const revalidate = 1

import React from 'react'
import Dashboard from '@/components/Dashboard'

export default function page() {
  return <Dashboard />
}
