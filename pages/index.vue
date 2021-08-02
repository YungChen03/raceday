<template>
  <div height="90vh">
    <Home />
  </div>
</template>
<script>
import Home from "../components/Home.vue";

export default {
  components: { Home }
};
</script>

<style scoped>
@media screen and (min-width: 1200px) {
  .home {
    margin: 0 auto;
    width: 45vw;
  }
}
</style>
