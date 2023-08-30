import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: '/',
         name: 'home',
         component: () => import('../views/HomeView.vue')
      },
      {
         path: '/login',
         name: 'login',
         component: () => import('../views/LoginView.vue')
      },
      {
         path: '/sign-up',
         name: 'sign-up',
         component: () => import('../views/SingUpView.vue')
      },
      {
         path: '/personal',
         name: 'personal',
         component: () => import('../views/PersonalView.vue'),
         children: [
            {
               path: 'todos',
               name: 'todos',
               component: () => import('./../views/lists/TodosListView.vue')
            },
            {
               path: 'notes',
               name: 'notes',
               component: () => import('./../views/lists/NotesListView.vue')
            }
         ]
      },
      {
         path: '/:pathMatch(.*)*',
         name: 'not-found',
         component: () => import('../views/NotFoundView.vue')
      }
   ]
})

export default router
