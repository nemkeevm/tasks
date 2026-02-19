<template>
<li>
  <p>title: {{ task.name }}</p>
  <p>description: {{ task.description }}</p>
  <button :disabled="isPending" @click="emit('toggle', task.id)">Toggle</button>
  <button :disabled="isPending || deleting" @click="emit('remove', task.id)">Remove</button>
  <span v-if="deleting">Deleting...</span>
</li>
</template>

<script setup lang="ts">
import { type Task } from '@/entities/task/api/taskApi'
defineProps<{
  task: Task
  isPending: boolean
  deleting: boolean
}>()

const emit = defineEmits<{
  toggle: [id: number]
  remove: [id: number]
}>()
</script>