<template>
  <v-app id="liguoyin-app">
    <!-- 侧边栏导航，用于移动端 -->
    <v-navigation-drawer v-model="drawer" app clipped>
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

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon class="d-md-none" @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">蝈蝈商店</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        :prepend-inner-icon="mdiMagnify"
        label="搜你想搜"
        class="hidden-sm-and-down"
      />
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
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
    <v-btn bottom color="pink" dark fab fixed right @click="dialog = !dialog">
      <v-icon>{{ mdiPlus }}</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="grey darken-2">
          Create contact
        </v-card-title>
        <v-container>
          <v-row class="mx-2">
            <v-col class="align-center justify-space-between" cols="12">
              <v-text-field prepend-icon="mdi-mail" placeholder="Name" />
            </v-col>
            <v-col cols="6">
              <v-text-field
                prepend-icon="mdi-account-card-details-outline"
                placeholder="请输入你所在公司"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field placeholder="请输入你的职位" />
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-mail"
                placeholder="请输入你的电子邮箱"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="tel"
                prepend-icon="mdi-phone"
                placeholder="请输入你的联系电话"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field prepend-icon="mdi-text" placeholder="Notes" />
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn text color="primary">More</v-btn>
          <v-spacer />
          <v-btn text color="primary" @click="dialog = false">取消</v-btn>
          <v-btn text @click="dialog = false">发送</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mdiHome, mdiShopping, mdiMagnify, mdiPlus, mdiBell } from '@mdi/js';
export default {
  props: {
    source: String
  },
  data: () => ({
    mdiBell,
    mdiPlus,
    mdiMagnify,
    mdiHome,
    mdiShopping,
    dialog: false,
    drawer: false
  }),
  mounted() {
    this.$store.dispatch(`QUERY_USER_INFO`);
  }
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
