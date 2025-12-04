import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '@/views/UserView.vue'

import UserHome from '@/components/UserHome.vue'
import UserPosts from '@/components/UserPosts.vue'
import UserProfile from '@/components/UserProfile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },

    {
      path: '/user/:id', // url
      name: 'user', 
      component: UserView, // component의 디렉토리는 views 디렉토리다. component 디렉토리가 아님
      beforeEnter: (to, from) =>{
        console.log(from)
        console.log(to)
      },
      // components 디렉토리 짜주기
      children: [
      {path: '', name: 'user', component: UserHome}, //http://localhost:5173/user/:id
      {path: 'profile', name: 'user-profile', component: UserProfile}, //http://localhost:5173/user/:id/profile
      {path: 'posts', name: 'user-posts', component: UserPosts}, //http://localhost:5173/user/:id/posts

      ]
    },
  ],
})

export default router
