<template>
  <v-app>
    <NavBar />
    <Nuxt />
    <BottomNav />
  </v-app>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import BottomNav from "../components/BottomNav.vue";
export default {
  components: {
    BottomNav,
    NavBar
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#__nuxt,
#__layout {
  width: 100%;
  height: 100%;
  line-height: 1.5;
}

#__layout > div {
  width: 100%;
  height: 100%;
  font-family: "Roboto", sans-serif;
  line-height: 1.5;
  max-height: 70vh;
}
</style>
