'use server'

// Services
import { TasksService } from '@/services'
//Types
import type { Task, TaskResponse, CreateTaskDTO } from '@/types'
import type { AxiosResponse } from 'axios'

// Creating an instance of the TasksService
const taskService = new TasksService()

/**
 * Retrieves a list of all tasks.
 * @returns A promise resolving to a TaskResponse containing the success status, the list of tasks and a message.
 */
export async function getTasks() {
  try {
    const response: AxiosResponse<TaskResponse<Task[]>> =
      await taskService.getTasks()
    return response.data
  } catch (error: any) {
    return {
      success: false,
      data: [] as Task[],
      message: error.response.data.message as string,
    }
  }
}

/**
 * Retrieves a single task by its ID.
 * @param id - The ID of the task to be retrieved.
 * @returns A promise resolving to a TaskResponse containing the success status, the task data and a message.
 */
export async function getTask(id: number) {
  try {
    const response: AxiosResponse<TaskResponse<Task>> =
      await taskService.getTask(id)
    return response.data
  } catch (error: any) {
    console.log(error.response.data)
    return {
      success: false,
      data: {} as Task,
      message: error.response.data.message as string,
    }
  }
}

/**
 * Creates a new task.
 * @param title - The title of the task.
 * @param description - The description of the task.
 * @param category - The category of the task.
 * @param finished - Whether the task is finished or not.
 * @returns A promise resolving to a TaskResponse containing the success status, the task data and a message.
 */
export async function createTask(createTaskDTO: CreateTaskDTO) {
  try {
    const response: AxiosResponse<TaskResponse<Task>> =
      await taskService.createTask(createTaskDTO)
    return response.data
  } catch (error: any) {
    console.log(error.response.data)
    return {
      success: false,
      data: {} as Task,
      message: error.response.data.message as string,
    }
  }
}

/**
 * Edits a task with the specified ID.
 * @param id - The ID of the task to be edited.
 * @param data - The new data for the task.
 * @returns A promise resolving to a TaskResponse containing the success status, the task data and a message.
 */
export async function editTask(id: number, data: Partial<CreateTaskDTO>) {
  try {
    const response: AxiosResponse<TaskResponse<Task>> =
      await taskService.editTask(id, data)
    return response.data
  } catch (error: any) {
    return {
      success: false,
      data: {} as Task,
      message: error.response.data.message as string,
    }
  }
}

/**
 * Deletes a task with the specified ID.
 * @param id - The ID of the task to be deleted.
 * @returns A promise resolving to a TaskResponse containing the success status and message.
 */
export async function deleteTask(id: number) {
  try {
    const response: AxiosResponse<TaskResponse<Task>> =
      await taskService.deleteTask(id)
    return response.data
  } catch (error: any) {
    console.log(error.response.data)
    return {
      success: false,
      data: {} as Task,
      message: error.response.data.message as string,
    }
  }
}
