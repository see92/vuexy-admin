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
    <p>-----------------------</p>
    <div>
      <feather-icon icon="EditIcon" id="edit" size="16" />
      <b-tooltip target="edit" title="编辑信息" placement="right" />
    </div>
    <div>
      <!-- <feather-icon icon="Trash2Icon" size="16" id="trash2" v-b-tooltip.hover /> -->
    </div>
    <hr />
    <div style="border: 1px solid pink">
      <ValidationObserver ref="form">
        <b-form @submit.prevent="onSubmit">
          <fieldset>
            <legend>Step{{ currentStep }}</legend>
            <keep-alive>
              <ValidationProvider
                v-if="currentStep === 1"
                name="email"
                rules="required|email"
                v-slot="{ errors }"
              >
                <b-form-input
                  v-model="email"
                  type="text"
                  style="width: 300px"
                  :state="errors.length > 0 ? false : null"
                />
                <span class="text-danger">{{ errors[0] }} </span>
              </ValidationProvider>
            </keep-alive>

            <keep-alive>
              <ValidationProvider
                v-if="currentStep === 2"
                name="firstName"
                rules="required"
                v-slot="{ errors }"
              >
                <b-form-input
                  v-model="fname"
                  type="text"
                  style="width: 300px"
                  :state="errors.length > 0 ? false : null"
                />
                <span class="text-danger">{{ errors[0] }} </span>
              </ValidationProvider>
            </keep-alive>

            <keep-alive>
              <ValidationProvider
                v-if="currentStep === 3"
                name="address"
                rules="required|min:5"
                v-slot="{ errors }"
              >
                <b-form-input
                  v-model="address"
                  type="text"
                  style="width: 300px"
                  :state="errors.length > 0 ? false : null"
                />
                <span class="text-danger">{{ errors[0] }} </span>
              </ValidationProvider>
            </keep-alive>
          </fieldset>

          <b-button
            variant="primary"
            class="mr-1"
            @click="goToStep(currentStep - 1)"
            >Previous</b-button
          >
          <b-button
            variant="outline-primary"
            @click="goToStep(currentStep + 1)"
            >{{ currentStep === 3 ? "Submit" : "Next" }}</b-button
          >
        </b-form>
      </ValidationObserver>
    </div>
  </b-card>
</template>

<script>
import child from "./child.vue";
import dayjs from "dayjs";
import { reqMockData } from "../mock/reqMock";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { required, email } from "@validations";
export default {
  name: "page",
  components: { child, ValidationObserver, ValidationProvider },
  data() {
    return {
      required,
      email,
      currentStep: 1,
      email: "",
      fname: "",
      address: "",
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
    goToStep(step) {
      if (step < 1) {
        return;
      }
      if (step > 3) {
        this.onSubmit();
        return;
      }
      this.currentStep = step;
    },
    onSubmit() {
      this.$refs.form.validate().then((success) => {
        if (!success) {
          return;
        }

        alert("Success!");
      });
    },
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
