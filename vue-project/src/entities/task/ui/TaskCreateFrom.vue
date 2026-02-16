<template>
  <h1>Create Task</h1>
  <form @submit.prevent="createTask">
    <div>
      <label for="name">Name:</label>
      <input id="name" v-model="name" required />
    </div>
    <div>
      <label for="description">Description:</label>
      <textarea id="description" v-model="description" required></textarea>
    </div>
    <button type="submit" :disabled="isCreating || !hasValue">Create Task</button>
  </form>

</template>

<script setup lang="ts">
import { type CreateTaskDto } from '@/entities/task/api/taskApi'
import { computed, ref } from 'vue'

const props = defineProps<{
  isCreating: boolean
}>()

const emit = defineEmits<{
  (e: 'create', dto: CreateTaskDto): void
}>()

const createTask = () => {
  if (!hasValue.value) return
  emit('create', { name: name.value, description: description.value })
}

const name = ref('')
const description = ref('')

const hasValue = computed(() => {
  return name.value.trim() !== '' && description.value.trim() !== ''
})

</script>