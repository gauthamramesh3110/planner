<template>
  <v-container class="pa-0">
    <!-- Header -->
    <v-row align="center" justify="center" class="my-5" no-gutters>
      <v-btn icon>
        <v-icon>tune</v-icon>
      </v-btn>
      <v-btn-toggle class="mx-2" mandatory>
        <v-btn width="100">Today</v-btn>
        <v-btn width="100">Selected</v-btn>
        <v-btn width="100">All</v-btn>
      </v-btn-toggle>
      <v-btn icon>
        <v-icon>sort</v-icon>
      </v-btn>
    </v-row>

    <!-- Add Task -->
    <v-row class="mx-7 mb-3" no-gutters>
      <v-col cols="12">
        <v-text-field
          append-icon="add"
          label="Add New Task"
          v-model="taskName"
          @keypress.enter="addNewTask(taskName)"
          @click:append="addNewTask(taskName)"
          :hint="taskCalendar.name ? taskCalendar.name : ''"
          persistent-hint
          dense
          outlined
        >
          <template v-slot:prepend>
            <v-menu offset-y>
              <template v-slot:activator="{on}">
                <v-icon :color="taskCalendar.color" v-on="on">event</v-icon>
              </template>
              <v-list>
                <v-list-item
                  v-for="(calendar, index) in calendars"
                  :key="index"
                  @click="setTaskCalendar(calendar)"
                >
                  <v-list-item-icon>
                    <v-icon :color="calendar.color">fiber_manual_record</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{calendar.name}}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-text-field>
      </v-col>
    </v-row>

    <!-- Task List -->
    <v-row class="mx-4" no-gutters>
      <v-col>
        <v-list>
          <v-list-group v-for="(task, index) in tasks" :key="index">
            <template v-slot:activator>
              <v-list-item-action>
                <v-checkbox
                  :color="task.color"
                  :input-value="task.completed"
                  @click.stop="toggleCompleted(task.id)"
                ></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title
                  :class="task.completed ? task.color + '--text text-decoration-line-through ' : task.color + '--text'"
                >
                  <span class="font-weight-bold">{{task.name}}</span>
                </v-list-item-title>
                <v-list-item-subtitle>{{displayDateRange(task.start, task.end)}}</v-list-item-subtitle>
              </v-list-item-content>
            </template>

            <v-list-item class="d-flex align-center justify-center" dense>
              <!-- Add Subtask -->
              <v-btn icon>
                <v-icon color="yellow darken-3">add_circle</v-icon>
              </v-btn>

              <!-- Edit Task -->
              <v-btn @click="openEditDialog(task)" icon>
                <v-icon color="blue darken-3">edit</v-icon>
              </v-btn>

              <!-- Delete Task -->
              <v-btn @click="deleteTask(task.id)" icon>
                <v-icon color="red darken-3">delete</v-icon>
              </v-btn>
            </v-list-item>

            <v-list-item v-for="(subtask, index) in task.subtasks" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{subtask.name}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-col>
    </v-row>

    <!-- Edit Task Dialog-->
    <v-dialog width="600" v-model="editDialogOpen">
      <EditTaskDialog></EditTaskDialog>
    </v-dialog>
  </v-container>
</template>

<script>
import EditTaskDialog from "./EditTaskDialog";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Tasks",

  components: {
    EditTaskDialog
  },

  data() {
    return {
      taskName: null
    };
  },

  methods: {
    ...mapMutations([
      "setTaskCalendar",
      "setEditDialogOpen",
      "setEditableTaskId",
      "setEditableTaskName",
      "setEditableTaskStartDate",
      "setEditableTaskStartTime",
      "setEditableTaskEndDate",
      "setEditableTaskEndTime"
    ]),
    ...mapActions(["addNewTask", "deleteTask", "toggleCompleted"]),

    displayDateRange(start, end) {
      let startString = start.toLocaleString([], {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
      });

      let endString = end.toLocaleString([], {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
      });

      return startString + " to " + endString;
    },

    getISOFormatDate(date) {
      let year = date.getFullYear();
      let month = ("0" + (date.getMonth() + 1)).slice(-2);
      let day = ("0" + date.getDate()).slice(-2);

      return year + "-" + month + "-" + day;
    },

    getISOFormatTime(date) {
      let hours = ("0" + date.getHours()).slice(-2);
      let minutes = ("0" + date.getMinutes()).slice(-2);

      return hours + ":" + minutes;
    },

    openEditDialog(task) {
      let startSchedule = task.start;
      let endSchedule = task.end;

      this.setEditDialogOpen(true);
      this.setEditableTaskId(task.id);
      this.setEditableTaskName(task.name);
      this.setEditableTaskStartDate(this.getISOFormatDate(startSchedule));
      this.setEditableTaskStartTime(this.getISOFormatTime(startSchedule));
      this.setEditableTaskEndDate(this.getISOFormatDate(endSchedule));
      this.setEditableTaskEndTime(this.getISOFormatTime(endSchedule));
    }
  },

  computed: {
    ...mapGetters(["tasks", "calendars", "taskCalendar"]),

    editDialogOpen: {
      get() {
        return this.$store.state.editDialogOpen;
      },
      set(val) {
        this.setEditDialogOpen(val);
      }
    }
  }
};
</script>

<style>
</style>