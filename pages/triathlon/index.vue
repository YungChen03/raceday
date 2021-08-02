<template>
  <div class="lime lighten-5">
    <v-container class="my-3 pa-5">
      <v-layout row class="ml-2" align-start>
        <img src="../../assets/img/swimmingtri (2).svg" class="mx-2" />

        <img src="../../assets/img/cycling 01.svg" class="mx-2" />
        <img src="../../assets/img/running tri.svg" class="mx-2" />
        <img src="../../assets/img/quality.svg" class="mx-2" />

        <!-- <v-btn text mr-5 color="grey darken-2">
          <v-icon left>mdi-magnify</v-icon>
          <span class="caption text-lowercase">search event</span>
        </v-btn> -->
        <!-- <input
          mt-10
          v-show="isActive"
          class="searchbar active"
          type="text"
          :class="{ active: isActive }"
        /> -->
      </v-layout>
      <v-card
        flat
        class="rounded mt-5 "
        v-for="(event, index) in formateEvent"
        :key="event.id"
        :class="`pa-5 project ${event.status}`"
      >
        <v-layout wrap align-center>
          <v-flex xs12 sm8 md8 mb-3>
            <div class="caption grey--text ">
              賽事名稱
            </div>
            <div>{{ event.title }}</div>
          </v-flex>
          <v-flex xs8 sm2 md2 mb-3>
            <div class=" grey--text ">{{ event.formatedate }}</div>
            <div></div>
          </v-flex>
          <v-flex xs4 sm2 md2 mb-3>
            <v-btn depressed color="white" @click.left="goDetail(event.id)">
              <div class="caption grey--text ">更多資訊</div>
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
                class="favoritebtn"
                icon
                small
                @click="addToFavorite(index)"
              >
                <v-icon color="grey" :class="`icon favorite  `"
                  >mdi-heart</v-icon
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
  data() {
    return {
      events: [],
      error: "",
      formattedEvent: [],
      isActive: false
    };
  },
  computed: {
    userDocName() {
      return this.$store.getters.userDocName;
    },
    formateEvent() {
      if (this.events) {
        this.events.forEach(doc => {
          let time = format(doc.date.toDate(), "MMM  dd yyyy");
          this.formattedEvent.push({
            id: doc.id,
            title: doc.title,
            location: doc.location,
            date: doc.date.seconds,
            formatedate: time,
            status: doc.status,
            organizer: doc.organizer,
            register: doc.register,
            type: doc.type,
            link: doc.link
          });
          this.formattedEvent.sort((a, b) => {
            return a.date - b.date;
          });
        });
      }
      return this.formattedEvent;
    }
  },

  methods: {
    addToFavorite(index) {
      try {
        projectFirestore
          .collection("users")
          .doc(this.$store.getters.userDocNameValue)
          .collection("favorite")
          .doc(this.events[index].title)
          .set({
            title: this.events[index].title,
            location: this.events[index].location,
            date: this.events[index].date,
            status: this.events[index].status,
            organizer: this.events[index].organizer,
            register: this.events[index].register,
            type: this.events[index].type,
            link: this.events[index].link
          });
      } catch (err) {
        console.log(err.message);
        this.error = "你好,請先登錄會員";
        alert(this.error);
      }
    },
    showSearchBar() {
      this.isActive = !this.isActive;
    },
    showId() {
      console.log(formateEvent.id);
    },

    goDetail(id) {
      this.$router.push(`/triathlon/${id}`);
    }
  },

  mounted() {
    const load = async () => {
      try {
        let res = await this.$getdocs.getData("triathlon");
        this.events = res;
      } catch (err) {
        this.error = err.message;
      }
    };
    load();
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
.project.isfavorite {
  border-left: 5px solid tomato;
}
.icon.favorite {
  color: pink !important;
  position: relative;
}
.icon.favorite:active {
  color: red !important;
}

img {
  height: 4vh;
}
.searchbar.active {
  background: white;
  border-radius: 50px;
  outline: none;
  width: 98%;
  margin-top: 5px;
}
.detail {
  text-decoration: none !important;
}

@media screen and (max-width: 600px) {
  .status {
    margin-left: 15px;
  }
  .row {
    justify-content: center;
  }
}
@media screen and (min-width: 600px) {
  .favoritebtn {
    transform: translateX(30px);
  }
  .row {
    justify-content: center;
  }
}
@media screen and (min-width: 960px) {
  .favoritebtn {
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
}
</style>
