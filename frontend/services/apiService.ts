// Core
import { cookies } from 'next/headers'
//Axios
import axios from 'axios'

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL })

const config = () => {
  const token = cookies().get('access_token_cookie')?.value
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

type EditTaskDTO = {
  title?: string
  description?: string
  category?: 'work' | 'personal' | 'other'
  finished?: boolean
}
class ApiService {
  // Auth (Login, Registration and Logout)
  login(email: string, password: string) {
    return api.post('/login', {
      email,
      password,
    })
  }

  registration(
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) {
    return api.post('/registration', {
      name,
      email,
      password,
      password_confirmation,
    })
  }

  async logout() {
    return api.post('/logout', {}, config())
  }

  // Tasks (getTasks, getTask, createTask, updateTask and deleteTask)
  getTasks() {
    return api.get('/tasks', config())
  }

  getTask(id: number) {
    return api.get(`/tasks/${id}`, config())
  }

  createTask(
    title: string,
    description: string,
    category: string,
    finished: boolean
  ) {
    return api.post(
      '/tasks',
      {
        title,
        description,
        category,
        finished,
      },
      config()
    )
  }

  editTask(id: number, data: EditTaskDTO) {
    return api.put(`/tasks/${id}`, data, config())
  }

  deleteTask(id: number) {
    return api.delete(`/tasks/${id}`, config())
  }
}

export default new ApiService()
