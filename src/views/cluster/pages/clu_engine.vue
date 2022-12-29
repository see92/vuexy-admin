<template>
  <div class="engine">
    <b-row>
      <b-col cols="7" v-for="(item, index) in list" :key="index">
        <b-form-group
          :label="`${item.label}`"
          :label-for="item.labelFor"
          label-cols-md="auto"
        >
          <div class="d-flex">
            <Input class="mr-1" :value.sync="engine.ip" />
            <v-select />
          </div>
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Input from "../components/input.vue";
export default {
  name: "engine",
  components: { Input },
  data() {
    return {
      list: [
        {
          label: "控制台服务器",
          labelFor: "engine",
          server_type: 1,
          server_ip: "",
          server_state: 1,
          server_userName: "",
          server_password: "",
          show: false,
        },
      ],
      engine: {
        ip: "",
      },
    };
  },
};
</script>

<style>
</style>