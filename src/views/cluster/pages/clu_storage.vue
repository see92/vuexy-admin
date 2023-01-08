<template>
  <div class="storage">
    <b-row>
      <b-col cols="7">
        <validation-provider>
          <b-form-group label="IP地址：" label-for="ip" label-cols-md="auto">
            <b-form-input style="width: 550px" />
          </b-form-group>
        </validation-provider>
      </b-col>
      <b-col cols="7">
        <validation-provider>
          <b-form-group
            label="用户名："
            label-for="userName"
            label-cols-md="auto"
          >
            <b-form-input style="width: 550px" />
          </b-form-group>
        </validation-provider>
      </b-col>
      <b-col cols="7">
        <validation-provider>
          <b-form-group
            label="密码："
            label-for="password"
            label-cols-md="auto"
          >
            <b-form-input style="width: 550px" />
          </b-form-group>
        </validation-provider>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
export default {
  name: "storage",
  components: {
    ValidationProvider,
  },
};
</script>

<style>
</style>