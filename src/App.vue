<template>
  <div id="app">
    <nav class="teal darken-4">
      <div class="nav-wrapper">
        <div class="container">
          <a href="#/" class="brand-logo">FastStore</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li>
              <a href="#/">Nova Venda</a>
            </li>
            <li>
              <a href="#/vendas/lista">Gerenciar Vendas</a>
            </li>
            <li>
              <a href="#/produtos">Produtos</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
