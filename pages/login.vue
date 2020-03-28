<template>
  <login-sign>
    <div slot="title" class="text-center">
      <h1 class="display-1 font-weight-bold mb-2">登录</h1>
      <v-btn fab class="ma-1">
        <v-icon v-if="!valid">{{mdiLock}}</v-icon>
        <v-icon v-else class="success--text">mdi-check-bold</v-icon>
      </v-btn>
    </div>

    <v-card-text class="text-center">
      <div class="success--text body-1 font-weight-light">欢迎回来</div>
      <v-form v-model="valid" class="mt-10">
        <v-text-field
          class="mb-4"
          prepend-icon="mdi-face"
          v-model="form.username"
          :rules="formRules.username"
          label="用户名"
          clearable
          :success="!!form.username"
          hide-details="auto"
        ></v-text-field>
        <v-text-field
          class="mb-8"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          counter
          prepend-icon="mdi-lock"
          v-model="form.password"
          :rules="formRules.password"
          label="密码"
          :success="!!form.password"
        ></v-text-field>
        <v-btn
          text
          depressed
          large
          rounded
          class="success--text"
          @click="onLogin"
          >登录</v-btn
        >
      </v-form>
    </v-card-text>
  </login-sign>
</template>
<script>
import { mdiLock } from '@mdi/js';

import LoginSign from '~/components/LoginSign';
export default {
  components: {
    'login-sign': LoginSign
  },
  computed: {
    containerStyles() {
      var pt = this.$vuetify.application.top;
      var pb = this.$vuetify.application.bottom;

      return {
        'padding-top': `${pt}px`,
        'padding-bottom': `${pb}px`,
        'min-height': `calc(100vh - ${pt + pb}px)`
      };
    }
  },
  head() {
    return {
      title: `欢迎登录`
    };
  },
  data() {
    return {
      mdiLock,
      showPassword: false,
      valid: false,
      form: {},
      formRules: {
        username: [
          (value) => !!value || '用户名必填',
          (value) => (value && value.length >= 3) || '用户名长度最少3位'
        ],
        password: [
          (value) => !!value || '密码不能为空',
          (value) => (value && value.length >= 3) || '密码长度最少3位'
        ]
      }
    };
  },
  methods: {
    async onLogin() {
      if (this.valid) {
        var { token } = await this.$ajax.post(`/user/login`, this.form);

        window.localStorage && window.localStorage.setItem(`token`, token);

        this.$store.dispatch(`QUERY_USER_INFO`);
        this.$router.push(`/`);
      }
    }
  }
};
</script>
