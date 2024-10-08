// import { apiService } from '@/services/apiService'
import axios from 'axios'
// import { cookies } from 'next/headers'

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

  // getUser() {
  // {
  //   headers: {
  //     Authorization: `Bearer ${cookies().get('access_token_cookie')?.value}`,
  //   },
  // }
  // }
}

export default new ApiService()
