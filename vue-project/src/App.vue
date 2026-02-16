<script setup lang="ts">
import { onMounted } from 'vue'
import { useTaskStore } from '@/entities/task/model/useTaskStore'

const taskStore = useTaskStore()

onMounted(() => {
  taskStore.fetchAll()
})
</script>

<template>
  <h1>Tasks</h1>

  <p v-if="taskStore.isFentching">Loading...</p>
  <div v-else-if="taskStore.error">
    <p>Error: {{ taskStore.error }}</p>
    <button @click="taskStore.fetchAll()">Retry</button>
  </div>

  <div v-else-if="taskStore.filteredItems.length === 0">
    <p>No tasks found.</p>
  </div>

  <ul v-else>
    <li v-for="task in taskStore.filteredItems" :key="task.id">
      <p>title: {{ task.name }}</p>
      <p>description: {{ task.description }}</p>
      <button :disabled="taskStore.pendingById[task.id]" @click="taskStore.toggle(task.id)">Toggle</button>
      <button :disabled="taskStore.pendingById[task.id]" @click="taskStore.remove(task.id)">Remove</button>
      
    </li>
  </ul>

  <button :disabled="taskStore.isCreating" @click="taskStore.add({ name: 'New Task', description: 'Description of new task' })">Add Task</button>
</template>
