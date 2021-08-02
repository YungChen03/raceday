<template>
  <div>
    <v-bottom-navigation>
      <v-btn to="/calendar">
        <v-icon> mdi-calendar</v-icon>
      </v-btn>

      <v-btn to="/favorite">
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn to="/" @click="checkuser">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn @click="goBack">
        <v-icon>mdi-arrow-left-bold</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  methods: {
    checkuser() {
      console.log(
        this.$store.getters.loginStatus,
        this.$cookies.get("auth"),
        this.$store.getters.userDocNameValue
      );
    },
    goBack() {
      this.$router.back();
    }
  }
};
</script>

<style>
.v-item-group.v-bottom-navigation {
  position: fixed;
}
</style>
