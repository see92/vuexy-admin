<template>
  <div class="db">
    <b-row>
      <b-col cols="7">
        <bInput
          rules="required|ip"
          name="ip"
          label="IP地址："
          placeText="192.168.1.1"
          :value.sync="redis.server_ip"
        />
      </b-col>
      <b-col cols="7">
        <b-form-group label="用户名：" label-for="name" label-cols-md="auto">
          <b-form-input
            v-model="redis.server_username"
            style="width: 550px"
            placeholder="用户名"
          />
        </b-form-group>
      </b-col>
      <b-col cols="7">
        <b-form-group label="密码：" label-for="pwd" label-cols-md="auto">
          <b-input-group style="width: 550px">
            <b-form-input
              v-model="redis.server_password"
              :type="passwordFieldType"
              autocomplete="new-password"
              placeholder="请设置一个6-20位密码"
            />
            <b-input-group-append is-text>
              <feather-icon
                :icon="passwordToggleIcon"
                class="cursor-pointer"
                @click="togglePasswordVisibility"
              />
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>
  
  <script>
import { ValidationProvider } from "vee-validate";
import { bInput } from "../components/component";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
export default {
  name: "redis",
  components: {
    ValidationProvider,
    bInput,
    togglePasswordVisibility,
  },
  mixins: [togglePasswordVisibility],
  props: {
    serverList: {
      value: Array,
    },
  },
  watch: {
    serverList: {
      handler(newValue) {
        let val = JSON.parse(JSON.stringify(newValue));
        val.forEach((element) => {
          if (element.server_type == 9) {
            this.redis = Object.assign({}, element);
          }
        });
      },
    },
  },
  data() {
    return {
      redis: {
        server_ip: "",
        server_username: "",
        server_password: "",
        server_type: 9,
        server_state: 0,
      },
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
  },
};
</script>
  
  <style>
</style>