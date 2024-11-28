'use client'
//Core
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
//NextUI
import { Progress } from '@nextui-org/react'
//clsx
import clsx from 'clsx'

export const RouteProgressBar = () => {
  const router = useRouter()
  const pathname = usePathname() // Tracks the current path
  const [isRouteChanging, setIsRouteChanging] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let timer: NodeJS.Timeout

    const handleStart = () => {
      setIsRouteChanging(true)
      setProgress(10)

      timer = setTimeout(() => {
        setProgress(50)
      }, 300)
    }

    const handleComplete = () => {
      clearTimeout(timer)
      setProgress(100)
      setTimeout(() => {
        setIsRouteChanging(false)
        setProgress(0)
      }, 500) // Reset after completion
    }

    handleStart() // Detect initial render as a "start"
    return () => handleComplete() // Clean up when component unmounts
  }, [pathname]) // Triggers when the route changes

  if (!isRouteChanging) return null

  return (
    <div
      className={clsx(
        'fixed top-0 left-0 w-full z-[1000] pointer-events-none',
        isRouteChanging ? 'visible' : 'invisible'
      )}
    >
      <Progress value={progress} color='danger' size='sm' />
    </div>
  )
}
