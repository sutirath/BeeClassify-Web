import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Farm from "../views/FarmManager"
import Detail from '../views/FarmManager/Detail_id.vue'
import setting from '../views/setting.vue'
import soundpredict from '../views/predict.vue'

Vue.use(VueRouter)

  const routes = [
     {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/MagagerFarm',
    name: 'Farm',
    component: Farm
  },
  {
    path: '/MagagerFarm/:Detail',
    name: 'Detail',
    component: Detail
  },

  {
    path: '/settings',
    name: 'setting',
    component: setting
  },

  {
    path: '/soundpredict',
    name: 'soundpredict',
    component: soundpredict
  },
 

]

const router = new VueRouter({
  routes
})

export default router
