<template>
  <div class="home">
    <div>
      <img class="pic-big" src="../assets/runningsvg.svg" />
    </div>

    <v-container
      class="grey lighten-4  rounded-xl grid-list-xs text-xs-center mt-4 fluid category"
    >
      <v-layout row wrap justify-space-around py-5 px-5>
        <v-flex xs6 md6>
          <v-btn block color="white" height="20vh" width="100%" to="/marathon">
            <div>
              <img class="smallpic" src="../assets/img/running black.svg" />
              <div class="mt-3 ml-4">馬拉松</div>
            </div>
          </v-btn>
        </v-flex>

        <v-flex xs6 md6>
          <v-btn block color="white" height="20vh" width="100%" to="/cycling"
            ><div>
              <img class="smallpic" src="../assets/img/cycling black.svg" />
              <div class="mt-3 ml-4">自行車</div>
            </div></v-btn
          >
        </v-flex>

        <v-flex xs6 md6>
          <v-btn block color="white" height="20vh" width="100%" to="triathlon"
            ><div>
              <img class="smallpic" src="../assets/img/triathlon.svg" />
              <div class="mt-3 ml-2">鐵人三項</div>
            </div></v-btn
          >
        </v-flex>

        <v-flex xs6 md6>
          <v-btn block color="white" height="20vh" width="100%" to="/favorite"
            ><div>
              <img class="smallpic" src="../assets/img/pencil.svg" />
              <div class="mt-3 ml-3">我的最愛</div>
            </div></v-btn
          >
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script scoped>
export default {
  created() {
    if (this.$cookies.get("auth".token)) {
      this.$store.dispatch("handleIsLogin", true);
    }
  },
  data() {
    return {
      events: [],
      error: ""
    };
  }
};
</script>

<style scoped>
.pic-big {
  width: 100%;
  height: 35vh;
  padding: 20px;
  transform: translateY(-15px);
}
.category {
  height: 50vh;
}
.smallpic {
  overflow: hidden;
  height: 10vh;
}
@media screen and (min-width: 1200px) {
  .pic-big {
    position: absolute;
    height: 59vh;
    z-index: 5;
    top: -80px;
    left: 30px;
  }
  .home {
    position: relative;
  }
  .layout {
    margin-top: 380px !important;
  }
  .v-application .grey.lighten-4 {
    height: 86vh !important;
  }
}
</style>
