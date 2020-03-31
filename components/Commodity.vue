<template>
  <v-hover v-slot:default="{ hover }">
    <v-card link>
      <v-img
        :aspect-ratio="1 / 1"
        :src="data.image"
        class="grey lighten-4"
        contain
      ></v-img>
      <div class="px-5 pb-4 pt-8" style="position: relative">
        <v-btn
          :style="hover ? { transform: `translate3D(0, -50%, 0)` } : null"
          absolute
          class="accent transition-swing"
          fab
          :large="$vuetify.breakpoint.mdAndUp"
          right
          top
        >
          <v-icon large>{{ mdiCart }}</v-icon>
        </v-btn>

        <v-sheet
          class="title font-weight-bold mb-3 transparent text-truncate"
          >{{ data.name }}</v-sheet
        >
      </div>
      <v-card-actions class="d-flex justify-space-between align-center">
        <div class="pl-3 d-flex align-center">
          <del class="grey--text">{{ data.discount }}</del>
          <div class="subtitle-1 font-weight-bold error--text mr-auto">
            {{ data.price | price }}
          </div>
        </div>
        <v-btn @click="onAddCart(data)" class="text-none" text
          >加入购物车</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-hover>
</template>
<script>
import { mdiCart } from '@mdi/js';

export default {
  props: {
    data: Object
  },
  data() {
    return {
      mdiCart
    };
  },
  methods: {
    onAddCart(data) {
      this.$store.dispatch('add-to-cart-store').then((resp) => {});
    }
  }
};
</script>
