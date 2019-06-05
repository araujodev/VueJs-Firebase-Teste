import Vue from 'vue'
import Router from 'vue-router'
import Produtos from '@/components/Produtos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Produtos',
      component: Produtos
    }
  ]
})
