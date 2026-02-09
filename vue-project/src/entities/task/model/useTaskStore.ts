import { defineStore } from 'pinia'
import { taskApi, type Task, CreateTaskDto, UpdateTaskDto } from '@/entities/task/api/taskApi'

export type Filter = 'all' | 'active' | 'completed'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    items: [] as Task[],
    filter: 'all' as Filter,
    isLoading: false,
    error: null as string | null
  }),

  getters: {
    filteredItems(state): Task[] {
      if (state.filter === 'active') return state.items.filter((t: Task) => !t.completed)
      if (state.filter === 'completed') return state.items.filter((t: Task) => t.completed)
      return state.items
    }
  },

  actions: {
    async fetchAll() {
      this.isLoading = true
      this.error = null
      try {
        this.items = await taskApi.list()
      } catch (e) {
        this.error = e instanceof Error ? e.message : 'Unknown error'
      } finally {
        this.isLoading = false
      }
    },

    async add(data: CreateTaskDto) {
      const created = await taskApi.create(data)
      this.items.unshift(created)
    },

    async toggle(id: number) {
      const task = this.items.find((t: Task) => t.id === id)
      if (!task) return
      const updated = await taskApi.update(id, { completed: !task.completed })
      Object.assign(task, updated)
    },

    async update(id: number, data: UpdateTaskDto) {
      const task = this.items.find((t: Task) => t.id === id)
      if (!task) return
      const updated = await taskApi.update(id, data)
      Object.assign(task, updated)
    },

    async remove(id: number) {
      await taskApi.remove(id)
      this.items = this.items.filter((t: Task) => t.id !== id)
    }
  }
})