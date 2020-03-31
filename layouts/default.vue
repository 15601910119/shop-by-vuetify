<template>
  <v-app id="liguoyin-app">
    <!-- 侧边栏导航，用于移动端 -->
    <v-navigation-drawer
      v-model="drawer"
      bottom
      fixed
      :mobile-break-point="500"
      class="hidden-sm-and-up"
    >
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>{{ mdiHome }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>首页</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/shop">
          <v-list-item-action>
            <v-icon>{{ mdiShopping }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>购物</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="false" app color="primary" dark :height="64">
      <v-app-bar-nav-icon
        class="hidden-sm-and-up"
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span>蝈蝈商店</span>
      </v-toolbar-title>
      <v-spacer />

      <v-btn icon>
        <v-icon>{{ mdiApps }}</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>{{ mdiBell }}</v-icon>
      </v-btn>
      <v-menu
        bottom
        left
        offset-y
        min-width="200px"
        transition="slide-y-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon large v-on="on" v-if="$store.state.userInfo.username">
            <v-avatar size="32px" item>
              <v-img :src="$store.state.userInfo.avatar" alt="Vuetify"
            /></v-avatar>
          </v-btn>
          <v-btn icon large v-else link to="/login">
            登录
          </v-btn>
        </template>

        <v-list>
          <v-list-item link to="/login">
            <v-list-item-title>登录</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>个人中心</v-list-item-title>
          </v-list-item>

          <v-divider class="mt-2 mb-2"></v-divider>
          <v-list-item link>
            <v-list-item-title>退出登录</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer padless color="primary" dark>
      <v-col class="lighten-2 py-4 text-center" cols="12">
        CopyRight©2020
      </v-col>
    </v-footer>
    <v-snackbar
      top
      color="error"
      :timeout="3000"
      :value="$store.state.toast.show"
      @input="$store.commit(`set-toast`, { show: false })"
    >
      {{ $store.state.toast.message }}
    </v-snackbar>
  </v-app>
</template>

<script>
import {
  mdiHome,
  mdiShopping,
  mdiMagnify,
  mdiPlus,
  mdiBell,
  mdiApps
} from '@mdi/js';
export default {
  data: () => ({
    mdiApps,
    mdiBell,
    mdiPlus,
    mdiMagnify,
    mdiHome,
    mdiShopping,
    drawer: false,
    links: [`首页`, `项目介绍`, `联系我`]
  }),
};
</script>

<style lang="scss">
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  transition-delay: 99999s;
}
</style>
