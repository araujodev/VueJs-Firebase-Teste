import Vue from 'vue'
import Router from 'vue-router'
import Produtos from '@/components/Produtos'
import Vendas from '@/components/Vendas'
import VendasList from '@/components/VendasList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Vendas',
      component: Vendas
    },
    {
      path: '/vendas/lista',
      name: 'Vendas',
      component: VendasList
    },
    {
      path: '/produtos',
      name: 'Produtos',
      component: Produtos
    }
  ]
})
