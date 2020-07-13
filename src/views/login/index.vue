<template>
  <common-layout>
    <div class="top">
      <div class="header">
        <!-- <img alt="logo" class="logo" src="@/assets/img/logo.png" /> 预留logo-->
        <span class="title">{{ systemName }}</span>
      </div>
      <!-- <div class="desc">预留文本</div> -->
    </div>
    <div class="login">
      <a-form @submit="onSubmit" :autoFormCreate="form => (this.form = form)">
        <a-tabs
          size="large"
          :tabBarStyle="{ textAlign: 'center' }"
          style="padding: 0 2px;"
        >
          <a-tab-pane tab="账户密码登录" key="1">
            <a-alert
              type="error"
              :closable="true"
              v-show="error"
              :message="error"
              showIcon
              style="margin-bottom: 24px;"
            />
            <a-form-item
              fieldDecoratorId="name"
              :fieldDecoratorOptions="{
                rules: [
                  { required: true, message: '请输入账户名', whitespace: true }
                ]
              }"
            >
              <a-input size="large" placeholder="admin">
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
            <a-form-item
              fieldDecoratorId="password"
              :fieldDecoratorOptions="{
                rules: [
                  { required: true, message: '请输入密码', whitespace: true }
                ]
              }"
            >
              <a-input size="large" placeholder="888888" type="password">
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-item>
            <div>
              <a-checkbox :checked="true">自动登录</a-checkbox>
              <a style="float: right">忘记密码</a>
            </div>
            <a-form-item>
              <a-button
                :loading="logging"
                style="width: 100%;margin-top: 24px"
                size="large"
                htmlType="submit"
                type="primary"
                >登录</a-button
              >
            </a-form-item>
          </a-tab-pane>
          <!-- <a-tab-pane tab="手机号登录" key="2">
            <a-form-item>
              <a-input size="large" placeholder="mobile number">
                <a-icon slot="prefix" type="mobile" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-row :gutter="8" style="margin: 0 -4px">
                <a-col :span="16">
                  <a-input size="large" placeholder="captcha">
                    <a-icon slot="prefix" type="mail" />
                  </a-input>
                </a-col>
                <a-col :span="8" style="padding-left: 4px">
                  <a-button
                    style="width: 100%"
                    class="captcha-button"
                    size="large"
                    >获取验证码</a-button
                  >
                </a-col>
              </a-row>
            </a-form-item>
          </a-tab-pane> -->

          <!-- <div>
          其他登录方式 预留
          <a-icon class="icon" type="alipay-circle" />
          <a-icon class="icon" type="taobao-circle" />
          <a-icon class="icon" type="weibo-circle" />
          <router-link style="float: right" to="/">注册账户</router-link>
        </div> -->
          <a-tab-pane tab="扫码登录" key="3"> </a-tab-pane>
        </a-tabs>
      </a-form>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from "@/layouts/CommonLayout";
import { mapMutations } from "vuex";

export default {
  name: "Login",
  components: { CommonLayout },
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
  computed: {
    systemName() {
      return this.$store.state.setting.systemName;
    }
  },
  methods: {
    ...mapMutations(["changeLogin"]),
    login() {
      // this.loginForm.client_id = "user_clientid";
      // this.loginForm.client_secret = "user_secret";
      // this.loginForm.grant_type = "password";

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

<style lang="less" scoped>
.common-layout {
  .top {
    text-align: center;
    .header {
      height: 44px;
      line-height: 44px;
      a {
        text-decoration: none;
      }
      .logo {
        height: 44px;
        vertical-align: top;
        margin-right: 16px;
      }
      .title {
        font-size: 33px;
        color: @title-color;
        font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica,
          sans-serif;
        font-weight: 600;
        position: relative;
        top: 2px;
      }
    }
    .desc {
      font-size: 14px;
      color: @text-color-second;
      margin-top: 12px;
      margin-bottom: 40px;
    }
  }
  .login {
    width: 368px;
    margin: 0 auto;
    @media screen and (max-width: 576px) {
      width: 95%;
    }
    @media screen and (max-width: 320px) {
      .captcha-button {
        font-size: 14px;
      }
    }
    .icon {
      font-size: 24px;
      color: @text-color-second;
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: @primary-color;
      }
    }
  }
}
</style>
