'use client'
// Core
import { useEffect, useState } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const [hasTried, setHasTried] = useState(false)

  useEffect(() => {
    console.error('Error occurred:', error)
  }, [error])

  const handleRetry = () => {
    setHasTried(true)
    reset()
  }

  return (
    <div className='text-center p-4'>
      <h2 className='text-xl font-semibold text-red-600'>
        Oops! Something went wrong!
      </h2>
      <p className='mt-2 text-gray-600'>
        {hasTried ? 'Retrying...' : 'An error occurred. Please try again.'}
      </p>
      <button
        onClick={handleRetry}
        className='mt-4 px-6 py-2 bg-blue-500 text-white rounded-md'
      >
        Try again
      </button>
    </div>
  )
}
