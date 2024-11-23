'use client'
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
} from '@nextui-org/react'
//React Hot Toast
import { toast } from 'react-hot-toast'
//Components
import { DeleteIcon } from '../Icons'
//Actions
import { deleteTask } from '@/app/actions'

type Props = {
  taskId: number
  setTaskDeleted: React.Dispatch<React.SetStateAction<boolean>>
}

export const DeleteModal = ({ taskId, setTaskDeleted }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const handleDelete = async () => {
    setTaskDeleted(false)

    const { success } = await deleteTask(taskId)

    if (success) {
      toast.success('Task deleted successfully')
      setTaskDeleted(true)
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
                <p>Are you sure you want to delete this user?</p>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' onPress={handleDelete}>
                  Confirm
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
