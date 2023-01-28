<template>
  <b-card title="Create Awesome 🙌">
    <b-form-group label="日期选择:" label-cols-md="auto" label-for="date">
      <el-date-picker
        v-model="obj.date"
        type="date"
        placeholder="选择日期"
        format="yyyy 年 MM 月 dd 日"
        value-format="timestamp"
      ></el-date-picker>

      <!-- <b-button @click="changeTime">三年</b-button>
      <b-button @click="changeTime">五年</b-button> -->
    </b-form-group>
    <span style="border: 1px solid red">{{ obj.date }}</span>

    <b-button @click="getTime">submit</b-button>

    <b-form-group label="增加年份" label-for="date" label-cols-md="auto">
      <el-date-picker v-model="obj.newDate" class="mr-1"></el-date-picker>
      <b-button @click="changeTime(1)">一年</b-button>
      <b-button @click="changeTime(3)">三年</b-button>
      <b-button @click="changeTime(5)">五年</b-button>
    </b-form-group>
    <p>-----------------------</p>
    <div>
      <child @fatherMethod="fatherMethod"></child>
    </div>
  </b-card>
</template>

<script>
import child from "./child.vue";
import dayjs from "dayjs";
import { reqMockData } from "../mock/reqMock";
export default {
  name: "page",
  components: { child },
  data() {
    return {
      obj: {
        date: 1674835200000,
        newDate: new Date(),
        mockData: [],
      },
    };
  },
  mounted() {
    this.setTime();
    reqMockData().then((res) => {
      console.log(res);
      this.mockData = res.data;
    });
  },
  methods: {
    setTime() {
      const date = new Date(this.obj.newDate);
      var year = date.getFullYear() + 1;
      var month = date.getMonth();
      var day = date.getDate();
      month = month + 1;
      month = month.toString().padStart(2, "0");
      day = day.toString().padStart(2, "0");
      this.$set(this.obj, "newDate", `${year}-${month}-${day}`);
    },
    changeTime(num) {
      const date = new Date(this.obj.newDate);
      var year = date.getFullYear() + num;
      var month = date.getMonth();
      var day = date.getDate();
      month = month + 1;
      month = month.toString().padStart(2, "0");
      day = day.toString().padStart(2, "0");
      this.$set(this.obj, "newDate", `${year}-${month}-${day}`);
    },
    getTime() {
      const time = dayjs(this.obj.date).valueOf();
      const newTime = dayjs(this.obj.newDate).valueOf();
      console.log(time, newTime);
    },
    fatherMethod() {
      console.log("父组件方法");
    },
  },
};
</script>

<style>
</style>
