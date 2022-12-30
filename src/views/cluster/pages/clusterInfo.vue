<template>
  <b-card class="card-pd">
    <validation-observer ref="cluForm" #default="{ invalid }">
      <b-form autocomplete="off" @submit.prevent="handle_pre">
        <b-tabs>
          <b-tab title="常规设置">
            <setting ref="set" />
          </b-tab>
          <b-tab title="服务引擎">
            <engine ref="engine" />
          </b-tab>
          <b-tab title="存储">
            <storage />
          </b-tab>
          <b-tab title="DB"></b-tab>
          <b-tab title="Redis"></b-tab>
          <b-tab title="ES"></b-tab>
        </b-tabs>
        <hr />
        <div class="btn">
          <b-button
            :disabled="invalid"
            type="submit"
            class="mr-1"
            variant="primary"
            >保存</b-button
          >
          <b-button variant="outline-primary">取消</b-button>
        </div>
      </b-form>
    </validation-observer>
  </b-card>
</template>

<script>
import { BCard, BForm, BTab, BTabs, BButton } from "bootstrap-vue";
import { ValidationObserver } from "vee-validate";
import { setting, engine, storage } from "../pages";
export default {
  name: "clusterInfo",
  components: {
    BCard,
    BForm,
    BTab,
    BTabs,
    ValidationObserver,
    setting,
    BButton,
    engine,
    storage,
  },
  data() {
    return {};
  },
  methods: {
    handle_pre() {
      let set = JSON.parse(JSON.stringify(this.$refs.set.set));
      let engine = JSON.parse(JSON.stringify(this.$refs.engine.engine));
      console.log(engine, "<<<set");
    },
  },
};
</script>

<style>
</style>