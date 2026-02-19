<template>
  <div>
    <button :class="{ active: currentFilter === 'all' }" @click="emit('changeFilter', 'all')">All</button>
    <button :class="{ active: currentFilter === 'active' }" @click="emit('changeFilter', 'active')">Active</button>
    <button :class="{ active: currentFilter === 'completed' }" @click="emit('changeFilter', 'completed')">Completed</button>
  </div>
</template>

<script setup lang="ts">
import { type Filter } from '@/entities/task/model/useTaskStore'
const emit = defineEmits<{
  (e: 'changeFilter', filter: Filter): void
}>()
defineProps<{
  currentFilter: Filter
}>()
</script>