<template>
  <v-list two-line light>
    <v-list-item>
      <v-list-item-avatar color="secondary darken-1" left>U</v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{userDetails.name}}</v-list-item-title>
        <v-list-item-subtitle>
          <span>Account Details</span>
          <v-icon class="ml-1" x-small>open_in_new</v-icon>
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn icon @click="signOut">
          <v-icon color="red">exit_to_app</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "User",

  methods: {
    ...mapActions(["signOut"])
  },

  computed: {
    ...mapGetters(["userDetails"])
  }
};
</script>

<style>
</style>