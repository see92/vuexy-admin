<template>
  <div class="setting">
    <b-row>
      <b-col cols="7">
        <validation-provider
          rules="required"
          name="cluName"
          #default="{ errors }"
        >
          <b-form-group
            label="集群名称："
            label-for="name"
            label-cols-md="auto"
          >
            <b-form-input
              :state="errors.length > 0 ? false : null"
              style="width: 550px"
              v-model="set.cluster_name"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </b-form-group>
        </validation-provider>
      </b-col>
      <b-col cols="7">
        <b-form-group label="集群区域：" label-for="area" label-cols-md="auto">
          <div style="width: 550px">
            <v-select
              :options="cityOptions"
              :searchable="false"
              :clearable="false"
              :reduce="(title) => title.key"
              label="title"
              v-model="set.cluster_area"
            />
          </div>
        </b-form-group>
      </b-col>
      <b-col cols="7">
        <b-form-group label="状态：" label-for="status" label-cols-md="auto">
          <div style="width: 550px">
            <v-select
              :options="stateOptions"
              :searchable="false"
              :clearable="false"
              :reduce="(title) => title.key"
              label="title"
              v-model="set.cluster_state"
            />
          </div>
        </b-form-group>
      </b-col>
      <b-col cols="7">
        <b-form-group label="描述：" label-for="des" label-cols-md="auto">
          <b-form-input
            style="width: 550px"
            type="text"
            v-model="set.cluster_describe"
          />
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BRow, BCol, BFormGroup, BFormInput } from "bootstrap-vue";
import { ValidationProvider } from "vee-validate";
import { cluName } from "@validations";
import { cityOptions, stateOptions } from "../js/options";
import vSelect from "vue-select";
export default {
  name: "setting",
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    ValidationProvider,
    vSelect,
  },
  data() {
    return {
      flag: this.$route.query.flag,
      cluName,
      cityOptions, //城市选项
      stateOptions, //状态选项
      set: {
        cluster_name: "",
        cluster_area: 1,
        cluster_state: 0,
        cluster_describe: "",
      },
    };
  },
  mounted() {
    if (this.flag == 1) {
      this.getCluMsg();
    }
  },
  methods: {
    getCluMsg() {
      console.log(this.$emit("getClusterMsg"),'sssssss');
    },
    // submit() {
    //   var a = this.$emit("fMethod",a);
    //   console.log(a, "aaaaa");
    // },
  },
};
</script>

<style lang="scss" >
.setting {
  .col-form-label {
    width: 100px;
  }
}
</style>