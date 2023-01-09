<template>
  <div>
    <b-row>
      <b-col cols="7">
        <validation-provider rules="required|ip" name="">
          <b-form-group label="IP地址：" label-for="ip" label-cols-md="auto">
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
  name: "db",
  components: {
    ValidationProvider,
  },
};
</script><datagrid></datagrid>
<style>
</style>