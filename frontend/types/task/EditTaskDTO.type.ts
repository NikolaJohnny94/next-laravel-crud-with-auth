export type EditTaskDTO = {
  title?: string
  description?: string
  category?: 'work' | 'personal' | 'other'
  finished?: boolean
}