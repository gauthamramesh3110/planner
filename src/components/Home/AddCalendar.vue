<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-btn @click="openAddCalendarDialog" icon>
          <v-icon color="grey darken-2">add</v-icon>
        </v-btn>
      </v-row>
      <v-row justify="center">
        <span class="font-weight-bold grey--text text--darken-2">ADD CAL</span>
      </v-row>
    </v-container>
    <v-dialog v-model="addCalendarDialogOpen" width="600">
      <v-card class="pb-3">
        <v-card-title>Add Calendar</v-card-title>
        <v-card-text>
          <v-row align="center" no-gutters>
            <v-col cols="1">
              <v-menu offset-y>
                <template v-slot:activator="{on}">
                  <v-btn v-on="on" icon>
                    <v-icon :color="selectedCalendarColor" large>fiber_manual_record</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(color, index) in calendarColors"
                    :key="index"
                    @click="setCalendarColor(color)"
                  >
                    <v-icon :color="color">fiber_manual_record</v-icon>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
            <v-col class="pr-2" cols="11">
              <v-text-field v-model="calendarName" label="Calendar Name" outlined hide-details></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="addCalendar([calendarName, selectedCalendarColor])">ADD</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "AddCalendar",

  data() {
    return {
      calendarName: null,
      addCalendarDialogOpen: false,
      selectedCalendarColor: "redTask"
    };
  },

  methods: {
    ...mapActions(["addCalendar"]),
    openAddCalendarDialog() {
      this.addCalendarDialogOpen = true;
    },
    setCalendarColor(color) {
      this.selectedCalendarColor = color;
    }
  },

  computed: {
    ...mapGetters(["calendarColors"])
  }
};
</script>

<style>
</style>