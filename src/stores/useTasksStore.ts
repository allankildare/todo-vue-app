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
  state: () => ({ tasks: [] as Task[] }),

  actions: {
    async populateTasks() {
      const hasTasksLS = ls.get(LOCAL_NAME)
      if (hasTasksLS) {
        const tasksLS = await ls.get(LOCAL_NAME)
        const tasksData = await JSON.parse(tasksLS)
        return (this.tasks = tasksData)
      }
    },

    async addTask(newTask: Omit<Task, 'status' | 'id'>) {
      const arrAsString = JSON.stringify([
        ...this.tasks,
        { ...newTask, id: this.tasks.length, status: 'incomplete' },
      ])
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
      const filteredTasks = await tasksData.filter(
        (item: Task) => item.id !== id
      )

      this.tasks = [...filteredTasks, { ...findTask }]

      const stringfiedArr = JSON.stringify([...filteredTasks, { ...findTask }])
      ls.set(LOCAL_NAME, stringfiedArr)
    },

    async deleteTask(id: number) {
      const getTasks = await ls.get(LOCAL_NAME)
      const tasksData = await JSON.parse(getTasks)
      const deletedTask = await tasksData.filter((item: Task) => item.id !== id)
      const stringfiedArr = JSON.stringify(deletedTask)
      this.tasks = deletedTask
      ls.set(LOCAL_NAME, stringfiedArr)
    },

    async editTask({
      id,
      title,
      description,
      date,
    }: {
      id: number
      title?: string
      description?: string
      date?: string
    }) {
      // TO DO: function that returns parsed and stringfied local storage
      const getTasks = await ls.get(LOCAL_NAME)
      const tasksData = await JSON.parse(getTasks)

      // find and update values
      const tasks = await tasksData.map((task: Task) => {
        if (task.id === id) {
          if (title) task.title = title
          if (description) task.description = description
          if (date) task.date = date
        }
        return task
      })

      // update
      this.tasks = tasks
      const stringfiedArr = JSON.stringify(tasks)
      ls.set(LOCAL_NAME, stringfiedArr)
    },
  },
  getters: {
    getTasks: state => state.tasks,
    // TO DO: getters to filtered tasks (incomplete, complete and late)
  },
})
