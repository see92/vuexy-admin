<template>
  <b-card no-body style="padding: 20px">
    <validation-observer ref="cluForm" #default="{ invalid }">
      <b-form @submit.prevent="handle_pre">
        <b-tabs class="tabs">
          <b-tab title="常规设置">
            <setting ref="setting" />
          </b-tab>
          <b-tab title="服务引擎">
            <engine ref="engine" />
          </b-tab>
          <!-- <b-tab title="存储">
            <storage />
          </b-tab>
          <b-tab title="DB">
            <db />
          </b-tab>
          <b-tab title="Redis">
            <redis />
          </b-tab>
          <b-tab title="ES">
            <es />
          </b-tab> -->
        </b-tabs>
        <hr />
        <div>
          <b-button
            variant="primary"
            class="mr-1"
            type="submit"
            :disabled="invalid"
            >保存</b-button
          >
          <b-button variant="outline-primary">取消</b-button>
        </div>
      </b-form>
    </validation-observer>
  </b-card>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { setting, engine, storage, db, redis, es } from "../pages";
export default {
  name: "clusterInfo",
  components: {
    ValidationObserver,
    setting,
    engine,
    storage,
    db,
    redis,
    es,
  },
  data() {
    return {
      flag: this.$route.query.flag,
    };
  },
  methods: {
    handle_pre() {
      this.$refs.cluForm.validate().then((success) => {
        if (success) this.changeAdd();
      });
    },
    async changeAdd() {
      let cluster = JSON.parse(JSON.stringify({ ...this.$refs.setting.set }));
      let getRefs = [{ module: "engine", property: "FormList" }];
      let serverList = [],
        newServer = [],
        newParams = [];
      getRefs.forEach((e) => {
        serverList.push(this.$refs[e.module][e.property]);
      });
      serverList[0].forEach((e) => {
        newServer.push({
          server_ip: e.server_ip,
          server_password: e.server_password,
          server_userName: e.server_userName,
          server_type: e.server_type,
          server_state: e.server_state,
        });
        console.log(newServer);
      });
      console.log(getRefs, "getRefs");
    },
  },
};
</script>

<style lang="scss">
.tabs {
  .col-form-label {
    width: 120px;
  }
  // .btn {
  //   height: 38px;
  //   width: 75px;
  // }
}
</style>
