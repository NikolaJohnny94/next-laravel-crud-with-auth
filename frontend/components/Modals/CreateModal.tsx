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
  Spinner,
} from '@nextui-org/react'
import { Input } from '@nextui-org/input'
import { Select, SelectItem } from '@nextui-org/select'
import { Radio, RadioGroup } from '@nextui-org/radio'
// React Icons
import { MdOutlineAddTask } from 'react-icons/md'
//React Hot Toast
import { toast } from 'react-hot-toast'
// Actions
import { createTask } from '@/lib/actions'
//Components
import ErrorMessage from '@/components/ErrorMessage'
// Schemas
import { taskValidationSchema } from '@/schemas'
//Data
import { categories } from '@/constants'
// Types
import { Dispatch, SetStateAction } from 'react'
import { Task, TaskFormData, TaskResponse } from '@/types'

type Props = {
  setNewTaskCreted: Dispatch<SetStateAction<boolean>>
}

export const CreateModal = ({ setNewTaskCreted }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const formik = useFormik<TaskFormData>({
    initialValues: {
      title: '',
      description: '',
      category: '' as 'work' | 'personal' | 'other',
      finished: 'false',
    },
    validationSchema: toFormikValidationSchema(taskValidationSchema),
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setNewTaskCreted(false)
      const response: TaskResponse<Task> = await createTask({
        title: values.title,
        description: values.description,
        category: values.category,
        finished: Boolean(values.finished === 'true'),
      })
      if (response?.success) {
        toast.success(response.message)
        setNewTaskCreted(true)
        onClose()
      } else {
        setErrorMessage(response?.message)
      }
    },
  })

  return (
    <>
      <Button onPress={onOpen} color='danger'>
        <MdOutlineAddTask size={20} /> New Task
      </Button>
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
                Create New Task
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
                    {formik.isSubmitting ? (
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
