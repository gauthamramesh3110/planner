export default {
    setUser: (state, user) => {
        state.user = user
    },

    setCalendars: (state, calendars) => {
        state.calendars = calendars
    },

    setTasks: (state, tasks) => {
        state.tasks = tasks
    },

    setSelectedCalendars: (state, selectedCalendars) => {
        state.selectedCalendars = selectedCalendars
    }
}