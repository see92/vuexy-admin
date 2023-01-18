<template>
  <b-card no-body style="padding: 20px">
    <validation-observer ref="cluForm" #default="{ invalid }">
      <b-form @submit.prevent="handle_pre">
        <b-tabs class="tabs">
          <b-tab title="常规设置">
            <setting ref="clu_setting" :form="clusterMsg" />
          </b-tab>
          <b-tab title="服务引擎">
            <engine ref="engine" :serverList="serverList" />
          </b-tab>
          <b-tab title="存储">
            <storage ref="storage" :serverList="serverList" />
          </b-tab>
          <b-tab title="DB">
            <db ref="db" :serverList="serverList" />
          </b-tab>
          <b-tab title="redis">
            <redis ref="redis" :serverList="serverList" />
          </b-tab>
          <b-tab title="es">
            <es ref="es" :serverList="serverList" />
          </b-tab>
        </b-tabs>
        <hr />
        <b-button
          class="mr-1"
          variant="primary"
          type="submit"
          :disabled="invalid"
          >提交</b-button
        >
        <b-button variant="outline-primary" @click="handle_goBack"
          >取消</b-button
        >
      </b-form>
    </validation-observer>
  </b-card>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { setting, engine, storage, db, redis, es } from "../pages";
import { updateCluster, getClusterInfo, clusterServer } from "../js/api";
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
      clusterMsg: {},
      serverList: [],
      flag: this.$route.query.flag,
      id: this.$route.query.id,
    };
  },
  mounted() {
    if (this.flag == 1) {
      this.getClusterMsg();
      this.getClusterServer();
    }
  },
  methods: {
    async getClusterMsg() {
      const { data } = await getClusterInfo({
        clusterId: this.id,
        admin_id: 7,
      });
      this.clusterMsg = data;
    },
    async getClusterServer() {
      const { data } = await clusterServer({
        clusterId: this.id,
        admin_id: 7,
      });
      this.serverList = data;
    },
    handle_pre() {
      this.$refs.cluForm.validate().then((success) => {
        if (success) this.changeAdd();
      });
    },
    // 添加集群信息
    async changeAdd() {
      // 获取集群常规设置信息
      let cluster = JSON.parse(
        JSON.stringify({ ...this.$refs.clu_setting.set })
      );
      console.log(cluster, "cluster");

      // 获取集群服务器信息
      // return;
      let getRefs = [
        { module: "engine", property: "FormList" },
        { module: "storage", property: "sto" },
        { module: "db", property: "db" },
        { module: "redis", property: "redis" },
        { module: "es", property: "es" },
      ];

      let serverList = [],
        newServer = [],
        newParams = [];
      getRefs.forEach((item) => {
        serverList.push(this.$refs[item.module][item.property]);
      });
      serverList[0].forEach((item) => {
        newServer.push({
          server_ip: item.server_ip,
          server_password: item.server_password,
          server_userName: item.server_userName,
          server_type: item.server_type,
          server_state: item.server_state,
        });
      });
      serverList.shift();
      newParams.push(...newServer, ...serverList);
      const params = {
        admin_id: "7",
        cluster,
        server: newParams,
      };
      console.log(params, "params");
      return;
      const { status } = await updateCluster(params);
      if (status == 200) {
        this.$swal.fire({
          icon: "success",
          text: "提交成功",
          showConfirmButton: false,
          timer: 1500,
        });
        this.$router.back(-1);
      }
    },
    handle_goBack() {
      this.$router.back(-1);
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