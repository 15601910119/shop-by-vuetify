<template>
  <div>
    <v-carousel
      dark
      height="30vw"
      interval="3000"
      show-arrows-on-hover
    >
      <v-carousel-item
        :key="i"
        :src="(item).image"
        reverse-transition="fade-transition"
        transition="fade-transition"
        v-for="(item,i) in banners"
      >
        <v-layout
          column
          justify-center
          style="height: 100%"
        >
          <v-container>
            <h1>{{item.title}}</h1>
            <p>{{item.text}}</p>
          </v-container>
        </v-layout>
      </v-carousel-item>
    </v-carousel>

    <v-container>
      <v-row>
        <v-col
          :key="item.id"
          cols="4"
          v-for="item in flow"
        >
          <v-card class="d-flex align-center px-8 py-2">
            <v-img
              :src="item.src"
              class="mr-5"
              contain
              height="50px"
              max-width="50px"
            ></v-img>
            <v-col ml8>
              <div class="body-2 text-uppercase mb-2">Dedicated Support</div>
              <div class="body-1 font-weight-bold mb-3">Live chat on Discord</div>
              <div class="caption grey--text">*Talk with a Developer</div>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- 商品轮播 -->
    <section class="container">
      <div class="text-center py-12">
        <h2 class="font-weight-bold display-2">折扣商品</h2>
      </div>

      <v-slide-group
        class="pa-4"
        show-arrows
        v-model="model"
      >
        <v-slide-item
          :key="commodity.id"
          v-for="commodity in discountCommodity"
        >
          <commodity :data="commodity"></commodity>
        </v-slide-item>
      </v-slide-group>
    </section>

    <!-- 在线品牌 -->
    <section class="container">
      <div class="text-center py-12">
        <h2 class="font-weight-bold display-2">在线品牌</h2>
      </div>
      <v-flex class="d-flex">
        <v-card
          :key="brand.id"
          class="mx-4 my-1"
          height="200"
          v-for="brand in brands"
          width="200"
        >
          <v-img
            :aspect-ratio="1/1"
            :src="brand.image"
            contain
          ></v-img>
        </v-card>
      </v-flex>
    </section>

    <!-- 所有商品 -->
    <section class="container">
      <div class="text-center py-12">
        <h2 class="font-weight-bold display-2">所有商品</h2>
      </div>
      <v-flex class="d-flex">
        <div
          :key="commodity.id"
          v-for="commodity in commodities"
        >
          <commodity :data="commodity"></commodity>
        </div>
      </v-flex>
    </section>
  </div>
</template>

<script>
import Commodity from '~/components/Commodity';
export default {
  components: {
    commodity: Commodity
  },
  mounted() {
    this.$ajax.get('banner/get', { status: 'on' }).then(resp => {
      this.banners = resp.data;
    });
    this.$ajax.get('/commodity/common/discounted').then(resp => {
      this.discountCommodity = resp.data;
    });
    this.$ajax.get('/category/common/query').then(resp => {
      this.brands = resp.data;
    });
    this.$ajax
      .get('/commodity/common/query', { pageStart: 0, pageSize: 10 })
      .then(resp => {
        this.commodities = resp.data;
      });
  },
  methods: {
    onSlideToggle(commodity, scope) {
      this.choosed = commodity;
      scope.toggle();
    }
  },
  data() {
    return {
      choosed: {},
      model: '',
      discountCommodity: [],
      brands: [],
      commodities: [],
      banners: [],
      flow: [
        { id: 1, src: 'https://store.vuetifyjs.com/img/support.f353d1a9.png' },
        { id: 2, src: 'https://store.vuetifyjs.com/img/support.f353d1a9.png' },
        { id: 3, src: 'https://store.vuetifyjs.com/img/support.f353d1a9.png' },
      ]
    };
  }
};
</script>