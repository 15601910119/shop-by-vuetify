<template>
  <div :style="containerStyles">
    <v-container class="d-flex justify-center">
      <v-card class="pa-3 px-5 py-3" :width="400" max-width="100%">
        <v-card
          class="text-start mb-n6  elevation-6 primary pa-7"
          style="position: relative; top: -30px"
        >
          <slot name="title"></slot>
        </v-card>
        <slot></slot>
      </v-card>
    </v-container>
  </div>
</template>
<script>
export default {
  props: {
    login: Boolean
  },
  computed: {
    containerStyles() {
      var pt = this.$vuetify.application.top;
      var pb = this.$vuetify.application.bottom;

      return {
        'min-height': `100%`,
        'padding-top': `${pt}px`,
        'padding-bottom': `${pb}px`,
        'background-image': `url(http://assets.xvivx.online/static/login.jpg)`,
        'background-size': `cover`
      };
    }
  }
};
</script>
