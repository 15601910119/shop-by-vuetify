<template>
  <v-img src="http://assets.xvivx.online/static/login.jpg" min-height="100%">
    <v-responsive
      class="d-flex align-center"
      min-height="100%"
      :style="bgStyle"
    >
      <v-container class="fill-height justify-center">
        <v-card class="pa-3 px-5 py-3" :width="400" max-width="100%">
          <v-card
            class="text-start mb-n6  elevation-6 primary pa-7"
            style="position: relative; top: -30px"
          >
            <div class="text-center">
              <h1 class="headline font-weight-bold mb-2 white--text">
                {{ login ? `欢迎回来` : `欢迎注册` }}
              </h1>
            </div>
          </v-card>
          <slot></slot>
        </v-card>
      </v-container>
    </v-responsive>
  </v-img>
</template>
<script>
import { mdiLock, mdiCheckBold } from '@mdi/js';

export default {
  props: {
    login: Boolean,
    valid: Boolean
  },
  data() {
    return {
      mdiLock,
      mdiCheckBold
    };
  },
  computed: {
    bgStyle() {
      var isMobile = this.$store.state.isMobile;

      var style = {
        padding: isMobile ? `15px 0 0` : `100px 0 150px`
      };
      return style;
    }
  }
};
</script>
