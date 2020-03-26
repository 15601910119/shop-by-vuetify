<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6> </v-flex>
    <v-layout class="px-4 pt-3">
      <v-btn transition="transition-swiming">123</v-btn>
    </v-layout>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue';
import VuetifyLogo from '~/components/VuetifyLogo.vue';

export default {
  components: {
    Logo,
    VuetifyLogo
  }
};
</script>
