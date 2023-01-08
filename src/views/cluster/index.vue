<template>
  <b-card no-body>
    <div class="d-flex justify-content-between mt-1">
      <b-button variant="primary" @click="changeCluItem(0)">添加</b-button>
      <div style="width: 15%">
        <v-select
          :options="searchOptions"
          :clearable="false"
          :searchable="false"
          :reduce="(title) => title.key"
          label="title"
          v-model="area"
          @input="searchArea"
        />
      </div>
    </div>
    <div class="mt-2">
      <b-table
        :fields="fieldsList"
        :items="cluItem"
        class="text-nowrap"
        show-empty
        responsive
        striped
      >
        <template #empty="scope">
          <span
            class="d-flex justify-content-center"
            style="font-size: 16px; font-weight: 400; color: #afafaf"
          >
            暂无数据
          </span>
        </template>
        <template #cell(cluster_area)="data">
          {{ findCity(searchOptions, data.item.cluster_area) }}
        </template>
        <template #cell(cluster_state)="data">
          <b-badge :variant="variant[data.item.cluster_state]">
            {{ data.item.cluster_state == 0 ? "禁用" : "启用" }}
          </b-badge>
        </template>
        <template #cell(create_time)="data">
          <span>{{ formatTime(data.item.create_time) }} </span>
        </template>
        <template #cell(actions)="data">
          <div class="d-flex">
            <feather-icon
              icon="EditIcon"
              size="16"
              class="mr-50"
              style="cursor: pointer"
              :id="`edit_${data.index}`"
            />
            <b-tooltip :target="`edit_${data.index}`" title="编辑信息" />
            <feather-icon
              icon="Trash2Icon"
              size="16"
              style="cursor: pointer"
              :id="`Trash2_${data.index}`"
            />
            <b-tooltip :target="`Trash2_${data.index}`" title="删除信息" />
          </div>
        </template>
      </b-table>
    </div>
  </b-card>
</template>

<script>
import { searchOptions } from "./js/options";
import { clusterList } from "./js/api";
import dayjs from "dayjs";
import { constants } from "buffer";
export default {
  name: "clusterIndex",
  components: {
    searchOptions,
  },
  data() {
    return {
      variant: { 0: "light-danger", 1: "light-success" },
      searchOptions, //区域下拉框
      dayjs, //引入dayjs组件
      area: 0, //区域
      fieldsList: [
        { key: "cluster_name", label: "集群名称" },
        { key: "cluster_area", label: "集群区域" },
        { key: "cluster_state", label: "集群状态" },
        { key: "cluster_describe", label: "集群描述" },
        { key: "create_time", label: "创建时间" },
        { key: "actions", label: "操作", thStyle: "width:100px" },
      ],
      cluItem: [],
    };
  },
  mounted() {
    this.getCluster();
  },
  methods: {
    formatTime(time) {
      return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
    },
    async getCluster() {
      const { data } = await clusterList({
        area: this.area,
        admin_id: 0,
      });
      console.log(data);
      this.cluItem = data;
    },
    findCity(params, val) {
      let key = val;
      let items = [];
      params.forEach((item) => {
        if (item.key == key) {
          items.push(item.title);
        }
      });
      return items.toString();
    },
    searchArea() {
      this.getCluster();
    },
    changeCluItem(flag, data) {
      const id = data ? data.item.cluster_id : undefined;
      const routerName = flag == 0 ? "clusterAdd" : "clusterEdit";
      this.$router.push({ name: routerName, query: { flag, id } });
    },
  },
};
</script>

<style>
</style>