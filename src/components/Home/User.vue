<template>
  <v-list two-line light>
    <v-list-item>
      <v-list-item-avatar color="secondary darken-1" left>U</v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>Username</v-list-item-title>
        <v-list-item-subtitle>Account Settings</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn icon @click="signOut">
          <v-icon>exit_to_app</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "User",

  methods: {
    ...mapActions(["signOut"])
  }
};
</script>

<style>
</style>