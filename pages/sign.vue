<template>
  <login-sign>
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
      class="mb-4"
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
    <v-text-field
      class="mb-8"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      @click:append="showPassword = !showPassword"
      counter
      prepend-icon="mdi-lock"
      v-model="form.againPassword"
      :rules="formRules.againPassword"
      label="确认密码"
      :success="!!form.againPassword"
    ></v-text-field>
    <v-btn text depressed large rounded class="success--text" @click="onLogin"
      >注册</v-btn
    >
  </login-sign>
</template>
<script>
import LoginSign from '~/components/LoginSign';
export default {
  components: {
    'login-sign': LoginSign
  },
  head() {
    return {
      title: `欢迎注册`
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
        ],
        againPassword: [
          (value) => value === this.form.password || `两次密码输入不一致`
        ]
      }
    };
  },
  methods: {
    onLogin() {
      console.log(this.form);
    }
  },
  mounted() {
    // console.log(this.$axios);
  }
};
</script>
