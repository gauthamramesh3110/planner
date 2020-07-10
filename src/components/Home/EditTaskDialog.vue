<template>
  <v-card>
    <v-card-title>Edit Task</v-card-title>
    <v-card-text>
      <v-container class="pa-0" fluid>
        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field v-model="editableTaskName" label="Task Name" outlined dense></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="6" class="pr-2">
            <v-menu
              v-model="startScheduleMenu"
              :close-on-content-click="false"
              transition="scale-transition"
            >
              <template v-slot:activator="{on, attrs}">
                <v-text-field
                  v-model="startSchedule"
                  label="Start Time"
                  v-bind="attrs"
                  v-on="on"
                  prepend-icon="schedule"
                  hint="YYYY-MM-DD  HH:mm"
                  persistent-hint
                  readonly
                ></v-text-field>
              </template>
              <v-date-picker v-if="openDate" v-model="editableTaskStartDate" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="openDate=false;">Next</v-btn>
              </v-date-picker>
              <v-time-picker v-else v-model="editableTaskStartTime" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="startScheduleMenu=false;openDate=true;">OK</v-btn>
              </v-time-picker>
            </v-menu>
          </v-col>
          <v-col cols="6" class="pl-2">
            <v-menu
              v-model="endScheduleMenu"
              :close-on-content-click="false"
              transition="scale-transition"
            >
              <template v-slot:activator="{on, attrs}">
                <v-text-field
                  v-model="endSchedule"
                  label="End Time"
                  v-bind="attrs"
                  v-on="on"
                  prepend-icon="schedule"
                  hint="YYYY-MM-DD  HH:mm"
                  persistent-hint
                  readonly
                ></v-text-field>
              </template>
              <v-date-picker v-if="openDate" v-model="editableTaskEndDate" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="openDate=false;">Next</v-btn>
              </v-date-picker>
              <v-time-picker v-else v-model="editableTaskEndTime" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="endScheduleMenu=false;openDate=true;">OK</v-btn>
              </v-time-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeEditDialog" text large depressed>Cancel</v-btn>
        <v-btn @click="save" color="primary" large depressed>Save</v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "EditTaskDialog",

  methods: {
    ...mapMutations([
      "setEditDialogOpen",
      "setEditableTaskName",
      "setEditableTaskStartDate",
      "setEditableTaskStartTime",
      "setEditableTaskEndDate",
      "setEditableTaskEndTime"
    ]),

    closeEditDialog() {
      this.setEditDialogOpen(false);
    },

    save() {
      console.log("save");
    }
  },

  data() {
    return {
      startScheduleMenu: false,
      endScheduleMenu: false,
      openDate: true
    };
  },

  computed: {
    editableTaskName: {
      get() {
        return this.$store.state.editableTaskName;
      },
      set(val) {
        this.setEditableTaskName(val);
      }
    },

    editableTaskStartDate: {
      get() {
        return this.$store.state.editableTaskStartDate;
      },
      set(val) {
        this.setEditableTaskStartDate(val);
      }
    },

    editableTaskStartTime: {
      get() {
        return this.$store.state.editableTaskStartTime;
      },
      set(val) {
        this.setEditableTaskStartTime(val);
      }
    },

    startSchedule() {
      return this.editableTaskStartDate + "  " + this.editableTaskStartTime;
    },

    editableTaskEndDate: {
      get() {
        return this.$store.state.editableTaskEndDate;
      },
      set(val) {
        this.setEditableTaskEndDate(val);
      }
    },

    editableTaskEndTime: {
      get() {
        return this.$store.state.editableTaskEndTime;
      },
      set(val) {
        this.setEditableTaskEndTime(val);
      }
    },

    endSchedule() {
      return this.editableTaskEndDate + "  " + this.editableTaskEndTime;
    }
  }
};
</script>

<style>
</style>