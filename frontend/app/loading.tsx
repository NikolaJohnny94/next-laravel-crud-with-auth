import { Spinner } from '@nextui-org/spinner'

export default function App() {
  return (
    <div className='flex justify-center gap-4'>
      <span className='text-xl text-danger'>Loading...</span>{' '}
      <Spinner color='danger' />
    </div>
  )
}
