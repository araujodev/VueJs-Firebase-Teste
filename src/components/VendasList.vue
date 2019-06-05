<template>
  <div>
    <h3>
      <i class="small material-icons">assignment</i> Vendas
    </h3>
    <div class="row">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Item Name</th>
            <th>Item Price</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>$0.87</td>
          </tr>
          <tr>
            <td>Alan</td>
            <td>Jellybean</td>
            <td>$3.76</td>
          </tr>
          <tr>
            <td>Jonathan</td>
            <td>Lollipop</td>
            <td>$7.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import db from '@/db';

export default {
  name: 'VendasList',
  data () {
    return {
      vendas: []
    }
  },
  created () {
    this.recuperarVendas()
  },
  methods: {
    recuperarVendas () {
      db.collection('Vendas')
        .get()
        .then(querySnapshot => {
          const vendas = []
          querySnapshot.forEach(doc => {
            vendas.push(doc.data())
          })
          this.vendas = vendas
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
