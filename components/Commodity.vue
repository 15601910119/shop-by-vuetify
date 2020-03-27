<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      class="mx-4 my-1"
      link
      width="250px"
    >
      <v-img
        :aspect-ratio="1/1"
        :src="data.image"
        class="grey lighten-4"
        contain
        height="250px"
      ></v-img>
      <div
        class="px-5 pb-4 pt-8"
        style="position: relative"
      >
        <v-btn
          :style="hover ? {transform: `translate3D(0, -50%, 0)`} : null"
          absolute
          class="accent transition-swing"
          fab
          large
          right
          top
        >
          <v-icon large>mdi-cart</v-icon>
        </v-btn>

        <v-sheet
          class="title font-weight-bold mb-3 transparent text-truncate"
          style="height: 64px;"
        >{{data.name}}</v-sheet>
      </div>
      <v-card-actions class="d-flex justify-space-between align-center">
        <div class="pl-2 d-flex align-center">
          <del class="grey--text">{{data.discount}}</del>
          <div class="subtitle-1 font-weight-bold error--text mr-auto">{{data.price}}</div>
        </div>
        <v-btn
          @click="onAddCart(data)"
          class="text-none black--text"
          text
        >加入购物车</v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>
<script>
export default {
  props: {
    data: Object
  },
  methods: {
    onAddCart(data) {
      this.$store.dispatch('add-to-cart-store').then(resp => {
      })
    }
  }
};
</script>