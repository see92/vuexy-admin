<template>
  <div class="engine">
    <b-row>
      <b-col cols="7" v-for="(item, index) in list" :key="index">
        <b-form-group
          :label="!item.show ? `${item.label}` : ''"
          :label-for="item.labelFor"
          label-cols-md="auto"
        >
          <div class="d-flex">
            <Input :value.sync="item.server_ip" />
            <!-- <v-select /> -->
            <Select
              :options="stateOptions"
              :value.sync="item.server_state"
              class="mr-1"
            />
            <b-button
              style="height: 38px; width: 72px"
              variant="outline-primary"
              class="mr-1"
              @click="handle_add(item, index)"
              >添加</b-button
            >
            <b-button
              style="height: 38px; width: 72px"
              variant="outline-danger"
              @click="handle_remove(index)"
              v-if="item.show"
              >删除</b-button
            >
          </div>
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Input from "../components/input.vue";
import Select from "../components/select.vue";
import { stateOptions } from "../js/options";
export default {
  name: "engine",
  components: { Input, Select },
  data() {
    return {
      stateOptions,
      list: [
        {
          label: "控制台服务器：",
          labelFor: "engine",
          server_type: 1,
          server_ip: "",
          server_state: 1,
          server_userName: "",
          server_password: "",
          show: false,
        },
        {
          label: "zenServer：",
          labelFor: "zenServer",
          server_type: 2,
          server_ip: "",
          server_state: 1,
          server_userName: "",
          server_password: "",
          show: false,
        },
        {
          label: "hyperServer：",
          labelFor: "zenServer",
          server_type: 3,
          server_ip: "",
          server_state: 1,
          server_userName: "",
          server_password: "",
          show: false,
        },
        {
          label: "记录服务器：",
          labelFor: "zenServer",
          server_type: 4,
          server_ip: "",
          server_state: 1,
          server_userName: "",
          server_password: "",
          show: false,
        },
        {
          label: "心跳服务器：",
          labelFor: "zenServer",
          server_type: 5,
          server_ip: "",
          server_state: 1,
          server_userName: "",
          server_password: "",
          show: false,
        },
      ],
    };
  },
  methods: {
    handle_add(item, index) {
      console.log(item, index);
      const newList = JSON.parse(JSON.stringify(item));
      newList.server_ip = "";
      newList.server_state = 1;
      newList.show = true;
      this.list.splice(index + 1, 0, newList);
    },
    handle_remove(index) {
      this.list.splice(index, 1);
      console.log(index, "<<<<<index");
    },
  },
};
</script>

<style lang="scss">
.col-form-label {
  width: 120px;
}
</style>