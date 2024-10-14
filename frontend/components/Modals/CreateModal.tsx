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
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react'
import { Input } from '@nextui-org/input'
import { Select, SelectItem } from '@nextui-org/select'
import { Radio, RadioGroup } from '@nextui-org/radio'
// Actions
import { createTask, TaskResponse } from '@/app/actions'
//Components
import ErrorMessage from '@/components/ErrorMessage'
// Schemas
import { taskValidationSchema } from '@/schemas'
//Data
import { categories } from '@/constants'
// Types
import { Dispatch, SetStateAction } from 'react'
import { TaskFormData } from '@/types'

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
      const response: TaskResponse = await createTask(
        values.title,
        values.description,
        values.category,
        Boolean(values.finished === 'true')
      )
      if (response?.success) {
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
        New Task
      </Button>
      <Modal
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
                      label='Select your favorite city'
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
                    Submit
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
