export default {
  setUser: (state, user) => {
    state.user = user;
  },

  setCalendars: (state, calendars) => {
    calendars.forEach((calendar) => {
      let convertedCalendar = {
        id: calendar.id,
        name: calendar.data().name,
        color: calendar.data().color,
      };
      state.calendars.push(convertedCalendar);
      state.selectedCalendars.push(calendar.id);
    });

    state.taskCalendar = state.calendars[0];
  },

  setTasks: (state, tasks) => {
    tasks.forEach((task) => {
      let convertedTask = {
        id: task.id,
        userId: task.data().userId,
        calendarId: task.data().calendarId,
        created: task.data().created.toDate(),
        name: task.data().name,
        completed: task.data().completed,
        start: task.data().start.toDate(),
        end: task.data().end.toDate(),
        subtasks: task.data().subtasks,
        color: task.data().color,
      };

      state.tasks.push(convertedTask);
    });
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

  editTask: (state) => {
    state.tasks.forEach((task) => {
      if (task.id == state.editableTaskId) {
        task.name = state.editableTaskName;
        task.start = new Date(
          state.editableTaskStartDate + " " + state.editableTaskStartTime
        );
        task.end = new Date(
          state.editableTaskEndDate + " " + state.editableTaskEndTime
        );
      }
    });
  },

  toggleCompleted: (state, taskId) => {
    state.tasks.forEach((task) => {
      if (task.id == taskId) {
        task.completed = !task.completed;
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

  //CALENDAR STATE MUTATIONS
  setCalendarDate: (state, val) => {
    state.calendarDate = val;

    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let date = new Date(val);
    let month = date.getMonth();
    let year = date.getFullYear();

    state.displayDate = months[month] + ", " + year;
  },

  setSelectedDate: (state, { date }) => {
    state.selectedDate = date;
  },
};
