<template>
  <div>
    <h1>Tasks</h1>

    <TaskList
      :tasks="taskStore.filteredItems"
      :currentFilter="taskStore.filter"
      :isFetching="taskStore.isFetching"
      :error="taskStore.error"
      :isPending="taskStore.isPending"
      :isCreating="taskStore.isCreating"
      :isDeleting="taskStore.isDeleting"
      @fetchAll="taskStore.fetchAll()"
      @toggle="taskStore.toggle($event)"
      @remove="taskStore.remove($event)"
      @add="taskStore.add($event)"
      @changeFilter="onChangeFilter($event)"
    />
    
  </div>
</template>
<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore, type Filter } from '@/entities/task/model/useTaskStore'
import TaskList from '@/entities/task/ui/TaskList.vue'

const taskStore = useTaskStore()
const route = useRoute()
const router = useRouter()

const parseFilter = (v: unknown): Filter => {
  return v === 'active' || v === 'completed' || v === 'all' ? v : 'all'
}

watch(
  () => route.query.filter,
  (newFilter) => {
    taskStore.setFilter(parseFilter(newFilter))
  },
  { immediate: true }
)

const onChangeFilter = (filter: Filter) => {
  taskStore.setFilter(filter)
  router.replace({ query: { ...route.query, filter: filter === 'all' ? undefined : filter } })
}


onMounted(() => {
  taskStore.fetchAll()
})


</script>