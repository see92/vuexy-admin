<template>
  <div class="child">
    <b-button @click="childMethods()">子组件按钮</b-button>
  </div>
</template>


<script>
export default {
  name: "child",
  mounted() {
    this.childMethods();
  },
  methods: {
    childMethods() {
      this.$emit("fatherMethod");
    },
  },
};
</script>