<template>
  <div>
    <b-row>
      <b-col cols="7">
        <b-form-group label="测试：" label-for="test" label-cols-md="auto">
          <div style="width: 550px">
            <v-select
              :searchable="false"
              :clearable="false"
              :options="options"
              :reduce="(title) => title.value"
              label="title"
              multiple
              v-model="select"
            />
          </div>
        </b-form-group>
      </b-col>
    </b-row>
    <b-button variant="primary" @click="submit">提交</b-button>
  </div>
</template>

<script>
import { options } from "./ceshi";
export default {
  name: "page",
  components: {},
  data() {
    return {
      options,
      select: ["A", "B", "C"],
    };
  },
  methods: {
    submit() {
      console.log(this.select, "select");
    },
  },
};
</script>

<style>
</style>