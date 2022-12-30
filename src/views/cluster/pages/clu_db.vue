<template>
  <div>
    <b-row>
      <b-col cols="7">
        <validation-provider>
          <b-form-group label="IP地址：" label-for="ip" label-cols-md="auto">
            <b-form-input style="width: 550px" />
          </b-form-group>
        </validation-provider>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "db",
};
</script>

<style>
</style>