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

          <!-- form -->
          <validation-observer ref="loginValidation">
            <b-form class="auth-login-form mt-2" @submit.prevent>
              <!-- email -->
              <b-form-group label="手机号" label-for="login-phone">
                <validation-provider
                  #default="{ errors }"
                  name="phone"
                  rules="required|phone"
                >
                  <b-form-input
                    id="login-phone"
                    v-model="userPhone"
                    :state="errors.length > 0 ? false : null"
                    name="login-phone"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- 验证码 -->
              <b-form-group label="验证码" label-for="login-code">
                <validation-provider
                  #default="{ errors }"
                  name="code"
                  rules="required|code"
                >
                  <div class="d-flex justify-content-between">
                    <b-form-input
                      style="width: 370px"
                      id="login-code"
                      v-model="userCode"
                      :state="errors.length > 0 ? false : null"
                      name="login-code"
                    />
                    <b-button
                      style="width: 86px"
                      class="ml-1"
                      variant="success"
                      @click.stop="getPhoneCode"
                      :disabled="codeDisabled"
                      >{{ codeMsg }}</b-button
                    >
                  </div>
                  <small class="text-danger">{{ errors[0] }} </small>
                </validation-provider>
              </b-form-group>
              <!-- forgot password -->
              <!-- <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">Password</label>
                  <b-link :to="{ name: 'auth-forgot-password-v2' }">
                    <small>Forgot Password?</small>
                  </b-link>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false : null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group> -->

              <!-- checkbox -->
              <!-- <b-form-group>
                <b-form-checkbox
                  id="remember-me"
                  v-model="status"
                  name="checkbox-1"
                >
                  Remember Me
                </b-form-checkbox>
              </b-form-group> -->

              <!-- submit buttons -->
              <b-button
                type="submit"
                variant="primary"
                block
                @click="validationForm"
              >
                登录
              </b-button>
            </b-form>
          </validation-observer>

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
import {
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BFormCheckbox,
  BCardText,
  BCardTitle,
  BImg,
  BForm,
  BButton,
} from "bootstrap-vue";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: "",
      password: "",
      userPhone: "",
      userCode: "",
      codeMsg: "验证码",
      codeTime: 60,
      codeDisabled: false,
      timer: null,
      sideImg: require("@/assets/images/pages/login-v2.svg"),
      // validation rulesimport store from '@/store/index'
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
      console.log(this.userPhone, "phone");
      const data = await getCode({
        phone: this.userPhone,
      }).then((res) => {
        if (res.status == 200) {
          this.$bvToast.toast("验证码已发送", {
            title: "成功信息",
            variant: "success",
          });
          this.codeDisabled = true;
          this.timer = setInterval(() => {
            if (this.codeTime > 0 && this.codeTime <= 60) {
              this.codeTime--;
              if (this.codeTime != 0) {
                this.codeMsg = `${this.codeTime}S`;
              }
            } else {
              clearInterval(this.timer);
              this.codeMsg = "验证码";
              this.timer = null;
              this.codeTime = 60;
              this.codeDisabled = false;
            }
          }, 1000);
        }
      });
    },
    validationForm() {
      this.$refs.loginValidation.validate().then(async (res) => {
        if (!res) {
          this.$bvToast.toast(`${this.errors.all()[0]}`, {
            title: "错误信息",
            variant: "danger",
          });
          return;
        } else {
          const { data, status } = await getToken({
            phone: this.userPhone,
            code: this.userCode,
          });
          if (data && data.token) {
            window.localStorage.setItem("token", data.token);
            const res = await getInfo();
            window.localStorage.setItem(res.data);
            console.log(res.data, "<<<<res.data");
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
