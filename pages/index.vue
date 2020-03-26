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
        :src="(item).src"
        reverse-transition="fade-transition"
        transition="fade-transition"
        v-for="(item,i) in items"
      >
        <v-layout
          column
          justify-center
          style="height: 100%"
        >
          <v-container>
            <h1>{{item.title}}</h1>
            <p>{{item.text1}}</p>
            <p>{{item.text2}}</p>
          </v-container>
        </v-layout>
      </v-carousel-item>
    </v-carousel>

    <v-container>
      <v-row>
        <v-col cols="4">
          <v-card class="d-flex align-center px-8 py-2">
            <v-img
              class="mr-5"
              contain
              height="50px"
              max-width="50px"
              src="https://store.vuetifyjs.com/img/support.f353d1a9.png"
            ></v-img>
            <v-col ml8>
              <div class="body-2 text-uppercase mb-2">Dedicated Support</div>
              <div class="body-1 font-weight-bold mb-3">Live chat on Discord</div>
              <div class="caption grey--text">*Talk with a Developer</div>
            </v-col>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="d-flex align-center px-8 py-2">
            <v-img
              class="mr-5"
              contain
              height="50px"
              max-width="50px"
              src="https://store.vuetifyjs.com/img/support.f353d1a9.png"
            ></v-img>
            <v-col ml8>
              <div class="body-2 text-uppercase mb-2">Dedicated Support</div>
              <div class="body-1 font-weight-bold mb-3">Live chat on Discord</div>
              <div class="caption grey--text">*Talk with a Developer</div>
            </v-col>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="d-flex align-center px-8 py-2">
            <v-img
              class="mr-5"
              contain
              height="50px"
              max-width="50px"
              src="https://store.vuetifyjs.com/img/support.f353d1a9.png"
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
          class="mx-4 my-1"
          height="200"
          width="200"
        >
          <v-img
            :aspect-ratio="1/1"
            contain
            src="http://assets.xvivx.online/static/categories/YEA0M-UYSNI.png"
          ></v-img>
        </v-card>
        <v-card
          class="mx-4 my-1"
          height="200"
          width="200"
        >
          <v-img
            :aspect-ratio="1/1"
            contain
            src="http://assets.xvivx.online/static/categories/YEA0M-UYSNI.png"
          ></v-img>
        </v-card>
        <v-card
          class="mx-4 my-1"
          height="200"
          width="200"
        >
          <v-img
            :aspect-ratio="1/1"
            contain
            src="http://assets.xvivx.online/static/categories/YEA0M-UYSNI.png"
          ></v-img>
        </v-card>
      </v-flex>
    </section>

    <section class="container">
      <div class="text-center py-12">
        <h2 class="font-weight-bold display-2">所有商品</h2>
      </div>
      <v-flex class="d-flex">
        <div
          :key="commodity.id"
          v-for="commodity in discountCommodity"
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
      discountCommodity: [
        {
          name: '葡萄',
          image:
            'http://assets.xvivx.online/static/commodities/MJ1UY-F4XDX-9560166403931472.png',
          price: '32',
          info: '吃葡萄不去葡萄皮，不吃葡萄倒吐葡萄皮'
        },
        {
          discount: '$6',
          name: '鸡蛋',
          image:
            'http://assets.xvivx.online/static/commodities/IHXRS-X73B80.png',
          price: '22',
          info: '先有鸡还是先有蛋，这是个哲学问题'
        },
        {
          name: '帽子',
          image:
            'https://cdn.shopify.com/s/files/1/2695/0984/products/black_beanie_800px.png?v=1546888207',
          price: '34',
          info: '苹果配酒，越喝越有'
        }
      ],
      items: [
        {
          src: 'http://assets.xvivx.online/static/banners/1h4lxwhtyxa.jpeg',
          title: '千古绝对',
          text1: '天作棋盘星作子，谁人敢下。',
          text2: '地为琵琶路为弦，哪个敢弹。'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          title: '经典诗词',
          text1: '待到山花烂漫时，',
          text2: '她在丛中笑。'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          title: '词',
          text1: '问君能有几多愁。',
          text2: '恰似一汪春水向东流。'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          title: '明月',
          text1: '但愿人长久。',
          text2: '千里共婵娟'
        }
      ]
    };
  }
};
</script>
<style lang="less">
</style>
