<template>
  <v-container class="fill-height" fluid>
    <v-row style="height:10%" justify="center" align="center" no-gutters>
      <v-btn @click="$refs.calendar.prev()" icon>
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <span class="text-uppercase font-weight-bold grey--text text--darken-3">{{displayDate}}</span>
      <v-btn @click="$refs.calendar.next()" icon>
        <v-icon>keyboard_arrow_right</v-icon>
      </v-btn>
    </v-row>
    <v-row style="height:90%" no-gutters>
      <v-calendar
        type="month"
        v-model="calendarDate"
        :events="tasks"
        ref="calendar"
        color="primary"
        :event-color="getEventColor"
        @click:date="setSelectedDate"
      ></v-calendar>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Calendar",

  methods: {
    ...mapMutations(["setCalendarDate", "setSelectedDate"]),

    getEventColor(event) {
      return event.color;
    }
  },

  computed: {
    ...mapGetters(["tasks", "displayDate"]),

    calendarDate: {
      get() {
        return this.$store.state.calendarDate;
      },
      set(ISOYear) {
        this.setCalendarDate(ISOYear);
      }
    }
  },

  created() {
    let today = new Date();

    let year = today.getFullYear();
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let day = ("0" + today.getDate()).slice(-2);

    let ISODate = year + "-" + month + "-" + day;

    this.setCalendarDate(ISODate);
    this.setSelectedDate({ date: ISODate });
  }
};
</script>

<style>
</style>