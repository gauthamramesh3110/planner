<template>
  <v-list dense>
    <v-list-item class="px-12" v-for="(calendar, index) in calendars" :key="index" light>
      <v-list-item-action class="mr-3">
        <v-checkbox v-model="selectedCalendars" :value="calendar.id" :color="calendar.color"></v-checkbox>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title :class="calendar.color + '--text'">{{calendar.name}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CalendarList",

  methods: {},

  data() {
    return {
      
    };
  },

  computed: {
    ...mapGetters(["calendars"]),
    selectedCalendars: {
      get(){
        return this.$store.state.selectedCalendars;
      },
      set(value){
        this.$store.commit('setSelectedCalendars', value)
      }
    }
  }
};
</script>

<style>
</style>