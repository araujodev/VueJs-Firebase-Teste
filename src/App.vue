<template>
  <div id="app">
    <nav class="teal darken-4">
      <div class="nav-wrapper">
        <div class="container">
          <a class="brand-logo">VueJs & Firebase App</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><a href="#/">Produtos</a></li>
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
