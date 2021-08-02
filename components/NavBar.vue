<template>
  <v-container class="container ">
    <v-app-bar flat color="white" height="auto">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>
        <span class="font-weight-light">RACE</span>DAY
        <span class="font-weight-light subtitle-1">比賽日</span>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <Login />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute left temporary>
      <v-list v-model="group">
        <v-list-item
          v-for="link in links"
          :key="link.text"
          :to="link.route"
          link
        >
          <v-icon>mdi-{{ link.icon }}</v-icon>
          <v-list-item-title>
            {{ link.text }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import Login from "../components/Login.vue";

export default {
  components: { Login },
  data: () => ({
    drawer: false,
    group: null,
    links: [
      { icon: "home", text: "首頁", route: "/" },
      { icon: "calendar", text: "日曆", route: "/calendar" },
      { icon: "heart", text: "我的賽事", route: "/favorite" },
      { icon: "account", text: "我的帳號", route: "/myaccount" }
    ]
  }),

  watch: {
    group() {
      this.drawer = false;
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87);
}

.v-toolbar__title {
  padding-left: 0 !important ;
}

@media (min-width: 960px) {
  .container {
    max-width: 100%;
  }
}
</style>
