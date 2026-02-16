<template>
  <div>
    <h1>Tasks</h1>

    <TaskList
      :tasks="taskStore.filteredItems"
      :isFetching="taskStore.isFetching"
      :error="taskStore.error"
      :isPending="taskStore.isPending"
      :isCreating="taskStore.isCreating"
      @fetchAll="taskStore.fetchAll()"
      @toggle="taskStore.toggle($event)"
      @remove="taskStore.remove($event)"
      @add="taskStore.add($event)"
    />
    
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useTaskStore } from '@/entities/task/model/useTaskStore'
import TaskList from '@/entities/task/ui/TaskList.vue'

const taskStore = useTaskStore()
onMounted(() => {
  taskStore.fetchAll()
})


</script>