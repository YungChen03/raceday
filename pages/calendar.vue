<template>
  <v-row justify="space-around" align="center">
    <v-date-picker v-model="picker" elevation="15"></v-date-picker>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      picker: null
    };
  }
};
</script>
<style></style>
