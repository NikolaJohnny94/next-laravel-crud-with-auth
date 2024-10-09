import axios from 'axios'
import { cookies } from 'next/headers'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})
class ApiService {
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

  getTasks() {
    return api.get('/tasks', {
      headers: {
        Authorization: `Bearer ${cookies().get('access_token_cookie')?.value}`,
      },
    })
  }

  // getUser() {
  // {
  //   headers: {
  //     Authorization: `Bearer ${cookies().get('access_token_cookie')?.value}`,
  //   },
  // }
  // }
}

export default new ApiService()
