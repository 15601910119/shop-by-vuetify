<template>
  <v-container>
    <v-row>
      <v-col class="col-12 col-md-6">
        <h2 class="font-weight-bold mb-6 display-2">我的信息</h2>
        <div class="mb-12">
          <v-card class="py-8 d-flex justify-center">姓名： 李国印</v-card>
        </div>
        <div class="mb-12">
          <v-card class="py-8 d-flex justify-center">邮箱：1250943062@qq.com</v-card>
        </div>
      </v-col>

      <v-col class="col-12 col-md-6">
        <h2 class="font-weight-bold mb-6 display-2">你的建议</h2>
        <v-form>
          <v-col class="col-12">
            <v-text-field
              class="mx-2 mb-5"
              hide-details="auto"
              label="姓名"
            ></v-text-field>
          </v-col>

          <v-col class="col-12">
            <v-textarea
              class="mx-2"
              label="消息"
              rows="4"
            ></v-textarea>
          </v-col>
        </v-form>

        <v-col class="col-12">
          <v-btn
            block
            color="warning"
            x-large
          >发送消息</v-btn>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters'
      ]
    };
  }
};
</script>