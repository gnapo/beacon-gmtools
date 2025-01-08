import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShopsView from "@/views/ShopsView.vue";
import LootCrateRollerView from "@/views/LootCrateRollerView.vue";
import AllLootView from '@/views/AllLootView.vue'
import TypedLootView from '@/views/TypedLootView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/allloot',
      name: 'allloot',
      component: AllLootView,
    },
    {
      path: '/someloot',
      name: 'someLoot',
      component: TypedLootView,
    },
    {
      path: '/loot',
      name: 'loot',
      component: LootCrateRollerView,
    },
    {
      path: '/shops',
      name: 'shops',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: ShopsView,
    },
  ],
})

export default router
