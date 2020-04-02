<template>
  <login-sign login>
    <v-card-text class="text-center">
      <v-form v-model="valid">
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
          clearable
          prepend-icon="mdi-lock"
          v-model="form.password"
          :rules="formRules.password"
          label="密码"
          :success="!!form.password"
        ></v-text-field>
        <div>
          <v-btn text depressed large rounded @click="onGotoSign">注册</v-btn>
          <v-btn
            text
            depressed
            large
            rounded
            class="success--text"
            @click="onLogin"
            >登录</v-btn
          >
        </div>
      </v-form>
    </v-card-text>
  </login-sign>
</template>
<script>
import { setCookie } from '@/utils/cookie';

import LoginSign from '~/components/LoginSign';
export default {
  components: {
    'login-sign': LoginSign
  },
  head() {
    return {
      title: `欢迎登录`
    };
  },
  data() {
    return {
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
    onGotoSign() {
      this.$router.replace(`/sign`);
    },
    async onLogin() {
      if (this.valid) {
        var { token } = await this.$ajax.post(`/user/login`, this.form);

        document.cookie = setCookie(`token`, token);

        this.$store.dispatch(`QUERY_USER_INFO`);
        this.$router.push(`/`);
      }
    }
  }
};
</script>
