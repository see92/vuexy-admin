<template>
  <b-card no-body>
    <div class="mt-2">
      <b-button variant="primary">添加</b-button>
    </div>
    <div class="mt-2">
      <b-table
        tbody-tr-class="nacdeviceTableTr"
        :fields="fieldsList"
        :items="orgItem"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
      >
        <template #cell(org_size)="data">
          <span>{{ findSize(sizeOptions, data.item.org_size) }}</span>
        </template>
        <template #cell(specific_industries)="data">
          <!-- <span>{{ data.item.specific_industries }}</span> -->
        </template>
        <template #cell(org_status)="data">
          <span>{{
            data.item.org_status == 0
              ? "注册通过"
              : data.item.org_status == 1
              ? "基本信息通过"
              : "全部信息通过"
          }}</span>
        </template>
        <template #cell(status)="data">
          <span>{{ data.item.status == 0 ? "禁用" : "启用" }}</span>
        </template>
        <template #cell(create_time)="data">
          <span>{{ formatTime(data.item.create_time) }}</span>
        </template>
        <template #cell(action)="data">
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
      <div class="d-flex justify-content-between mt-2">
        <div>共{{ count }}条</div>
        <div>
          <b-pagination
            v-model="page"
            :per-page="size"
            :total-rows="count"
            @change="changePage"
          />
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
import { getAllorgInfo, getDicTree } from "./js/api";
import { sizeOptions } from "./js/options";
import dayjs from "dayjs";
export default {
  name: "organization",
  data() {
    return {
      page: 1,
      size: 20,
      count: 0,
      dayjs,
      sortBy: "create_time",
      sortDesc: false,
      sizeOptions, //城市选项
      fieldsList: [
        { key: "org_friendly_id", label: "友好ID" },
        { key: "org_name", label: "组织名称" },
        { key: "org_alias", label: "组织别名" },
        { key: "org_size", label: "组织规模" },
        { key: "specific_industries", label: "组织行业" },
        { key: "org_status", label: "组织状态" },
        { key: "status", label: "状态" },
        { key: "create_time", label: "创建时间", sortable: true },
        { key: "action", label: "操作", thStyle: "width:100px" },
      ],
      orgItem: [],
      dicItem: [],
    };
  },
  mounted() {
    this.getOrganInfo();
    this.getDicInfo();
  },
  methods: {
    formatTime(time) {
      return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
    },
    async getOrganInfo() {
      const { data } = await getAllorgInfo({
        page: this.page,
        count: this.size,
        admin_id: "2",
      });
      this.orgItem = JSON.parse(JSON.stringify(data.orginfo));
      this.count = data.count;
    },
    changePage(e) {
      this.page = e;
      this.getOrganInfo();
    },
    findSize(params, val) {
      let key = val;
      let items = [];
      params.forEach((item) => {
        if (item.key === key) {
          items.push(item.label);
        }
      });
      return items.toString();
    },
    async getDicInfo() {
      const { data } = await getDicTree();
      this.dicItem = data.map((item) => {
        item.label = item.name;
        item.value = item.id;
        if (item.children) {
          item.children.forEach((each) => {
            each.label = each.name;
            each.value = each.id;
            if (each.children) {
              each.children = null;
            }
          });
        }
        return item;
      });
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