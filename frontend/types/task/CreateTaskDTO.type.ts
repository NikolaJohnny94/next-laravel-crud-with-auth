export type CreateTaskDTO = {
  title: string
  description: string
  category: 'work' | 'personal' | 'other'
  finished: boolean
}
