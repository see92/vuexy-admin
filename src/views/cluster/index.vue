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
        tbody-tr-class="nacdeviceTableTr"
        :fields="fieldsList"
        :items="cluItem"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
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
              @click="changeCluItem(1, data)"
            />
            <b-tooltip :target="`edit_${data.index}`" title="编辑信息" />
            <feather-icon
              icon="Trash2Icon"
              size="16"
              style="cursor: pointer"
              :id="`Trash2_${data.index}`"
              @click="delShow(data.item.cluster_id)"
            />
            <b-tooltip :target="`Trash2_${data.index}`" title="删除信息" />
          </div>
        </template>
      </b-table>
      <!-- 删除弹窗 -->
      <b-modal hide-footer size="sm" title="提示：" centered v-model="delModal">
        <div>此操作会删除数据，是否继续？</div>
        <div class="d-flex justify-content-end">
          <b-button class="mr-1" variant="danger" @click="delConfirm"
            >确定</b-button
          >
          <b-button variant="outline-danger" @click="delCancel">取消</b-button>
        </div>
      </b-modal>
    </div>
  </b-card>
</template>

<script>
import { searchOptions } from "./js/options";
import { clusterList, deleteCluster } from "./js/api";
import dayjs from "dayjs";
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
      sortBy: "create_time",
      sortDesc: false,
      fieldsList: [
        { key: "cluster_name", label: "集群名称" },
        { key: "cluster_area", label: "集群区域" },
        { key: "cluster_state", label: "集群状态" },
        { key: "cluster_describe", label: "集群描述" },
        { key: "create_time", label: "创建时间", sortable: true },
        { key: "actions", label: "操作", thStyle: "width:100px" },
      ],
      cluItem: [],
      delModal: false,
    };
  },
  mounted() {
    this.getCluster();
  },
  methods: {
    // dayjs处理UTC时间
    formatTime(time) {
      return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
    },
    // 获取集群信息列表
    async getCluster() {
      const { data } = await clusterList({
        area: this.area,
        admin_id: 0,
      });
      console.log(data);
      this.cluItem = data;
    },
    // 通过key值获取城市
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
    // 查询区域
    searchArea() {
      this.getCluster();
    },
    // 新增/修改点击事件
    changeCluItem(flag, data) {
      const id = data ? data.item.cluster_id : undefined;
      const routerName = flag == 0 ? "clusterAdd" : "clusterEdit";
      this.$router.push({ name: routerName, query: { flag, id } });
    },
    // 展示二次删除弹窗
    delShow(id) {
      console.log(id);
      this.delModal = true;
      this.clusterId = id;
    },
    // 确定删除操作
    async delConfirm() {
      const { status, statusText } = await deleteCluster({
        cluster_id: this.clusterId,
        admin_id: "2",
      });
      if (status === 200) {
        this.$swal.fire({
          icon: "success",
          text: "删除成功",
          showConfirmButton: false,
          timer: 1500,
        });
        this.delCancel();
        this.getCluster();
      } else {
        this.$swal.fire({
          icon: "error",
          text: statusText,
        });
      }
    },
    // 取消删除操作
    delCancel() {
      this.delModal = false;
    },
  },
};
</script>

<style>
.nacdeviceTableTr td {
  max-width: 10rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>