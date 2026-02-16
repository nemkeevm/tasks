<template>
  <p v-if="isFetching">Loading...</p>
    <div v-else-if="error">
      <p>Error: {{ error }}</p>
      <button @click="emit('fetchAll')">Retry</button>
    </div>

    <div v-else-if="tasks.length === 0">
      <p>No tasks found.</p>
    </div>

    <ul v-else>
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :isPending="isPending"
        @toggle="emit('toggle', $event)"
        @remove="emit('remove', $event)"
      />
    </ul>
    <TaskCreateFrom @create="emit('add', $event)" :isCreating="isCreating"/>
</template>

<script setup lang="ts">
import { type Task, type CreateTaskDto } from '@/entities/task/api/taskApi'
import TaskItem from './TaskItem.vue';
import TaskCreateFrom from './TaskCreateFrom.vue';
defineProps<{
  tasks: Task[]
  isFetching: boolean
  error: string | null
  isCreating: boolean
  isPending: (id: number) => boolean
}>()

const emit = defineEmits<{
  (e: 'fetchAll'): void
  (e: 'toggle', id: number): void
  (e: 'remove', id: number): void
  (e: 'add', dto: CreateTaskDto): void
}>()
</script>