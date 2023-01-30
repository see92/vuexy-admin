<template>
  <div class="organization">
    <b-row>
      <b-col cols="7">
        <ValidationProvider
          rules="required"
          name="orgName"
          #default="{ errors }"
        >
          <b-form-group
            label="组织名称："
            label-for="orgName"
            label-cols-md="auto"
          >
            <b-form-input
              class="orgInput"
              :state="errors.length > 0 ? false : null"
              v-model="org.org_name"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </b-form-group>
        </ValidationProvider>
      </b-col>
      <b-col cols="7">
        <b-form-group label="组织别名：" label-for="alias" label-cols-md="auto">
          <b-form-input class="orgInput" v-model="org.org_alias" />
        </b-form-group>
      </b-col>
      <b-col cols="7">
        <b-form-group label="组织规模：" label-for="size" label-cols-md="auto">
          <v-select
            :options="sizeOptions"
            :reduce="(label) => label.key"
            :searchable="false"
            :clearable="false"
            v-model="org.org_size"
            class="orgInput"
          />
        </b-form-group>
      </b-col>
      <b-col cols="7">
        <b-form-group
          label="行业分类："
          label-for="specific_industries"
          label-cols-md="auto"
        >
          <el-cascader
            class="orgInput"
            :options="dataList"
            v-model="org.specific_industries"
          />
        </b-form-group>
      </b-col>
      <b-col cols="7">
        <b-form-group
          label="联系地址："
          label-for="address"
          label-cols-md="auto"
        ></b-form-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { required } from "@validations";
import { sizeOptions } from "../js/options";
import { getDicTree } from "../js/api";
export default {
  name: "organization",
  components: {
    ValidationProvider,
  },
  data() {
    return {
      required,
      sizeOptions, //组织规模
      dataList: [], //组织规模选项
      org: {
        org_name: "",
        org_alias: "",
        org_size: 0,
        specific_industries: [],
      },
    };
  },
  mounted() {
    this.getDicInfo();
  },
  methods: {
    // 后去组织行业信息
    async getDicInfo() {
      const { data } = await getDicTree();
      this.dataList = data.map((k) => {
        console.log(k);
        k.label = k.name;
        k.value = k.id;
        if (k.children) {
          k.children.forEach((j) => {
            j.label = j.name;
            j.value = j.id;
            if (j.children) {
              j.children = null;
            }
          });
        }
        return k;
      });
    },
  },
};
</script>

<style lang="scss">
.organization {
  .orgInput {
    width: 550px;
  }
}
</style>