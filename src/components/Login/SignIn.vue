<template>
  <v-form>
    <v-text-field label="Email" v-model="userDetails.email" outlined></v-text-field>
    <v-text-field label="Password" v-model="userDetails.password" type="password" outlined></v-text-field>
    <v-btn large depressed @click="signInWithEmailAndPassword(userDetails)">Sign In</v-btn>
    <v-btn class="ml-4" large depressed text>Forgot Password?</v-btn>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SignIn",

  methods: {
    ...mapActions(["signInWithEmailAndPassword"])
  },

  data() {
    return {
      userDetails: {
        email: null,
        password: null
      }
    };
  }
};
</script>

<style>
</style>