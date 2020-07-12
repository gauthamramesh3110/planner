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
      .signInWithEmailAndPassword(userDetails.email, userDetails.password);
  },

  createUserWithEmailAndPassword: (context, userDetails) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(userDetails.email, userDetails.password)
      .then((res) => {
        let user = {
          email: userDetails.email,
          name: userDetails.name,
        };

        let db = firebase.firestore();
        db.collection("userDetails")
          .doc(res.user.uid)
          .set(user);

        db.collection("calendars").add({
          userId: res.user.uid,
          name: "Default",
          color: "blueTask",
        });
      });
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
        dispatch("getUserDetails");
        dispatch("getAllCalendarsAndTasks");
      } else {
        if (currentRoute == "/") {
          router.push("/login");
        }
      }
    });
  },

  getUserDetails: ({ getters, commit }) => {
    let db = firebase.firestore();
    let user = getters.user;

    db.collection("userDetails")
      .doc(user.uid)
      .get()
      .then((doc) => {
        let userDetails = {
          id: doc.id,
          email: doc.data().email,
          name: doc.data().name,
        };
        commit("setUserDetails", userDetails);
      });
  },

  getAllCalendarsAndTasks: ({ getters, commit }) => {
    let db = firebase.firestore();
    let user = getters.user;

    db.collection("calendars")
      .where("userId", "==", user.uid)
      .orderBy("name")
      .get()
      .then((snapshot) => {
        commit("setCalendars", snapshot.docs);
        db.collection("tasks")
          .where("userId", "==", user.uid)
          .orderBy("created")
          .get()
          .then((snapshot) => {
            commit("setTasks", snapshot.docs);
          });
      })
      .catch((err) => console.log(err));
  },

  addNewTask: ({ getters, commit }, taskName) => {
    let db = firebase.firestore();

    let today = new Date();

    let newTask = {
      name: taskName,
      userId: getters.user.uid,
      calendarId: getters.taskCalendar.id,
      color: getters.taskCalendar.color,
      completed: false,
      created: today,
      start: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        0,
        0,
        0
      ),
      end: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        24,
        0,
        0
      ),
      subtasks: [],
    };

    db.collection("tasks")
      .add(newTask)
      .then((res) => {
        newTask.id = res.id;
        commit("addNewTask", newTask);
      });
  },

  deleteTask: ({ commit }, taskId) => {
    let db = firebase.firestore();

    db.collection("tasks")
      .doc(taskId)
      .delete()
      .then(() => {
        commit("deleteTask", taskId);
        console.log("document deleted");
      });
  },

  editTask: ({ getters, commit }) => {
    let db = firebase.firestore();
    let start = new Date(
      getters.editableTaskStartDate + " " + getters.editableTaskStartTime
    );
    let end = new Date(
      getters.editableTaskEndDate + " " + getters.editableTaskEndTime
    );

    db.collection("tasks")
      .doc(getters.editableTaskId)
      .update({
        name: getters.editableTaskName,
        start,
        end,
      })
      .then(() => {
        commit("editTask");
        commit("setEditDialogOpen", false);
      });
  },

  toggleCompleted: ({ getters, commit }, taskId) => {
    commit("toggleCompleted", taskId);
    let db = firebase.firestore();

    db.collection("tasks")
      .doc(taskId)
      .update({
        completed: getters.taskById(taskId).completed,
      })
      .catch((err) => console.log(err));
  },

  addCalendar: ({ getters, commit }, data) => {
    let newCalendar = {
      userId: getters.user.uid,
      name: data[0],
      color: data[1],
    };

    let db = firebase.firestore();

    db.collection("calendars")
      .add(newCalendar)
      .then((res) => {
        newCalendar.id = res.id;
        commit("addCalendar", newCalendar);
      })
      .catch((err) => console.log(err));
  },
};
