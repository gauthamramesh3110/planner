export default {
  firebaseConfig: (state) => {
    return state.firebaseConfig;
  },

  user: (state) => {
    return state.user;
  },

  calendars: (state) => {
    return state.calendars;
  },

  selectedCalendars: (state) => {
    return state.selectedCalendars;
  },

  tasks: (state) => {
    let tasks = state.tasks.filter((task) => {
      return state.selectedCalendars.includes(task.data().calendarId);
    });

    return tasks;
  },
};
