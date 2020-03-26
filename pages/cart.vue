<template>
  <v-container>
    <div class="section-header text-center">
      <h1>你的购物车</h1>
    </div>
    <v-form>
      <v-simple-table fixed-header>
        <template v-slot:default>
          <thead class="cart__row cart__header">
            <tr>
              <th class="text-left">商品</th>
              <th class="text-right">价格</th>
              <th class="text-right">数量</th>
              <th class="text-right">总价</th>
            </tr>
          </thead>
          <tbody>
            <tr class="cart__row border-bottom line1 cart-flex border-top">
              <td class="cart__image-wrapper cart-flex-item">
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-form>
  </v-container>
</template>
<script>
export default {};
</script>