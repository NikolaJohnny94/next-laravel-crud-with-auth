// import { apiService } from '@/services/apiService'
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})
class ApiService {
  async login(email: string, password: string) {
    const response = await api.post('/login', {
      email,
      password,
    })

    localStorage.setItem('access_token', response.data.token)

    return response.data
  }

  // login(email: string, password: string) {
  //   return api.post('/login', {
  //     email,
  //     password,
  //   })
  // }
}
//   loginExample(email: string, password: string) {
//     return axios.post('/login', {
//       email,
//       password,
//     })
//   }

//   const loginMehod = async (email: string, password: string) => {
//     const response = await apiService.loginExample(email, password)
//   }
// }

export default new ApiService()
