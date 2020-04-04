<template>
  <login-sign>
    <v-card-text class="text-center">
      <v-form v-model="valid" class="mt-5">
        <v-text-field
          prepend-icon="mdi-face"
          v-model="form.username"
          :rules="formRules.username"
          label="用户名"
          clearable
          :loading="validating"
          :success="!!form.username"
          @input="userErrorMsg = ``"
          @blur="onUsernameBlur"
          :error-messages="userErrorMsg"
          ref="user"
        ></v-text-field>
        <v-text-field
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
        <v-text-field
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          counter
          clearable
          prepend-icon="mdi-lock"
          v-model="form.againPassword"
          :rules="formRules.againPassword"
          label="确认密码"
          :success="!!form.againPassword"
        ></v-text-field>
        <div>
          <v-btn text depressed large rounded @click="onGotoLogin">登录</v-btn>
          <v-btn
            text
            depressed
            large
            rounded
            class="success--text"
            @click="onSign"
            >注册</v-btn
          >
        </div>
      </v-form>
    </v-card-text>
    <v-dialog v-model="dialog" max-width="80%" width="400">
      <v-card>
        <v-card-title class="headline">注册成功</v-card-title>

        <v-card-text>
          注册成功，是否前去登录？
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="darken-1" text @click="dialog = false">
            取消
          </v-btn>

          <v-btn color="primary" text @click="onGotoLogin">
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      userErrorMsg: ``,
      validating: false,
      dialog: false,
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
    async onUsernameBlur(event) {
      if (this.$refs.user.hasError) {
        return;
      }

      var value = event.target.value;

      try {
        this.validating = true;
        await this.$ajax.get(`/user/check`, { username: value }, true);
      } catch (error) {
        this.userErrorMsg = error.error;
      } finally {
        this.validating = false;
      }
    },
    onGotoLogin() {
      this.dialog = false;
      this.$router.replace(`/login`);
    },
    async onSign() {
      if (this.valid) {
        var { token } = await this.$ajax.post(`/user/sign-up`, {
          username: this.form.username,
          password: this.form.password
        });

        this.dialog = true;
      }
    }
  }
};
</script>
