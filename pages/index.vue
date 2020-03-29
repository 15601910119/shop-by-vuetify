<template>
  <section class="home-page">
    <v-carousel interval="3000" :height="$vuetify.breakpoint.smAndDown ? 300 : 500" :show-arrows="false">
      <v-carousel-item
        :key="i"
        :src="item.image"
        v-for="(item, i) in banners"
      >
        <v-layout column justify-center style="height: 100%">
          <v-container>
            <h1>{{ item.title }}</h1>
            <p>{{ item.text }}</p>
          </v-container>
        </v-layout>
      </v-carousel-item>
    </v-carousel>

    <!-- 折扣商品 -->
    <section class="container discounted">
      <div class="text-center py-6">
        <h2 class="font-weight-bold display-1">折扣商品</h2>
      </div>
      <v-row class="commodity">
        <v-col
          :key="commodity.id"
          v-for="commodity in discountCommodity"
          v-bind="medias"
        >
          <commodity :data="commodity"></commodity>
        </v-col>
      </v-row>
    </section>

    <!-- 在线品牌 -->
    <section class="container">
      <div class="text-center py-6">
        <h2 class="font-weight-bold display-1">在线品牌</h2>
      </div>
      <v-row class="commodity">
        <v-col
          :key="brand.id"
          v-for="brand in brands"
          v-bind="medias"
        >
          <v-card>
            <v-img :aspect-ratio="1 / 1" :src="brand.image" contain></v-img>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <!-- 所有商品 -->
    <section class="container">
      <div class="text-center py-6">
        <h2 class="font-weight-bold display-1">所有商品</h2>
      </div>
      <v-row class="commodity">
        <v-col
          :key="commodity.id"
          v-for="commodity in commodities"
          v-bind="medias"
        >
          <commodity :data="commodity"></commodity>
        </v-col>
      </v-row>
    </section>
  </section>
</template>

<script>
import Commodity from '~/components/Commodity';
export default {
  components: {
    commodity: Commodity
  },
  head() {
    return {
      title: `首页`
    };
  },
  mounted() {
    this.$ajax.get('/commodity/common/discounted').then((resp) => {
      this.discountCommodity = resp.data;
    });
    this.$ajax.get('/category/common/query').then((resp) => {
      this.brands = resp.data;
    });
    this.$ajax
      .get('/commodity/common/query', {
        params: { pageStart: 0, pageSize: 10 }
      })
      .then((resp) => {
        this.commodities = resp.data;
      });
  },
  methods: {
    onSlideToggle(commodity, scope) {
      this.choosed = commodity;
      scope.toggle();
    }
  },
  async asyncData({ $axios, req }) {
    var asyncArr = [
      // 获取轮播信息
      $axios.$get(`/banner/get`, {
        params: { status: `on` }
      }),
      // 获取打折商品
      $axios.$get('/commodity/common/discounted'),
      // 获取品牌
      $axios.$get(`/category/common/query`),
      // 获取商品列表，仅拉前10个数据
      $axios.$get(`/commodity/common/query`, {
        params: { pageStart: 0, pageSize: 10 }
      })
    ].map((promise) => {
      return promise.then((resp) => resp.data || []).catch(() => []);
    });

    var [banners, discounts, brands, commodities] = await Promise.all(asyncArr);
    return {
      banners,
      discountCommodity: discounts,
      brands,
      commodities
    };
  },
  data() {
    return {
      choosed: {},
      medias: {
        sm: 4,
        lg: 3,
        xl: 2,
        cols: 6
      }
    };
  }
};
</script>

<style lang="scss">
.home-page {
  @media (max-width: 500px) {
    .commodity {
      .col-6 {
        &:nth-child(odd) {
          padding-left: 0;
        }

        &:nth-child(even) {
          padding-right: 0;
        }
      }
    }
  }
}
</style>
