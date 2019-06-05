<template>
  <div>
    <h3>
      <i class="small material-icons">add_shopping_cart</i>
      {{ labelSpace }}
    </h3>
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col m6 s12">
            <input id="nome" type="text" class="validate" v-model="produtoDados.nome">
            <label v-bind:class="{ active: labelIsActive }" for="nome">Nome do Produto</label>
          </div>
          <div class="input-field col m6 s12">
            <input id="produto_id" type="text" class="validate" v-model="produtoDados.produto_id">
            <label class="active" for="produto_id">Cód. do Produto</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col m6 s12">
            <input id="preco_custo" type="text" class="validate" v-model="produtoDados.preco_custo">
            <label v-bind:class="{ active: labelIsActive }" for="preco_custo">Preço de Custo</label>
          </div>
          <div class="input-field col m6 s12">
            <input id="preco" type="text" class="validate" v-model="produtoDados.preco">
            <label v-bind:class="{ active: labelIsActive }" for="preco">Preço de Venda</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col m12 s12">
            <input id="estoque" type="text" class="validate" v-model="produtoDados.estoque">
            <label
              v-bind:class="{ active: labelIsActive }"
              for="estoque"
            >Quantidade Atual no Estoque</label>
          </div>
        </div>
        <div class="row">
          <a
            @click.prevent="adicionarOuEditarProduto"
            class="waves-effect waves-light btn"
          >{{ labelSpace }}</a>
        </div>
      </form>
    </div>

    <h3>
      <i class="small material-icons">add_shopping_cart</i> Produtos
    </h3>
    <div class="row">
      <div v-for="produto in produtos" :key="produto.produto_id" class="col s12 m6">
        <div class="card-panel grey lighten-4">
          <h5 class="gray-text">{{ produto.nome }}</h5>
          <p class="gray-text">
            <b>Preço de Custo:</b>
            R$ {{ produto.preco_custo }}
          </p>
          <p class="gray-text">
            <b>Preço de Venda:</b>
            R$ {{ produto.preco }}
          </p>
          <p class="gray-text green lighten-4 center-align">
            <b>Lucro aproximado de:</b>
            R$ {{ formatarPreco(parseFloat(produto.preco) - parseFloat(produto.preco_custo)) }}
          </p>
          <p class="gray-text">
            <b>Estoque:</b>
            {{ produto.estoque }}
            <b>unidades.</b>
          </p>
          <p class="gray-text">
            <b>Cód. Produto:</b>
            {{ produto.produto_id }}
          </p>
          <p>
            <a
              @click.prevent="editarProduto(produto.produto_id)"
              class="waves-effect blue lighten-1 btn"
            >
              <i class="material-icons left">create</i> Editar
            </a>
            <a
              @click.prevent="removerProduto(produto.produto_id)"
              class="waves-effect red lighten-1 btn"
            >
              <i class="material-icons left">delete</i> Remover
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/db';

export default {
  name: 'Produtos',
  data () {
    return {
      produtos: [],
      produtoDados: {
        produto_id: '',
        nome: '',
        preco: '',
        estoque: '',
        preco_custo: ''
      },
      labelAdicionarProduto: 'Adicionar Novo Produto',
      labelEditarProduto: 'Editar Produto',
      labelSpace: '',
      labelIsActive: false
    }
  },
  created () {
    this.recuperarProdutos()
    this.geradorUnicoCodigoProduto()
    this.labelSpace = this.labelAdicionarProduto
  },
  methods: {
    formatarPreco (value) {
      let val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    geradorUnicoCodigoProduto () {
      this.produtoDados.produto_id =
        'cod_' +
        Math.random()
          .toString(36)
          .substr(2, 9)
    },
    recuperarProdutos () {
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
    adicionarOuEditarProduto () {
      db.collection('Produtos')
        .where('produto_id', '==', this.produtoDados.produto_id)
        .get()
        .then(querySnapshot => {
          let contador = 0
          querySnapshot.forEach(doc => {
            contador++
          })
          if (contador > 0) {
            // Editar Antigo
            db.collection('Produtos')
              .where('produto_id', '==', this.produtoDados.produto_id)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  doc.ref
                    .set({
                      produto_id: this.produtoDados.produto_id,
                      nome: this.produtoDados.nome,
                      preco: this.produtoDados.preco,
                      preco_custo: this.produtoDados.preco_custo,
                      estoque: this.produtoDados.estoque
                    })
                    .then(() => {
                      this.recuperarProdutos()
                      this.produtoDados = {
                        produto_id: '',
                        nome: '',
                        preco: '',
                        estoque: '',
                        preco_custo: ''
                      }
                      this.geradorUnicoCodigoProduto()
                      this.labelIsActive = false
                    })
                })
              })
          } else {
            // Criar Novo
            db.collection('Produtos')
              .add(this.produtoDados)
              .then(() => {
                this.produtoDados = {
                  produto_id: '',
                  nome: '',
                  preco: '',
                  estoque: '',
                  preco_custo: ''
                }
                this.geradorUnicoCodigoProduto()
                this.recuperarProdutos()
                this.labelIsActive = false
              })
          }
          this.labelSpace = this.labelAdicionarProduto
        })
    },
    editarProduto (produtoId) {
      this.labelSpace = this.labelEditarProduto
      db.collection('Produtos')
        .where('produto_id', '==', produtoId)
        .get()
        .then(querySnapshot => {
          let produto = {
            produto_id: '',
            nome: '',
            preco: '',
            estoque: '',
            preco_custo: ''
          }
          querySnapshot.forEach(doc => {
            produto = doc.data()
          })
          this.produtoDados = produto
          this.labelIsActive = true
        })
    },
    removerProduto (produtoId) {
      db.collection('Produtos')
        .where('produto_id', '==', produtoId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete().then(this.recuperarProdutos)
          })
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
