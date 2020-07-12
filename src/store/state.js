export default {
  firebaseConfig: {
    apiKey: "AIzaSyBLs03tjg-TijgS3pK6FWzF8SvE3p_ERas",
    authDomain: "planner-gr3922.firebaseapp.com",
    databaseURL: "https://planner-gr3922.firebaseio.com",
    projectId: "planner-gr3922",
    storageBucket: "planner-gr3922.appspot.com",
    messagingSenderId: "177876839702",
    appId: "1:177876839702:web:fbe1896ee34dc527ac7437",
    measurementId: "G-EQMN6YB4EN",
  },

  user: null,
  userDetails: {
    id: null,
    name: 'Username',
    email: 'Email'
  },

  calendars: [],
  tasks: [],
  selectedCalendars: [],
  taskCalendar: {
    id: null,
    name: null,
    color: null,
  },

  //EDIT DIALOG STATES
  editDialogOpen: false,
  editableTaskId: null,
  editableTaskName: null,
  editableTaskStartDate: null,
  editableTaskStartTime: null,
  editableTaskEndDate: null,
  editableTaskEndTime: null,

  //CALENDAR STATES
  calendarDate: "",
  displayDate: "",
  selectedDate: "",

  //ADD CALENDAR STATES
  calendarColors: [
    "redTask",
    "blueTask",
    "greenTask",
    "yellowTask",
    "greyTask",
  ],
};
