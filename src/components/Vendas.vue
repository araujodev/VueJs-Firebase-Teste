<template>
  <div>
    <h3>
      <i class="small material-icons">add_circle_outline</i>
      Nova Venda
    </h3>
    <div class="row">
      <form class="col s12" @submit.prevent="">
        <div class="row">
          <div class="input-field col m12 s12">
            <input v-model="query" id="nome" type="text">
            <label for="nome">Nome do Produto</label>
          </div>
        </div>
      </form>
    </div>
    <div class="row" v-if="query.length > 3">
      <div class="col s12">
        <ul class="collection with-header">
          <li class="collection-item" v-for="produto in getListFiltered" v-bind:key="produto.produto_id">
            <div>
              {{produto.nome}} <a @click.prevent="adicionarProduto(produto)" class="secondary-content"><i class="material-icons">add_box</i></a>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <h5> Itens da Venda </h5>
    <div class="row">
      <div class="col s12 m12">
        <div class="card grey lighten-4" v-for="produto in vendaDados.listaProdutos" v-bind:key="produto.produto.produto_id">
          <div class="card-content">
            <span class="card-title"> {{ produto.produto.nome }} </span>
            <p>Valor Unitário: {{ produto.produto.preco }}</p>
            <div class="card-action">
              <a href="#">This is a link</a>
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/db'

export default {
  name: 'VendasNova',
  data () {
    return {
      query: '',
      vendaDados: {
        listaProdutos: [],
        valorTotal: 0,
        formaPagamento: {
          dinheiro: 0,
          cartaoDebito: 0,
          cartaoCredito: 0,
          cheque: 0
        },
        vendaACobrar: false
      },
      produtos: []
    }
  },
  computed: {
    getListFiltered: function () {
      return this.produtos.filter(produto => produto.nome.toLowerCase().indexOf(this.query.toLowerCase()) !== -1)
    }
  },
  created () {
    this.carregarProdutos()
  },
  methods: {
    carregarProdutos () {
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
    adicionarProduto (produto) {
      this.vendaDados.listaProdutos.push({
        produto: produto,
        subTotal: produto.preco,
        quantidade: 1
      })
      this.query = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
