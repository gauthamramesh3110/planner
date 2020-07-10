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

  //EDIT DIALOG STATE GETTERS
  editableTaskId: (state) => {
    return state.editableTaskId;
  },
  editableTaskName: (state) => {
    return state.editableTaskName;
  },
  editableTaskStartDate: (state) => {
    return state.editableTaskStartDate;
  },
  editableTaskStartTime: (state) => {
    return state.editableTaskStartTime;
  },
  editableTaskEndDate: (state) => {
    return state.editableTaskEndDate;
  },
  editableTaskEndTime: (state) => {
    return state.editableTaskEndTime;
  },
};
