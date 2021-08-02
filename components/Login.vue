<template>
  <v-row justify="center">
    <div
      @click="logout"
      v-if="loginStatus"
      depressed
      class=" white text-uppercase logout"
    >
      <span>logout</span>
      <v-icon>mdi-logout</v-icon>
    </div>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn v-if="!loginStatus" v-on="on" depressed color="white">
          <span>Login</span>
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-text pb-0>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  placeholder="please enter your e-mail"
                  v-model="email"
                  required
                ></v-text-field>
              </v-col>
              <v-col pb-0 cols="12">
                <v-text-field
                  placeholder="please enter your password"
                  v-model="password"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <div ml-5 class="gosignup" @click="gotoSignup" to="/signup">
                沒有帳號嗎?按這裡註冊去!
              </div>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="loginSubmit">
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import firebase from "~/plugins/firebase";
import projectFirestore from "~/plugins/firebase";
export default {
  created() {
    if (this.$cookies.get("auth") && this.$store.getters.userDocNameValue) {
      this.$store.dispatch("handleIsLogin", true);
    }
  },

  data() {
    return {
      email: "",
      password: "",
      dialog: false,
      error: "",
      userDoc: ""
    };
  },
  computed: {
    loginStatus() {
      return this.$store.getters.loginStatus;
    }
  },

  methods: {
    gotoSignup() {
      this.$router.push({ name: "signup" });
      this.dialog = false;
    },

    async loginSubmit() {
      if (this.$cookies.get("auth") && this.$store.getters.userDocNameValue) {
        alert("目前已登入");
      } else {
        await this.$projectAuth.login(this.email, this.password);
        const user = projectFirestore.auth().currentUser;
        if (user !== null) {
          user.providerData.forEach(profile => {
            this.userDoc = profile.uid;
            this.$cookies.set("auth", { token: profile.uid });
          });
          this.$store.dispatch("handleIsLogin", true);
          this.$store.dispatch("pushUserDocName", this.userDoc);
        }
      }

      this.$router.push({ name: "index" });
      this.dialog = false;
    },

    logout() {
      firebase.auth().signOut();
      this.$cookies.remove("auth");
      this.$store.dispatch("handleIsLogin", false);
    }
  }
};
</script>

<style scoped>
.v-application .justify-center {
  justify-content: flex-end !important;
}

.v-dialog > .v-card > .v-card__text {
  padding: 40px 24px 20px;
}
.gosignup {
  cursor: pointer;
  margin-left: 10px;
}
.logout {
  cursor: pointer;
}
</style>
