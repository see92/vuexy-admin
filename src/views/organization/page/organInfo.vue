<template>
  <b-card no-body style="padding: 20px">
    <ValidationObserver ref="orgItem">
      <b-form @submit.prevent="handle_pre">
        <b-tabs class="tabs">
          <b-tab title="组织信息"><organization ref="organization" /></b-tab>
          <b-tab title="产品信息"> </b-tab>
          <b-tab title="管理员"> </b-tab>
          <b-tab title="联系人"> </b-tab>
        </b-tabs>
        <!-- <div></div> -->
        <hr />
        <b-button variant="primary" class="mr-1" type="submit">提交</b-button>
        <b-button variant="outline-primary">取消</b-button>
      </b-form>
    </ValidationObserver>
  </b-card>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { organization } from "./index";
export default {
  name: "organInfo",
  components: {
    ValidationObserver,
    organization,
  },
  data() {
    return {};
  },
  methods: {
    handle_pre() {
      this.$refs.orgItem.validate().then((success) => {
        if (success) this.changeAdd();
      });
    },
    changeAdd() {
      let newOrgItem = JSON.parse(
        JSON.stringify({ ...this.$refs.organization.org })
      );
      console.log(newOrgItem);
    },
  },
};
</script>