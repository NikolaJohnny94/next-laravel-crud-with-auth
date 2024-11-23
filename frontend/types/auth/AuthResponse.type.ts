import { Response as BasicResponse } from '../shared/Response.type'

export type AuthResponse = {
  data: {
    id: number
    name: string
    email: string
    email_verified_at: string | null
    created_at: string
    updated_at: string
  }
  token: string
} & BasicResponse
