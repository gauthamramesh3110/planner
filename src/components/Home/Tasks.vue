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
          :hint="taskCalendar.name ? taskCalendar.name : ''"
          persistent-hint
          dense
          outlined
        >
          <template v-slot:prepend>
            <v-menu offset-y>
              <template v-slot:activator="{on}">
                <v-icon v-on="on">calendar_today</v-icon>
              </template>
              <v-list>
                <v-list-item
                  v-for="(calendar, index) in calendars"
                  :key="index"
                  @click="setTaskCalendar(calendar)"
                >
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
                <v-checkbox></v-checkbox>
              </v-list-item-action>
              <v-list-item-title>{{task.data().name}}</v-list-item-title>
            </template>
            <v-list-item v-for="(subtask, index) in task.data().subtasks" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{subtask.name}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Tasks",

  data() {
    return {
      taskName: null
    };
  },

  methods: {
    ...mapMutations(["setTaskCalendar",]),
    ...mapActions(["addNewTask"])
  },

  computed: {
    ...mapGetters(["tasks", "calendars", "taskCalendar"])
  }
};
</script>

<style>
</style>