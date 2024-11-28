//Types
import { LoginDTO, RegistrationDTO } from '@/types'
//Config
import { api, publicApi } from '../config'

class AuthService {
  login(loginDTO: LoginDTO) {
    return publicApi.post('/login', loginDTO)
  }

  registration(registrationDTO: RegistrationDTO) {
    return publicApi.post('/registration', registrationDTO)
  }

  logout() {
    return api.post('/logout')
  }
}

export { AuthService }
