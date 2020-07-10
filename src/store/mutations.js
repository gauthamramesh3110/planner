export default {
  setUser: (state, user) => {
    state.user = user;
  },

  setCalendars: (state, calendars) => {
    state.calendars = calendars;
    state.taskCalendar = {
      id: calendars[0].id,
      name: calendars[0].data().name,
      color: calendars[0].data().color,
    };
    console.log(state.taskCalendar);
    calendars.forEach((calendar) => {
      state.selectedCalendars.push(calendar.id);
    });
  },

  setTasks: (state, tasks) => {
    state.tasks = tasks;
  },

  setSelectedCalendars: (state, selectedCalendars) => {
    state.selectedCalendars = selectedCalendars;
  },

  setTaskCalendar: (state, taskCalendar) => {
    state.taskCalendar = taskCalendar;
  },

  addNewTask: (state, newTask) => {
    state.tasks.push(newTask);
  },

  deleteTask: (state, taskId) => {
    let filteredTask = state.tasks.filter((task) => {
      return task.id != taskId;
    });

    state.tasks = filteredTask;
  },

  editTask: (state, editedTask) => {
    state.tasks.forEach((task) => {
      if (task.id == state.editableTaskId) {
        task = editedTask;
      }
    });
  },

  //EDIT DIALOG MUTATIONS
  setEditDialogOpen: (state, val) => {
    state.editDialogOpen = val;
  },
  setEditableTaskId: (state, val) => {
    state.editableTaskId = val;
  },
  setEditableTaskName: (state, val) => {
    state.editableTaskName = val;
  },
  setEditableTaskStartDate: (state, val) => {
    state.editableTaskStartDate = val;
  },
  setEditableTaskStartTime: (state, val) => {
    state.editableTaskStartTime = val;
  },
  setEditableTaskEndDate: (state, val) => {
    state.editableTaskEndDate = val;
  },
  setEditableTaskEndTime: (state, val) => {
    state.editableTaskEndTime = val;
  },
};
