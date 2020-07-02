<template>
  <v-app>
    <v-main>
      <v-container class="fill-height pa-0" fluid>
        <v-row class="fill-height" no-gutters>
          <v-col cols="4">
            <v-btn-toggle class="mt-12 mb-7 mx-12" mandatory v-model="loginFunction">
              <v-btn>Sign In</v-btn>
              <v-btn>Register</v-btn>
            </v-btn-toggle>
            <v-window v-model="loginFunction" class="mt-5">
              <v-window-item class="px-12">
                <SignIn></SignIn>
              </v-window-item>
              <v-window-item class="px-12">
                <Register></Register>
              </v-window-item>
            </v-window>
          </v-col>
          <v-col cols="8" class="grey lighten-3"></v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SignIn from "../components/Login/SignIn";
import Register from "../components/Login/Register";

import { mapActions } from "vuex";

export default {
  name: "Login",

  components: {
    SignIn,
    Register
  },

  data() {
    return {
      loginFunction: 0
    };
  },

  methods: {
    ...mapActions(["onAuthStateChanged"])
  },

  created() {
    this.onAuthStateChanged('/login');
  }
};
</script>

<style>
</style>