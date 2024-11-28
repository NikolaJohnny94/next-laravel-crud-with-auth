'use client'
//Core
import { useState } from 'react'
//Next UI
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
  Spinner,
} from '@nextui-org/react'
//React Hot Toast
import { toast } from 'react-hot-toast'
//Components
import { DeleteIcon } from '../Icons'
//Actions
import { deleteTask } from '@/lib/actions'

type Props = {
  taskId: number
  setTaskDeleted: React.Dispatch<React.SetStateAction<boolean>>
}

export const DeleteModal = ({ taskId, setTaskDeleted }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const handleDelete = async () => {
    setIsSubmitting(true)
    setTaskDeleted(false)

    const { success } = await deleteTask(taskId)

    if (success) {
      toast.success('Task deleted successfully')
      setTaskDeleted(true)
      setIsSubmitting(false)
      onClose()
    }
  }

  return (
    <>
      <Tooltip color='danger' content='Delete user'>
        <span className='text-lg text-danger cursor-pointer active:opacity-50'>
          <DeleteIcon onClick={onOpen} />
        </span>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Delete Confirmation
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this task?</p>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' onPress={handleDelete}>
                  {isSubmitting ? (
                    <span className='flex items-center'>
                      Deleting...
                      <Spinner color='white' size='sm' className='ml-2' />
                    </span>
                  ) : (
                    <span>Confirm</span>
                  )}
                </Button>
                <Button color='primary' onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
