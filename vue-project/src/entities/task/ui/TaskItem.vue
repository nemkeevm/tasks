<template>
<li>
  <p>title: {{ task.name }}</p>
  <p>description: {{ task.description }}</p>
  <button :disabled="isPending(task.id)" @click="emit('toggle', task.id)">Toggle</button>
  <button :disabled="isPending(task.id)" @click="emit('remove', task.id)">Remove</button>
</li>
</template>

<script setup lang="ts">
import { type Task } from '@/entities/task/api/taskApi'
defineProps<{
  task: Task
  isPending: (id: number) => boolean
}>()

const emit = defineEmits<{
  toggle: [id: number]
  remove: [id: number]
}>()
</script>