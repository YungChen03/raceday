<template>
  <v-row justify="center" align="center" class="detailwrap">
    <v-col cols="12">
      <v-card class="rounded-xl">
        <v-card-title class="teal accent-3 justify-center ">
          <span class="text-h5 white--text mt-5">{{
            eventsDetail.data.title
          }}</span>
        </v-card-title>

        <v-card-title class="teal accent-3 justify-center">
          <span class="text-6 white--text">{{ eventsDetail.data.date }}</span>
        </v-card-title>

        <v-card-title class="teal accent-3 justify-center">
          <span class="text-h6 white--text">{{
            eventsDetail.data.location
          }}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <v-divider></v-divider>

        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-subtitle>主辦單位</v-list-item-subtitle>
            <v-list-item-title>{{
              eventsDetail.data.organizer
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title>賽事類別</v-list-item-title>
            <v-list-item-subtitle>
              {{ eventsDetail.data.type }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-subtitle>活動狀態</v-list-item-subtitle>
            <v-list-item-title>{{
              eventsDetail.data.register
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-content class="register">
            <v-list-item-title>
              <a
                class="link grey--text"
                href="https://www.taiwantriathlon.com/2021-kenting-marathon/"
              >
                報名連結</a
              >
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { projectFirestore } from "~/plugins/firebase";
import { format } from "date-fns";
export default {
  data() {
    return {
      eventsDetail: { data: {} },
      isError: false
    };
  },
  async asyncData(context) {
    return { id: context.params.id };
  },

  mounted() {
    const load = async () => {
      try {
        let event = [];
        await projectFirestore
          .collection(
            "users/" + this.$store.getters.userDocNameValue + "/favorite"
          )
          .doc(this.id)
          .get()
          .then(doc => {
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
        this.eventsDetail.data = event[0];
        console.log(this.eventsDetail.data);
      } catch (err) {
        this.error = err.message;
      }
    };
    load();
  }
};
</script>

<style scoped>
.detailwrap {
  background-color: #fffde7 !important;
}
.link {
  text-decoration: none;
}
@media screen and (max-width: 600px) {
  .v-card {
    max-width: 300px;
    margin: 0 auto;
  }
}
@media screen and (min-width: 600px) {
  .v-card {
    max-width: 350px;
    margin: 0 auto;
  }
}

@media screen and (min-width: 960px) {
  .v-card {
    max-width: 400px;
    margin: 0 auto;
  }
}

@media screen and (min-width: 1264px) {
  .v-card {
    margin: 0 auto;
    width: 30vw;
  }
  .v-card__title.title {
    font-size: 3.25rem !important;
    font-weight: 600;
  }
}
</style>
