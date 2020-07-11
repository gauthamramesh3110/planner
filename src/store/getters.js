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

  taskCalendar: (state) => {
    return state.taskCalendar;
  },

  tasks: (state) => {
    let tasks = state.tasks.filter((task) => {
      return state.selectedCalendars.includes(task.calendarId);
    });

    return tasks;
  },

  taskById: (state) => (taskId) => {
    let task = state.tasks.filter((task) => {
      return task.id == taskId;
    });

    return task[0];
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

  //CALENDAR STATE GETTERS
  displayDate: (state) => {
    return state.displayDate;
  },

  selectedDate: (state) => {
    return state.selectedDate;
  },
};
