import { defineStore } from 'pinia'
import ls from './localStorage'

interface Task {
    id: number
    title: string
    date: string
    description: string
    status: 'incomplete' | 'complete' | 'late'
}

const LOCAL_NAME = 'tasks'

export const useTasksStore = defineStore('tasks', {
  state: () => ({ tasks: [] }),

  actions: {
    async populateTasks() {
      const hasTasksLS = ls.get(LOCAL_NAME)
      if(hasTasksLS) {
        const tasksLS = await ls.get(LOCAL_NAME)
        const tasksData = await JSON.parse(tasksLS)
        return this.tasks = tasksData
      }
    },

    async addTask(newTask: Omit<Task, 'status'| 'id'>) {
      console.log('rodando...')
      const arrAsString = JSON.stringify([...this.tasks, { ...newTask, id: this.tasks.length, status: 'incomplete' }])
      ls.set(LOCAL_NAME, arrAsString)
      this.populateTasks()
    },

    async completeTask(id: number) {
        const getTasks = await ls.get(LOCAL_NAME)
        const tasksData = await JSON.parse(getTasks)
        const findTask = await tasksData.find((item: Task) => item.id === id)
        // changing status to 'complete'
        findTask.status = 'complete'

        // updating local storage
        const filteredTasks = await tasksData.filter((item: Task) => item.id !== id) // all tasks except the current one
        this.tasks = [...filteredTasks, { ...findTask }]
        const stringfiedArr = await JSON.stringify([...filteredTasks, { ...findTask }])
        ls.set(LOCAL_NAME, stringfiedArr)
    }
  },
  getters: {
    getTasks: (state) => state.tasks
  }
})
