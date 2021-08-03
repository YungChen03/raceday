<template>
  <div class="lime lighten-5">
    <v-container class="my-3 pa-5">
      <v-layout row class="ml-2">
        <img src="../../assets/img/task.svg" class="mx-2" />

        <img src="../../assets/img/planner.svg" class="mx-2" />

        <img src="../../assets/img/target.svg" class="mx-2" />

        <img src="../../assets/img/medal.svg" class="mx-2" />

        <!-- <v-btn text mr-5 color="grey darken-2">
          <v-icon left>mdi-magnify</v-icon>
          <span class="caption text-lowercase">search event</span>
        </v-btn> -->

        <v-container v-if="!loginStatus" class="loginwrap">
          <v-btn text color="grey darken-2" class="pleaselogin">
            <span>請登入 查看儲存的最愛賽事</span>
          </v-btn>
        </v-container>
      </v-layout>

      <v-card
        flat
        class="rounded mt-5 "
        v-for="(event, index) in events"
        :key="event.id"
        :class="`pa-5 project ${event.status}`"
      >
        <v-layout wrap align-center>
          <v-flex xs12 sm8 md8 mb-6>
            <div class="caption grey--text ">
              賽事名稱
            </div>
            <div>{{ event.title }}</div>
          </v-flex>

          <v-flex xs8 sm2 md2 mb-3>
            <div class=" grey--text ">{{ event.date }}</div>
            <div></div>
          </v-flex>
          <v-flex xs4 sm2 md2 mb-3>
            <v-btn depressed color="white" @click.left="goDetail(event.id)">
              <div class="detail caption grey--text ">更多資訊</div>
            </v-btn>
          </v-flex>
          <v-flex xs8 sm8 md8>
            <div class="caption grey--text">{{ event.location }}</div>
          </v-flex>
          <v-flex xs3 sm2 md2>
            <div class="status caption grey--text">{{ event.register }}</div>
          </v-flex>
          <v-flex xs1 sm2 md2>
            <div>
              <v-btn
                icon
                small
                @click="deleteFavorite(index)"
                class="deletebtn"
              >
                <v-icon color="grey" :class="`icon delete  `"
                  >mdi-delete</v-icon
                >
              </v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { projectFirestore } from "~/plugins/firebase";
import { format } from "date-fns";
export default {
  created() {
    if (this.$cookies.get("auth") && this.$store.getters.userDocNameValue) {
      this.$store.dispatch("handleIsLogin", true);
    }
  },
  data() {
    return {
      events: [],
      error: "",
      isFavorite: false,
      formattedEvent: []
    };
  },
  computed: {
    loginStatus() {
      return this.$store.getters.loginStatus;
    }
  },

  mounted() {
    const load = async () => {
      try {
        let event = [];
        await projectFirestore
          .collection(
            "users/" + this.$store.getters.userDocNameValue + "/favorite"
          )
          .get()
          .then(res => {
            res.forEach(doc => {
              event.push({
                id: doc.id,
                title: doc.data().title,
                location: doc.data().location,

                date: format(doc.data().date.toDate(), "MMMM  dd yyyy"),
                status: doc.data().status,
                organizer: doc.data().organizer,
                register: doc.data().register,
                type: doc.data().type
              });
            });
          });

        this.events = event;
      } catch (err) {
        this.error = err.message;
      }
    };
    load();
  },

  methods: {
    goDetail(id) {
      this.$router.push(`/favorite/${id}`);
    },

    deleteFavorite(index) {
      projectFirestore
        .collection(
          "users/" + this.$store.getters.userDocNameValue + "/favorite"
        )
        .doc(this.events[index].title)
        .delete();
      const load = async () => {
        try {
          let event = [];
          await projectFirestore
            .collection(
              "users/" + this.$store.getters.userDocNameValue + "/favorite"
            )
            .get()
            .then(res => {
              res.forEach(doc => {
                event.push({
                  id: doc.id,
                  title: doc.data().title,
                  location: doc.data().location,
                  date: format(doc.data().date.toDate(), "MMMM  dd yyyy"),
                  status: doc.data().status,
                  organizer: doc.data().organizer,
                  register: doc.data().register,
                  type: doc.data().type
                });
              });
            });

          this.events = event;
        } catch (err) {
          this.error = err.message;
        }
      };
      load();
    }
  }
};
</script>

<style scoped>
.project.pending {
  border-left: 5px solid orange;
}
.project.ongoing {
  border-left: 5px solid #3cd1c2;
}
.project.overdue {
  border-left: 5px solid tomato;
}

.loginfirst {
  border-bottom: 3px solid red;
}
.icon.delete:active {
  color: #69f0ae !important;
}
.loginwrap {
  text-align: center;
}

img {
  height: 4vh;
}

.pleaselogin {
  margin: 0 auto !important;
}
.layout {
  flex-wrap: wrap !important;
}
@media screen and (max-width: 600px) {
  .status {
    margin-left: 15px;
  }
  .row {
    justify-content: center;
    flex-wrap: wrap;
  }
}
@media screen and (min-width: 600px) {
  .deletebtn {
    transform: translateX(30px);
  }
  .row {
    justify-content: center;
  }
  .layout {
    flex-wrap: wrap !important;
  }
}

@media screen and (min-width: 960px) {
  .deletebtn {
    transform: translateX(30px);
  }
  .row {
    justify-content: center;
  }
}
@media screen and (min-width: 1264px) {
  .v-card {
    margin: 0 auto;
    width: 45vw;
  }
  .row {
    justify-content: center;
  }
  .pleaselogin {
    margin: 0 auto !important;
  }
}
</style>
