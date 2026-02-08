import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface IToDo {
  id: number
  name: string
  description: string
  completed: boolean
}

type CreateToDo = Pick<IToDo, 'name' | 'description'> 
type UpdateToDo = Partial<Pick<IToDo, 'name' | 'description' | 'completed'>>

export const useTodosStore = defineStore('todos', () => {
  const todos = ref<IToDo[]>([])
  const nextId = ref(1)

  const add = (todo: CreateToDo) => {
    todos.value.push({
      id: nextId.value++,
      name: todo.name,
      description: todo.description,
      completed: false
    })
  }

  const update = (id: number, todo: UpdateToDo) => {
    const index = todos.value.findIndex((i) => i.id === id )
    if (index == -1 || !todos.value[index]) return false
    todos.value[index] = {
      ...todos.value[index],
      ...todo
    }
    return true
  }

  const remove = (id: number) => {
    const index = todos.value.findIndex((i) => i.id == id)
    if (index == -1 || !todos.value[index]) false
    todos.value.splice(index, 1)
  }

  const activeTodos = computed(() => {
    return todos.value.filter((i) => !i.completed)
  })

  const completedTodos = computed(() => {
    return todos.value.filter((i) => i.completed)
  })

  return { todos, add, update, remove, activeTodos, completedTodos }
})
