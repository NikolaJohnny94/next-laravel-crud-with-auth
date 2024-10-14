export type Task = {
  id: number
  title: string
  description: string
  category: 'work' | 'personal' | 'other'
  finished: boolean
  slug: string
  user_id: number
  created_at: string
  updated_at: string
}
