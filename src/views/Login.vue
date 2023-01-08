<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Brand logo-->
      <b-link class="brand-logo">
        <vuexy-logo />
        <h2 class="brand-text text-primary ml-1">Vuexy</h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
        <div
          class="w-100 d-lg-flex align-items-center justify-content-center px-5"
        >
          <b-img fluid :src="imgUrl" alt="Login V2" />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title title-tag="h2" class="font-weight-bold mb-1">
            Welcome to Vuexy! 👋
          </b-card-title>
          <b-card-text class="mb-2">
            Please sign-in to your account and start the adventure
          </b-card-text>

          <!-- login -->
          <validation-observer ref="loginForm" #default="{ invalid }">
            <b-form class="auth-login-form mt-2" @submit.prevent="login">
              <!-- phone -->
              <b-form-group label="手机号" label-for="phone">
                <validation-provider
                  name="phone"
                  rules="required|phone"
                  #default="{ errors }"
                >
                  <b-form-input
                    v-model="userPhone"
                    name="phone"
                    placeholder="手机号"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <!-- code -->
              <b-form-group label="验证码" label-for="code">
                <div class="d-flex justify-content-between">
                  <div style="width: 70%; border: 1px solid pink" class="mr-1">
                    <validation-provider
                      name="code"
                      rules="required|code"
                      #default="{ errors }"
                    >
                      <b-form-input
                        :State="errors.length > 0 ? false : null"
                        v-model="userCode"
                        placeholder="验证码"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </div>
                  <div style="width: 30%; border: 1px solid yellow">
                    <b-button
                      :disabled="codeDisabled"
                      @click="getPhoneCode"
                      variant="primary"
                      style="width: 100%"
                      >{{ codeMsg }}</b-button
                    >
                  </div>
                </div>
              </b-form-group>

              <b-button
                type="submit"
                variant="primary"
                block
                :disabled="invalid"
              >
                登录
              </b-button>
            </b-form>
          </validation-observer>
          <!-- form -->

          <b-card-text class="text-center mt-2">
            <span>New on our platform? </span>
            <b-link :to="{ name: 'page-auth-register-v2' }">
              <span>&nbsp;Create an account</span>
            </b-link>
          </b-card-text>

          <!-- divider -->
          <div class="divider my-2">
            <div class="divider-text">or</div>
          </div>

          <!-- social buttons -->
          <div class="auth-footer-btn d-flex justify-content-center">
            <b-button variant="facebook" href="javascript:void(0)">
              <feather-icon icon="FacebookIcon" />
            </b-button>
            <b-button variant="twitter" href="javascript:void(0)">
              <feather-icon icon="TwitterIcon" />
            </b-button>
            <b-button variant="google" href="javascript:void(0)">
              <feather-icon icon="MailIcon" />
            </b-button>
            <b-button variant="github" href="javascript:void(0)">
              <feather-icon icon="GithubIcon" />
            </b-button>
          </div>
        </b-col>
      </b-col>
      <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import { getToken, getCode, getInfo } from "@/api/user";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import bus from "@/assets/bus.js";
import { setToken } from "@/assets/js/token";

export default {
  components: {
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      // status: "",
      // password: "",
      userPhone: "",
      userCode: "",
      codeMsg: "获取验证码",
      codeTime: 60,
      codeDisabled: false,
      timer: null,
      sideImg: require("@/assets/images/pages/login-v2.svg"),
      required,
      email,
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/login-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
    },
  },

  methods: {
    async getPhoneCode() {
      const phoneReg = /^1[3456789]\d{9}$/;
      if (phoneReg.test(this.userPhone)) {
        await getCode({
          phone: this.userPhone,
        }).then((res) => {
          if (res.status === 200) {
            this.$bvToast.toast("验证码已发送", {
              title: "成功信息",
              variant: "success",
            });
            this.codeDisabled = true;
            this.timer = setInterval(() => {
              if (this.codeTime > 0 && this.codeTime <= 60) {
                this.codeTime--;
                if (this.codeTime !== 0) {
                  this.codeMsg = `${this.codeTime}S`;
                }
              } else {
                clearInterval(this.timer);
                this.codeMsg = "获取验证码";
                this.timer = null;
                this.codeTime = 60;
                this.codeDisabled = false;
              }
            }, 1000);
          }
        });
      }
    },
    login() {
      this.$refs.loginForm.validate().then(async (result) => {
        if (!result) {
          this.$bvToast.toast(`${this.errors.all()[0]}`, {
            title: "错误信息",
            variant: "danger",
          });
          return;
        } else {
          const { data } = await getToken({
            phone: this.userPhone,
            code: this.userCode,
          });
          if (data && data.token) {
            window.localStorage.setItem("token", data.token);
            const res = await getInfo();
            setToken(res.data);
            if (res.data) {
              this.$router.push({
                path: "/",
              });
            }
          }
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
