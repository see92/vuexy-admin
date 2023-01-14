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
  </b-card>
</template>

<script>
import { BCard, BCardText } from "bootstrap-vue";
import dayjs from "dayjs";
export default {
  name: "page",
  components: {},
  data() {
    return {
      obj: {
        date: 1674835200000,
        newDate: new Date(),
      },
    };
  },
  mounted() {
    this.setTime();
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
  },
};
</script>

<style>
</style>
