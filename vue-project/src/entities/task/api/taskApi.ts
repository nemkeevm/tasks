import { http } from '@/shared/api/http'

export type Task = {
  id: number
  name: string
  description: string
  completed: boolean
}

export type CreateTaskDto = {
  name: string
  description: string
}
export type UpdateTaskDto = {
  name?: string
  description?: string
  completed?: boolean
}

const BASE = '/api/tasks'

export const taskApi = {
  list: () => http.get<Task[]>(BASE),
  create: (dto: CreateTaskDto) => http.post<Task>(BASE, { completed: false, ...dto }),
  update: (id: number, dto: UpdateTaskDto) => http.put<Task>(`${BASE}/${id}`, dto),
  remove: (id: number) => http.del<void>(`${BASE}/${id}`)
}