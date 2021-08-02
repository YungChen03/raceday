<template>
  <div class="lime lighten-5 background">
    <v-container>
      <v-card
        class="mx-auto rounded-xl card-wrap"
        color="grey lighten-5"
        max-width="400"
      >
        <v-card-title>
          <span class="line"></span>

          <img class="avatar" src="../assets/img/cycling avatar.svg" />
          <v-card-text class="text-h5 font-weight-bold ">
            <span class="hello">Hello</span> {{ username }}
          </v-card-text>
          <v-card-text class="text-h5 font-weight-bold ">
            "Only the disciplined ones in life are free."
          </v-card-text>
          <v-card-text class="text-h7 font-weight-bold ek">
            -Eluid Kipchoge
          </v-card-text>
        </v-card-title>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import projectFirestore from "~/plugins/firebase";
export default {
  data() {
    return {
      username: "",
      email: "",
      type: ""
    };
  },

  mounted() {
    const userr = projectFirestore.auth().currentUser;
    if (userr !== null) {
      userr.providerData.forEach(profile => {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
        this.username = profile.displayName;
      });
    }
  },
  methods: {
    changeType() {}
    // getUserData() {
    //   console.log(projectFirestore.auth().currentUser);
    //   const userr = projectFirestore.auth().currentUser;
    //   if (userr !== null) {
    //     userr.providerData.forEach(profile => {
    //       console.log("Sign-in provider: " + profile.providerId);
    //       console.log("  Provider-specific UID: " + profile.uid);
    //       console.log("  Name: " + profile.displayName);
    //       console.log("  Email: " + profile.email);
    //       console.log("  Photo URL: " + profile.photoURL);
    //       this.username = profile.displayName;
    //     });
    //   }
    // }
  }
};
</script>

<style scoped>
.background {
  height: 100vh;
  padding: 10vh 0;
}
.card-wrap {
  max-width: 350px !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
.line {
  width: 100px;
  border: 4px solid #424242;
  transform: translateX(110px);
  border-radius: 10px;
}
.avatar {
  width: 100%;
  height: 20vh;
  margin-top: 20px;
}
.hello {
  color: #1de9b6;
}
.ek {
  margin-left: 180px;
}
</style>
