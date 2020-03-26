import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/survey',
    name: 'Home',
    component: Login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/sign-up',
    component: Login
  },
  {
    path: '/imprint',
    component: () => import(/* webpackChunkName: "about" */ '../views/Imprint.vue')
  },
  {
    path: '/generalinfo',
    component: () => import(/* webpackChunkName: "about" */ '../views/GeneralInfo.vue')
  },
  {
    path: '/survey',
    name: 'Umfrage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Survey.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
