<template>
  <div class="product">
    <b-row>
      <b-col cols="7">
        <b-form-group
          label="授权终端个数："
          label-for="client_num"
          label-cols-md="auto"
        >
          <el-input-number
            class="orgInput"
            controls-position="right"
            :min="0"
            :max="999"
            v-model="pro.client_num"
          ></el-input-number>
        </b-form-group>
      </b-col>
      <b-col cols="7">
        <ValidationProvider
          rules="required"
          name="module"
          #default="{ errors }"
        >
          <b-form-group
            label="产品模块："
            label-for="module"
            label-cols-md="auto"
            :state="errors.length > 0 ? false : null"
          >
            <v-select
              class="orgInput module"
              :options="moduleOptions"
              :reduce="(label) => label.key"
              :close-on-select="false"
              :searchable="false"
              :clearable="false"
              multiple
              v-model="pro.module"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </b-form-group>
        </ValidationProvider>
      </b-col>
      <b-col cols="7">
        <b-form-group
          label="产品状态："
          label-for="status"
          label-cols-md="auto"
        >
          <v-select
            class="orgInput"
            :options="statusOptions"
            :reduce="(label) => label.key"
            :searchable="false"
            :clearable="false"
            v-model="pro.status"
          />
        </b-form-group>
      </b-col>
      <b-col cols="7">
        <b-form-group
          label="到期时间："
          label-for="overdue_time"
          label-cols-md="auto"
        >
          <el-date-picker
            class="orgInput cluster"
            type="date"
            v-model="pro.overdue_time"
            value-format="timestamp"
          ></el-date-picker>
        </b-form-group>
      </b-col>
      <b-col cols="7">
        <ValidationProvider
          rules="required"
          name="cluName"
          #default="{ errors }"
        >
          <b-form-group
            label="选择集群："
            label-for="cluster"
            label-cols-md="auto"
            :state="errors.length > 0 ? false : null"
          >
            <el-cascader
              class="orgInput"
              :options="cluItem"
              v-model="pro.cluster_id"
            />
            <small class="d-flex text-danger">{{ errors[0] }}</small>
          </b-form-group>
        </ValidationProvider>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { moduleOptions, statusOptions, cityOptions } from "../js/options";
import { getClusterInfo } from "../js/api";
export default {
  name: "product",
  components: {
    ValidationProvider,
  },
  data() {
    return {
      flag: this.$route.query.flag,
      moduleOptions, //模块选择框
      statusOptions, //状态选择框
      cluItem: [], //选择集群
      cityOptions, //集群区域
      pro: {
        client_num: 0,
        module: [0],
        status: 0,
        overdue_time: 0,
        cluster_id: "",
      },
    };
  },
  mounted() {
    if (this.flag == 0) {
      this.defaultOverTime();
    }
    this.getCluInfo();
  },
  methods: {
    defaultOverTime() {
      let date = new Date();
      this.pro.overdue_time = date.getTime();
    },
    async getCluInfo() {
      const { data } = await getClusterInfo({
        area: 0,
        admin_id: "0",
      });
      this.cluItem = JSON.parse(JSON.stringify(cityOptions));
      data.forEach((k) => {
        k.value = k.cluster_id;
        k.label = k.cluster_name;
        k.state = k.cluster_state;
        k.disabled = k.disabled;
        let i = this.cluItem.findIndex((val) => val.key === k.cluster_area);
        if (this.cluItem[i].children && this.cluItem[i].children.length > 0) {
          this.cluItem[i].children.push(k);
        } else {
          this.cluItem[i].children = [{ ...k }];
        }
      });
      this.cluItem.forEach((k) => {
        if (!k.children) {
          k.disabled = true;
        } else if (
          k.children.forEach((l) => {
            if (l.state == 0) {
              l.disabled = true;
            }
          })
        )
          k.value = k.value.toString();
      });
    },
  },
};
</script>

<style lang="scss">
.product {
  .orgInput {
    width: 550px;
  }
  .col-form-label {
    width: 120px;
  }
  .module {
    .vs__selected-options span {
      background-color: #b1acac;
    }
  }
}
.el-scrollbar {
  width: 200px !important;
}
</style>