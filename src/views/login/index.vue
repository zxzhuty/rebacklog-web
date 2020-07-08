<template>
  <div>
    <el-form
      :rules="rules"
      ref="loginForm"
      v-loading="loading"
      element-loading-text="正在登录..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :model="loginForm"
      class="loginContainer"
    >
      <el-tabs type="border-card">
        <el-tab-pane label="用户名登录">
          <el-form-item prop="username">
            <i class="el-icon-user loginicon"></i>
            <el-input
              size="normal"
              type="text"
              v-model="loginForm.username"
              auto-complete="off"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <i class="el-icon-key loginicon"></i>
            <el-input
              size="normal"
              type="password"
              v-model="loginForm.password"
              auto-complete="off"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-button
            size="normal"
            type="primary"
            style="width: 100%;"
            @click="login"
            >登录</el-button
          >
        </el-tab-pane>
        <el-tab-pane label="扫码登录"></el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      loginForm: {
        username: "testManage",
        password: "123456"
      },
      checked: true,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["changeLogin"]),
    login() {
      this.loginForm.client_id = "user_clientid";
      this.loginForm.client_secret = "user_secret";
      this.loginForm.grant_type = "password";

      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.postKeyValueRequest("/dologin", this.loginForm).then(resp => {
            this.loading = false;
            //   if (resp) {
            // console.log(JSON.stringify(resp.access_token));
            //   } else {
            //     return false;
            //   }
            this.userToken = "Bearer " + resp.access_token;
            // 将用户token保存到vuex中
            this.changeLogin({ Authorization: this.userToken });
            this.$router.push("/home");
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 400px;
  padding: 15px 35px 15px 35px;
}

.loginTitle {
  margin: 15px auto 20px auto;
  text-align: center;
  color: #505458;
}

.el-form-item__content {
  display: flex;
  align-items: center;
}
.loginicon {
  margin-right: 10px;
  font-size: 18px;
}
</style>
