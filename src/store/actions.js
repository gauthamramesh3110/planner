import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import router from "../router/index";

export default {
  initializeFirebase: ({ getters }) => {
    firebase.initializeApp(getters.firebaseConfig);
  },

  signInWithEmailAndPassword: ({ commit }, userDetails) => {
    commit("setNewUser", false);

    firebase
      .auth()
      .signInWithEmailAndPassword(userDetails.email, userDetails.password)
      .catch((err) => console.log(err));
  },

  createUserWithEmailAndPassword: ({ commit }, userDetails) => {
    commit("setNewUser", true);

    let newUserDetails = {
      name: userDetails.name,
      email: userDetails.email,
    };
    commit("setUserDetails", newUserDetails);

    firebase
      .auth()
      .createUserWithEmailAndPassword(userDetails.email, userDetails.password)
      .catch((err) => console.log(err));
  },

  signOut: () => {
    firebase.auth().signOut();
  },

  onAuthStateChanged: ({ getters, commit, dispatch }, currentRoute) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let db = firebase.firestore();

        if (getters.isNewUser) {
          //ADD NEW USER DETAILS TO DATABASE
          let newUserDetails = getters.userDetails;
          newUserDetails.userId = getters.user.uid;

          console.log("Adding User");
          db.collection("userDetails").add(newUserDetails);

          //ADD DEFAULT CALENDAR TO DATABASE
          let defaultCalendar = {
            name: "Default",
            color: "greyTask",
            userId: user.uid,
          };
          db.collection("calendars")
            .add(defaultCalendar)
            .then((res) => {
              defaultCalendar.id = res.id;
              commit("addCalendar", defaultCalendar);
            });

          //UNSET NEW USER
          commit("setNewUser", false);
        } else if (getters.userDetails == null) {
          //GET USER DETAILS
          console.log("Getting User");
          db.collection("userDetails")
            .where("userId", "==", user.uid)
            .get()
            .then((snapshot) => {
              let user = snapshot.docs[0];

              let userDetails = {
                userId: user.data().userId,
                name: user.data().name,
                email: user.data().email,
              };

              commit("setUserDetails", userDetails);
            });
        }

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
