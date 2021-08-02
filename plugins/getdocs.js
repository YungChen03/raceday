import { projectFirestore } from "~/plugins/firebase";
export default ({ app }, inject) => {
  inject("getdocs", {
    async getData(collection) {
      let events = [];
      await projectFirestore
        .collection(collection)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            events.push({
              id: doc.id,
              title: doc.data().title,
              location: doc.data().location,
              date: doc.data().date,
              status: doc.data().status,
              organizer: doc.data().organizer,
              register: doc.data().register,
              link: doc.data().link,
              type: doc.data().type
            });
          });
        })
        .catch(error => {
          console.log("Error getting documents: ", error);
        });
      return events;
    }
  });
};

// methods: {
//   getUserData() {
//     const user = projectFirestore.auth().currentUser;
//     if (user !== null) {
//       user.providerData.forEach(profile => {
//         console.log("Sign-in provider: " + profile.providerId);
//         console.log("  Provider-specific UID: " + profile.uid);
//         console.log("  Name: " + profile.displayName);
//         console.log("  Email: " + profile.email);
//         console.log("  Photo URL: " + profile.photoURL);
//       });
//     }
//   }
// }
