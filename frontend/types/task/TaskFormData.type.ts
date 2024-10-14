export type TaskFormData = {
  title: string
  description: string
  category: 'work' | 'personal' | 'other'
  finished: 'true' | 'false'
}
