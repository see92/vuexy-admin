<template>
  <b-card class="cluster">
    <!-- 按钮---下拉选项 -->
    <div class="btn d-flex justify-content-between">
      <b-button variant="primary" @click="toAdd(0)">添加</b-button>
      <div style="width: 10%">
        <v-select
          :options="searchOptions"
          :searchable="false"
          :clearable="false"
          :reduce="(title) => title.key"
          label="title"
          v-model="city"
        />
      </div>
    </div>
    <!-- 表格内容 -->
    <div class="table">
      <b-table :fields="cluFields" :items="cluItems">
        <template #cell(actions)="data">
          <div class="d-flex align-items-center">
            <feather-icon
              icon="EditIcon"
              size="16"
              class="mr-50"
              style="cursor: pointer"
              :id="`edit_${data.index}`"
            />
            <b-tooltip :target="`edit_${data.index}`" title="编辑信息" />
            <Feather-icon
              icon="Trash2Icon"
              size="16"
              style="cursor: pointer"
              :id="`Trash2_${data.index}`"
            />
            <b-tooltip :target="`Trash2_{data.index}`" title="删除信息" />
          </div>
        </template>
      </b-table>
    </div>
  </b-card>
</template>

<script>
import { BCard, BButton, BTable, BTooltip } from "bootstrap-vue";
import { searchOptions } from "./js/options";
import vSelect from "vue-select";
import FeatherIcon from "@/@core/components/feather-icon/FeatherIcon.vue";
export default {
  name: "cluIndex",
  components: {
    BCard,
    BButton,
    vSelect,
    BTable,
    FeatherIcon,
    BTooltip,
  },
  data() {
    return {
      searchOptions, //搜索选项
      city: 0,
      cluFields: [
        { key: "cluster_name", label: "集群名称" },
        { key: "cluster_area", label: "集群区域" },
        { key: "cluster_state", label: "集群状态" },
        { key: "cluster_describe", label: "集群描述" },
        { key: "create_time", label: "创建时间" },
        { key: "actions", label: "操作", thStyle: "width:100px" },
      ],
      cluItems: [
        {
          cluster_name: "北京集群",
          cluster_area: 1,
          cluster_state: 0,
          cluster_describe: "test",
          create_time: "2022-12-28T08:16:23.164Z",
        },
      ],
    };
  },
  methods: {
    toAdd(flag, data) {
      const id = data ? data.item.cluster_id : undefined;
      const routeName = flag == 0 ? "clusterAdd" : "clusterEdit";
      this.$router.push({
        name: routeName,
        query: { flag, id },
      });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>