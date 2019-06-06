<template>
  <div>
    <h3>
      <i class="small material-icons">add_circle_outline</i>
      Nova Venda
      <router-link to="/vendas/lista" class="btn">Listar Vendas</router-link>
    </h3>
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col m12 s12">
            <input id="nome" type="text" class="validate" v-model="vendaDados.nome">
            <label v-bind:class="{ active: labelIsActive }" for="nome">Nome do Produto</label>
          </div>
        </div>
        <div class="row">
          <a @click.prevent="adicionarOuCriarProduto" class="waves-effect waves-light btn">Salvar</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from '@/db';

export default {
  name: 'VendasNova',
  data () {
    return {
      vendaDados: {
        produto_id: '',
        nome: '',
        preco: '',
        estoque: '',
        preco_custo: ''
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
