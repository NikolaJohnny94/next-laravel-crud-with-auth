import { Response as BasicResponse } from '../shared/Response.type'

export type TaskResponse<T> = { data: T } & BasicResponse
