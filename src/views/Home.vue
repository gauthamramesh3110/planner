<template>
  <v-app>
    <v-app-bar color="primary" flat dark app>
      <v-app-bar-nav-icon @click="navigationOpen = !navigationOpen"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer width="300" color="secondary" v-model="navigationOpen" dark app>
      <template v-slot:prepend>
        <User></User>
      </template>
      <v-divider class="secondary darken-1"></v-divider>
      <CalendarList></CalendarList>
      <template v-slot:append>
        <AddCalendar></AddCalendar>
      </template>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid class="fill-height pa-0">
        <v-row no-gutters class="fill-height">
          <v-col cols="8">
            <Calendar></Calendar>
          </v-col>
          <v-col cols="4" class="">
            <Tasks></Tasks>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import User from "../components/Home/User";
import CalendarList from "../components/Home/CalendarList";
import AddCalendar from "../components/Home/AddCalendar";
import Calendar from "../components/Home/Calendar";
import Tasks from "../components/Home/Tasks";

import { mapActions } from "vuex";

export default {
  name: "Home",

  components: {
    User,
    CalendarList,
    AddCalendar,
    Calendar,
    Tasks
  },

  data() {
    return {
      navigationOpen: true
    };
  },

  methods: {
    ...mapActions(["onAuthStateChanged", "getAllCalendarsAndTasks"])
  },

  created() {
    this.onAuthStateChanged("/");
  }
};
</script>

<style>
</style>