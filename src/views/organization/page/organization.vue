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
        >
          <el-cascader
            class="orgInput"
            :options="dataCity"
            v-model="address"
            @change="getAddress"
          ></el-cascader>
        </b-form-group>
      </b-col>
      <b-col cols="7">
        <b-form-group
          label="组织状态："
          label-for="status"
          label-cols-md="auto"
        >
          <v-select
            class="orgInput"
            :options="this.flag == 0 ? osOptions : editOsOptions"
            :reduce="(label) => label.key"
            :searchable="false"
            :clearable="false"
            v-model="org.org_status"
          />
        </b-form-group>
      </b-col>
      <b-col cols="7">
        <b-form-group label="状态：" label-for="status" label-cols-md="auto">
          <v-select
            class="orgInput"
            :options="stateOptions"
            :reduce="(label) => label.key"
            :searchable="false"
            :clearable="false"
            v-model="org.status"
          />
        </b-form-group>
      </b-col>
      <b-col cols="7">
        <b-form-group
          label="社会信用代码："
          label-for="code"
          label-cols-md="auto"
        >
          <b-form-input
            v-model="org.business_num"
            class="orgInput"
            maxlength="18"
          />
        </b-form-group>
      </b-col>
      <b-col cols="7">
        <b-form-group label="营业执照：" label-for="photo" label-cols-md="auto">
          <b-form-file
            accept="image/jpeg, image/png, image/gif"
            class="orgInput"
            v-model="file"
            @change="onFile"
            placeholder="请上传图片"
          ></b-form-file>
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { required } from "@validations";
import {
  sizeOptions,
  osOptions,
  editOsOptions,
  stateOptions,
} from "../js/options";
import { getDicTree, get_regions } from "../js/api";
export default {
  name: "organization",
  components: {
    ValidationProvider,
  },
  data() {
    return {
      flag: this.$route.query.flag,
      id: this.$route.query.id,
      required,
      sizeOptions, //组织规模
      osOptions,
      editOsOptions,
      stateOptions,
      dataList: [], //组织规模选项
      dataCity: [],
      address: [],
      file: null,
      org: {
        org_name: "",
        org_alias: "",
        org_size: 0,
        specific_industries: [],
        province: "", //省份
        city: "", //城市
        area: "", //区县
        org_status: 1, //组织状态
        status: 1, //状态
        business_num: "", //社会信用代码
        business_license: [], //营业执照
        scenario: 0, //页面中不展示，默认传0
        filename: "",
      },
    };
  },
  mounted() {
    this.getDicInfo();
    this.getRegions();
  },
  methods: {
    // 获取组织行业信息
    async getDicInfo() {
      const { data } = await getDicTree();
      this.dataList = data.map((k) => {
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
    // 获取地址行业信息
    async getRegions() {
      const { data } = await get_regions();
      this.dataCity = data.map((k) => {
        k.label = k.title;
        k.disabled = k.disabled;
        // console.log(k.children.length, "kkkkkk");
        if (k.children) {
          k.children.forEach((j) => {
            j.label = j.title;
            if (j.children) {
              j.children.forEach((l) => {
                l.label = l.title;
              });
            }
          });
        }
        if (k.children.length === 0) {
          k.disabled = true;
        }
        return k;
      });
    },
    // 转换联系地址方式
    getAddress() {
      let [province, city, area] = this.address;
      this.org.province = province;
      this.org.city = city;
      this.org.area = area;
    },
    // 上传图片
    onFile(e) {
      let file = e.target.files[0];
      if (window.FileReader) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          let base64String = e.target.result;
          this.org.business_license = base64String;
        };
      }
      this.org.filename = file.name;
    },
  },
};
</script>

<style lang="scss">
.organization {
  .orgInput {
    width: 550px;
  }
  .col-form-label {
    width: 120px;
  }
}
.custom-file-input:lang(en) ~ .custom-file-label::after {
  content: "浏览";
}
</style>