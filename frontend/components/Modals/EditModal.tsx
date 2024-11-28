'use client'
// Core
import React, { useState } from 'react'
// Formik
import { useFormik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
// Next UI
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Tooltip,
  Spinner,
} from '@nextui-org/react'
import { Input } from '@nextui-org/input'
import { Select, SelectItem } from '@nextui-org/select'
import { Radio, RadioGroup } from '@nextui-org/radio'
//React Hot Toast
import { toast } from 'react-hot-toast'
// Actions
import { editTask } from '@/lib/actions'
//Components
import ErrorMessage from '@/components/ErrorMessage'
import { EditIcon } from '../Icons'
// Schemas
import { taskValidationSchema } from '@/schemas'
//Data
import { categories } from '@/constants'
// Types
import { Dispatch, SetStateAction } from 'react'
import { TaskFormData, TaskResponse, Task } from '@/types'

type Props = {
  taskId: number
  title: string
  description: string
  category: 'work' | 'personal' | 'other'
  finished: boolean
  setNewTaskEdited: Dispatch<SetStateAction<boolean>>
}

export const EditModal = ({
  taskId,
  title,
  description,
  category,
  finished,
  setNewTaskEdited,
}: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [taskValuesUpdated, setTaskValuesUpdated] = useState(false)

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const formik = useFormik<TaskFormData>({
    initialValues: {
      title: title,
      description: description,
      category: category,
      finished: finished ? 'true' : 'false',
    },
    validationSchema: toFormikValidationSchema(taskValidationSchema),
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setNewTaskEdited(false)
      if (
        values.title !== title ||
        values.description !== description ||
        values.category !== category ||
        Boolean(values.finished === 'true') !== finished
      ) {
        setTaskValuesUpdated(true)
        const response: TaskResponse<Task> = await editTask(taskId, {
          title: values.title,
          description: values.description,
          category: values.category,
          finished: Boolean(values.finished === 'true'),
        })

        if (response?.success) {
          toast.success('Task edited successfully')
          setNewTaskEdited(true)
          setTaskValuesUpdated(false)
          onClose()
        } else {
          setErrorMessage(response?.message)
        }
      } else {
        onClose()
        setTaskValuesUpdated(false)
      }
    },
  })

  return (
    <>
      <Tooltip color='primary' content='Edit user'>
        <span className='text-lg text-primary cursor-pointer active:opacity-50'>
          <EditIcon onClick={onOpen} />
        </span>
      </Tooltip>

      <Modal
        className='p-6'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Update User
              </ModalHeader>
              <ModalBody>
                <form onSubmit={formik.handleSubmit}>
                  {errorMessage && <ErrorMessage message={errorMessage} />}
                  <div className='mb-4 mt-2'>
                    <Input
                      isRequired
                      type='text'
                      label='Title'
                      name='title'
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      className='max-w-xs'
                    />
                    {formik.touched.title && formik.errors.title && (
                      <ErrorMessage message={formik.errors.title as string} />
                    )}
                  </div>
                  <div className='mb-4'>
                    <Input
                      isRequired
                      type='text'
                      label='Description'
                      name='description'
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      className='max-w-xs'
                    />
                    {formik.touched.description &&
                      formik.errors.description && (
                        <ErrorMessage
                          message={formik.errors.description as string}
                        />
                      )}
                  </div>
                  <div className='mb-4'>
                    <Select
                      items={categories}
                      placeholder='Select category'
                      className='max-w-xs'
                      name='category'
                      value={formik.values.category}
                      selectedKeys={[formik.values.category]}
                      onChange={formik.handleChange}
                    >
                      {(animal) => (
                        <SelectItem key={animal.key}>{animal.label}</SelectItem>
                      )}
                    </Select>
                    {formik.touched.category && formik.errors.category && (
                      <ErrorMessage
                        message={formik.errors.category as string}
                      />
                    )}
                  </div>
                  <div className='mb-4'>
                    <RadioGroup
                      label='Task Status'
                      name='finished'
                      value={formik.values.finished}
                      onChange={formik.handleChange}
                    >
                      <Radio value='true'>Completed</Radio>
                      <Radio value='false'>Not Completed</Radio>
                    </RadioGroup>
                  </div>
                  <Button
                    type='submit'
                    color='danger'
                    className='text-white'
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting && taskValuesUpdated ? (
                      <span className='flex items-center'>
                        {' '}
                        Submitting...
                        <Spinner color='white' size='sm' />
                      </span>
                    ) : (
                      <span>Submit</span>
                    )}
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
