<template>
  <div>
    <h3>
      <i class="small material-icons">add_circle_outline</i>
      Nova Venda
    </h3>
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col m9 s12">
            <input v-model="query" id="nome" type="text" class="validate">
            <label for="nome">Nome do Produto</label>
          </div>
          <div class="input-field col m3 s12">
            <a @click.prevent="buscarProduto" class="waves-effect waves-light btn">Buscar</a>
          </div>
        </div>
        <!-- <div class="row">
          <a @click.prevent="adicionarOuCriarProduto" class="waves-effect waves-light btn">Salvar</a>
        </div>-->
      </form>
    </div>

    <div v-bind:class="{ active: boxIsActive }" id="produtos-search">teste</div>
  </div>
</template>

<script>
import db from '@/db';

export default {
  name: 'VendasNova',
  data () {
    return {
      query: '',
      vendaDados: {
        produto_id: '',
        nome: '',
        preco: '',
        estoque: '',
        preco_custo: ''
      },
      boxIsActive: false
    }
  },
  create () {
    db.collection('Produtos')
      .get()
      .then(querySnapshot => {
        const produtos = []
        querySnapshot.forEach(doc => {
          produtos.push(doc.data())
        })
        this.produtos = produtos
      })
  },
  computed: {
    filtrarProdutos () {
      return this.produtos.filter(produto => {
        return '';
      })
    }
  },
  methods: {
    buscarProduto () {
      if (this.query !== '') {
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
