<template>
  <validation-provider rules="required|ip" name="ip" #default="{ errors }">
    <b-form-input
      :state="errors.length > 0 ? false : null"
      style="width: 300px"
      v-model="currentValue"
      placeholder="请输入ip地址"
      @input="input"
    />
    <small class="text-danger">{{ errors[0] }} </small>
  </validation-provider>
</template> 

<script>
import { ValidationProvider } from "vee-validate";

export default {
  name: "Input",
  components: {
    ValidationProvider,
  },
  props: {
    value: {
      type: String,
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
    value(newValue) {
      this.currentValue = newValue;
    },
  },
};
</script>

<style>
</style>