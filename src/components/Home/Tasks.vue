<template>
  <v-container class="pa-0">
    <!-- Header -->
    <v-row align="center" justify="center" class="my-5" no-gutters>
      <v-btn icon>
        <v-icon>tune</v-icon>
      </v-btn>
      <v-btn-toggle class="mx-2" mandatory>
        <v-btn width="90">Today</v-btn>
        <v-btn width="90">Selected</v-btn>
        <v-btn width="90">All</v-btn>
      </v-btn-toggle>
      <v-btn icon>
        <v-icon>sort</v-icon>
      </v-btn>
    </v-row>

    <!-- Add Task -->
    <v-row class="mx-4" no-gutters>
      <v-col col="4" class="mr-2">
        <v-select label="Calendar" :items="calendars"  item-text="data().name" outlined dense hide-details>
        </v-select>
      </v-col>
      <v-col cols="8">
        <v-text-field append-icon="add" label="Add Task" outlined dense></v-text-field>
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
import { mapGetters } from "vuex";

export default {
  name: "Tasks",

  computed: {
    ...mapGetters(["tasks", "calendars"])
  }
};
</script>

<style>
</style>