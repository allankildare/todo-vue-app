export interface Task {
  id: number
  title: string
  date: string
  description: string
  status: 'incomplete' | 'complete'
}
