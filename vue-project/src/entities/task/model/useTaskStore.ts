import { defineStore } from 'pinia'
import { taskApi, type Task, type CreateTaskDto, type UpdateTaskDto } from '@/entities/task/api/taskApi'
import { t } from 'vue-router/dist/index-Cu9B0wDz.mjs'

export type Filter = 'all' | 'active' | 'completed'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    items: [] as Task[],
    filter: 'all' as Filter,
    isFetching: false,
    error: null as string | null,
    isCreating: false,
    pendingById: {} as Record<number, boolean>,
    deletingById: {} as Record<number, boolean>
  }),

  getters: {
    filteredItems(state): Task[] {
      if (state.filter === 'active') return state.items.filter((t: Task) => !t.completed)
      if (state.filter === 'completed') return state.items.filter((t: Task) => t.completed)
      return state.items
    }
  },

  actions: {
    isDeleting(id: number) {
      return !!this.deletingById[id]
    },
    startDeleting(id: number) {
      this.deletingById[id] = true
    },
    stopDeleting(id: number) {
      delete this.deletingById[id]
    },
    setFilter(filter: Filter) {
      this.filter = filter
    },
    isPending(id: number) {
      return !!this.pendingById[id]
    },
    startPending(id: number) {
      this.pendingById[id] = true
    },
    stopPending(id: number) {
      delete this.pendingById[id]
    },
    async fetchAll() {
      this.isFetching = true
      this.error = null
      try {
        this.items = await taskApi.list()
      } catch (e) {
        this.error = e instanceof Error ? e.message : 'Unknown error'
      } finally {
        this.isFetching = false
      }
    },

    async add(dto: CreateTaskDto) {
      if (this.isCreating) return
      this.isCreating = true
      this.error = null
      try {
        const created = await taskApi.create(dto)
        this.items.unshift(created)
      } catch (e) {
        this.error = e instanceof Error ? e.message : 'Unknown error'
      } finally {
        this.isCreating = false
      }
    },

    async toggle(id: number) {
      if (this.isPending(id)) return
      const task = this.items.find(t => t.id === id)
      if (!task) return

      const prev = task.completed
      task.completed = !prev 

      this.startPending(id)
      this.error = null
      try {
        const updated = await taskApi.update(id, { completed: task.completed })
        Object.assign(task, updated)
      } catch (e) {
        task.completed = prev
        this.error = e instanceof Error ? e.message : 'Unknown error'
      } finally {
        this.stopPending(id)
      }
    },

    async update(id: number, dto: UpdateTaskDto) {
      if (this.isPending(id)) return
      const task = this.items.find((t: Task) => t.id === id)
      if (!task) return
      this.startPending(id)
      this.error = null
      try {
        const updated = await taskApi.update(id, dto)
        Object.assign(task, updated)
      } catch (e){
        this.error = e instanceof Error ? e.message : 'Unknown error'
      } finally {
        this.stopPending(id)
      }
    },

    async remove(id: number) {
      if (this.isPending(id) || this.isDeleting(id)) return
      const task = this.items.find((t: Task) => t.id === id)
      if (!task) return
      this.startPending(id)
      this.startDeleting(id)
      this.error = null
      try {
        await taskApi.remove(id)
        this.items = this.items.filter((t: Task) => t.id !== id)
      } catch (e) {
        this.error = e instanceof Error ? e.message : 'Unknown error'
      } finally {
        this.stopPending(id)
        this.stopDeleting(id)
      }
    }
  }
})