<template>
  <div style="width: 300px">
    <v-select
      :searchable="false"
      :clearable="false"
      :options="options"
      :reduce="(title) => title.key"
      label="title"
      v-model="currentValue"
      @input="input"
    />
  </div>
</template>

<script>
export default {
  name: "Select",
  props: {
    value: {
      type: [String, Object, Number],
      default: "",
    },
    options: {
      type: Array,
      default: "",
    },
  },
  data() {
    return {
      currentValue: "",
    };
  },
  mounted() {
    this.currentValue = this.$props.value;
  },
  methods: {
    input() {
      this.$emit("update:value", this.currentValue);
    },
  },
  watch: {
    value(newVal) {
      this.currentValue = newVal;
    },
  },
};
</script>

<style>
</style>