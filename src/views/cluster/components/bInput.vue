<template>
  <validation-provider :rules="rules" :name="name" #default="{ errors }">
    <b-form-group :label="label" :label-for="name" label-cols-md="auto">
      <b-form-input
        :state="errors.length > 0 ? false : null"
        :placeholder="placeText"
        style="width: 550px"
        v-model="currentValue"
        @input="input"
      />
      <small class="text-danger">{{ errors[0] }}</small>
    </b-form-group>
  </validation-provider>
</template>

<script>
import { ValidationProvider } from "vee-validate";
export default {
  name: "bInput",
  components: {
    ValidationProvider,
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    rules: {
      type: [String, Object],
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    placeText: {
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