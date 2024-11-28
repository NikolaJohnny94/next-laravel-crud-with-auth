//Types
import { CreateTaskDTO } from '@/types'
//Config
import { api } from '../config'

class TasksService {
  getTasks() {
    return api.get('/tasks')
  }

  getTask(id: number) {
    return api.get(`/tasks/${id}`)
  }

  createTask(createTaskDTO: CreateTaskDTO) {
    return api.post('/tasks', createTaskDTO)
  }

  editTask(id: number, data: Partial<CreateTaskDTO>) {
    return api.put(`/tasks/${id}`, data)
  }

  deleteTask(id: number) {
    return api.delete(`/tasks/${id}`)
  }
}

export { TasksService }
