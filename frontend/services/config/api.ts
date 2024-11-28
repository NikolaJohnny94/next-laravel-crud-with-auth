//Core
import { cookies } from 'next/headers'
//Axios
import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
})

api.interceptors.request.use((config) => {
  const token = cookies().get('access_token_cookie')?.value

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
