<template>
  <b-card class="card-pd">
    <validation-observer ref="cluForm" #default="{ invalid }">
      <b-form autocomplete="off">
        <b-tabs>
          <b-tab title="常规设置"></b-tab>
          <b-tab title="服务引擎"></b-tab>
          <b-tab title="存储"></b-tab>
          <b-tab title="DB"></b-tab>
          <b-tab title="Redis"></b-tab>
          <b-tab title="ES"></b-tab>
        </b-tabs>
      </b-form>
    </validation-observer>
  </b-card>
</template>

<script>
import { BCard, BForm, BTab, BTabs } from "bootstrap-vue";
import { ValidationObserver } from "vee-validate";
export default {
  name: "clusterInfo",
  components: {
    BCard,
    BForm,
    BTab,
    BTabs,
    ValidationObserver,
  },
};
</script>

<style>
</style>