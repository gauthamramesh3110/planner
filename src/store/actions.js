import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import router from "../router/index";

export default {
  initializeFirebase: ({ getters }) => {
    firebase.initializeApp(getters.firebaseConfig);
  },

  signInWithEmailAndPassword: (context, userDetails) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(userDetails.email, userDetails.password)
      .then(() => console.log("Logged In"))
      .catch((err) => console.log(err));
  },

  createUserWithEmailAndPassword: (context, userDetails) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(userDetails.email, userDetails.password)
      .then(() => console.log("User Created"))
      .catch((err) => console.log(err));
  },

  signOut: () => {
    firebase.auth().signOut();
  },

  onAuthStateChanged: ({ commit, dispatch }, currentRoute) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (currentRoute == "/login") {
          router.push("/");
        }
        commit("setUser", user);
        dispatch("getAllCalendarsAndTasks");
      } else {
        if (currentRoute == "/") {
          router.push("/login");
        }
        commit("setUser", null);
      }
    });
  },

  getAllCalendarsAndTasks: ({ getters, commit }) => {
    let db = firebase.firestore();
    let user = getters.user;

    db.collection("calendars")
      .where("userId", "==", user.uid)
      .get()
      .then((snapshot) => {
        commit("setCalendars", snapshot.docs);

        db.collection("tasks")
          .where("userId", "==", user.uid)
          .get()
          .then((snapshot) => {
            commit("setTasks", snapshot.docs);
          });
      })
      .catch((err) => console.log(err));
  },

  addNewTask: ({ getters, commit }, taskName) => {
    let db = firebase.firestore();
    let newTask = {
      name: taskName,
      userId: getters.user.uid,
      calendarId: getters.taskCalendar.id,
      completed: false,
      start: firebase.firestore.Timestamp.fromDate(new Date()),
      end: firebase.firestore.Timestamp.fromDate(new Date()),
      created: firebase.firestore.Timestamp.fromDate(new Date()),
      subtasks: [],
    };

    db.collection("tasks")
      .add(newTask)
      .then((res) => {
        let id = res.id;
        db.collection("tasks")
          .doc(id)
          .get()
          .then((docRef) => {
            commit("addNewTask", docRef);
          });
      });
  },
};
