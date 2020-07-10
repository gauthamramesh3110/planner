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
};
