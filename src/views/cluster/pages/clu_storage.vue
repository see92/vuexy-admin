<template>
  <div class="storage">
    <b-row>
      <b-col cols="7">
        <bInput
          rules="required|ip"
          name="ip"
          label="IP地址："
          placeText="192.168.1.1"
          :value.sync="sto.server_ip"
        />
      </b-col>
      <b-col cols="7">
        <bInput
          rules="required"
          name="name"
          label="用户名："
          placeText="用户名"
          :value.sync="sto.server_username"
        />
      </b-col>
      <b-col cols="7">
        <validation-provider
          rules="required|password"
          name="password"
          #default="{ errors }"
        >
          <b-form-group
            label="密码："
            label-for="password"
            label-cols-md="auto"
          >
            <b-form-input
              style="width: 550px"
              v-model="sto.server_password"
              :state="errors.length > 0 ? false : null"
              :type="pwdEye"
              placeholder="请设置一个6-20位密码"
            />
            <b-input-group-append is-text>
              <feather-icon
                :icon="passwordToggleIcon"
                class="cursor-pointer"
                @click="togglePasswordVisibility"
              />
            </b-input-group-append>
            <small class="text-danger"> {{ errors[0] }} </small>
          </b-form-group>
        </validation-provider>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { bInput } from "../components/component";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
export default {
  name: "storage",
  components: {
    ValidationProvider,
    bInput,
    togglePasswordVisibility,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      sto: {
        server_ip: "",
        server_username: "",
        server_password: "",
        server_type: 6,
        server_state: 0,
      },
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.pwdEye === "password" ? "EyeIcon" : "EyeOffIcon";
    },
  },
};
</script>

<style>
</style>