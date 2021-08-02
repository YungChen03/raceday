<template>
  <v-container mt-16 class="background">
    <v-form class="signupform">
      <v-container mt-5>
        <div class="grey--text-darken-4">會員註冊</div>
      </v-container>

      <v-container mt-5 pt-5 px-5>
        <v-text-field v-model="username" label="Name" required></v-text-field>
        <v-text-field v-model="email" label="E-mail" required></v-text-field>
        <v-text-field
          v-model="password"
          label="password"
          required
        ></v-text-field>
        <div class="err">{{ error }}</div>
      </v-container>
      <v-btn class="mt-15" @click="clear">
        clear
      </v-btn>
      <v-btn class="mr-5 mt-15" @click="submit">
        submit
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import projectFirestore from "~/plugins/firebase";
import firebase from "firebase/app";
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      error: ""
    };
  },

  methods: {
    async submit(email, password) {
      try {
        const res = await projectFirestore
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password);
        const user = firebase.auth().currentUser;
        if (!res) {
          throw new Error("could not complete the signup");
        }
        await user.updateProfile({
          displayName: this.username
        });
        this.$router.push({ name: "index" });
        console.log(user);
      } catch (err) {
        this.error = err.message;
        console.log(this.error);
      }
    },

    getUid() {
      const userr = projectFirestore.auth().currentUser;
      if (userr !== null) {
        userr.providerData.forEach(profile => {
          console.log("  Provider-specific UID: " + profile.uid);
        });
      }
    },

    clear() {
      this.username = "";
      this.email = "";
      this.password = "";
    }
  }
};
</script>

<style scoped>
.background {
  background-color: #eceff1;
  height: 90vh;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
}
.signupform {
  width: 30%;
  height: 60vh;
  background-color: #f5fffa;
  text-align: center;
  margin: 0 auto;
  border-radius: 20px;
}
.err {
  color: red;
}
@media screen and (max-width: 600px) {
  .signupform {
    width: 80vw;
  }
}
@media screen and (min-width: 600px) {
  .signupform {
    width: 50vw;
  }
}
@media screen and (min-width: 960px) {
  .signupform {
    width: 30vw;
  }
}
@media screen and (min-width: 1264px) {
  .signupform {
    width: 20vw;
  }
}
</style>
