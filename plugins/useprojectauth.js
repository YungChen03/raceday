import projectFirestore from "~/plugins/firebase";

export default ({ app }, inject) => {
  inject("projectAuth", {
    async signup(email, password) {
      try {
        const res = await projectFirestore
          .auth()
          .createUserWithEmailAndPassword(email, password);
        if (!res) {
          throw new Error("could not complete the signup");
        }
      } catch (err) {
        console.log(err.message);
      }
    },
    async login(email, password) {
      try {
        const res = await projectFirestore
          .auth()
          .signInWithEmailAndPassword(email, password);

        return res;
      } catch (err) {
        console.log(err.message);
      }
    }
  });
};
