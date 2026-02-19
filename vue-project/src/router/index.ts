import { createRouter, createWebHistory } from 'vue-router'
import TasksPage from '@/pages/tasks/TasksPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/tasks',
      name: 'tasks',
      component: TasksPage
    }
  ],
})

export default router
