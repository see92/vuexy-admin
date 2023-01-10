<template>
  <div class="engine">
    <b-row>
      <b-col cols="7" v-for="(item, index) in FormList" :key="index">
        <b-form-group
          style="width: 950px"
          :label="!item.show ? `${item.label}` : ''"
          :label-for="item.labelName"
          label-cols-md="auto"
        >
          <div class="d-flex">
            <Input :value.sync="item.server_ip" />
            <Select
              :options="stateOptions"
              :value.sync="item.server_state"
              class="mr-1"
            />
            <b-button
              variant="outline-primary"
              class="mr-1 b-btn"
              @click="handle_add(item, index)"
              >添加</b-button
            >
            <b-button
              variant="outline-danger"
              class="b-btn"
              @click="del_data(index)"
              v-if="item.show"
              >刪除</b-button
            >
          </div>
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { Input, Select } from "../components/component";
import { stateOptions } from "../js/options";
export default {
  name: "engine",
  components: {
    Input,
    Select,
  },
  data() {
    return {
      stateOptions,
      FormList: [
        {
          label: "控制台服务器：",
          labelName: "engine",
          server_type: 1,
          server_ip: "",
          server_state: 1,
          server_userName: "",
          server_password: "",
          show: false,
        },
        {
          label: "zenServer：",
          labelName: "zenServer",
          server_type: 2,
          server_ip: "",
          server_state: 1,
          server_userName: "",
          server_password: "",
          show: false,
        },
        {
          label: "hyperServer：",
          labelName: "hyperServer",
          server_type: 3,
          server_ip: "",
          server_state: 1,
          server_userName: "",
          server_password: "",
          show: false,
        },
        {
          label: "记录服务器：",
          labelName: "recordServer",
          server_type: 4,
          server_ip: "",
          server_state: 1,
          server_userName: "",
          server_password: "",
          show: false,
        },
        {
          label: "心跳服务器：",
          labelName: "heartServer",
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
      const cluList = JSON.parse(JSON.stringify(item));
      console.log(cluList, "cluster");
      cluList.address = "";
      cluList.server_ip = "";
      cluList.statusVal = 1;
      cluList.show = true;
      this.FormList.splice(index + 1, 0, cluList);
    },
    del_data(index) {
      this.FormList.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.b-btn {
  width: 75px;
  height: 38px;
}
</style>