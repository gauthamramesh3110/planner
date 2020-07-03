export default {
  firebaseConfig: (state) => {
    return state.firebaseConfig;
  },

  user: (state) => {
    return state.user;
  },

  calendars: (state) => {
    return state.calendars.map((calendar) => {
      return {
        id: calendar.id,
        name: calendar.data().name,
        color: calendar.data().color,
      };
    });
  },

  selectedCalendars: (state) => {
    return state.selectedCalendars;
  },

  taskCalendar: (state) => {
    return state.taskCalendar;
  },

  tasks: (state) => {
    let tasks = state.tasks.filter((task) => {
      return state.selectedCalendars.includes(task.data().calendarId);
    });

    return tasks;
  },
};
