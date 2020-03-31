<template>
  <v-card
    class="mx-auto my-12"
    width="256"
    tile
  >
    <v-navigation-drawer permanent>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
            <v-list-item-title class="title">李国印</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list
      >
        <v-list-item-group v-model="item" color="primary">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>
<script>
  export default {
    middleware: 'auth',
    data: () => ({
      item: 0,
      items: [
        { text: '个人资料', icon: 'mdi-folder' },
        { text: '收货地址', icon: 'mdi-account-multiple' },
        { text: '我的消息', icon: 'mdi-star' },
      ],
    }),
  }
</script>