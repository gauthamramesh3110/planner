<template>
  <v-form ref="registerForm">
    <v-text-field v-model="email" label="Email" :rules="emailRules" outlined></v-text-field>
    <v-text-field v-model="name" label="Name" :rules="nameRules" outlined></v-text-field>
    <v-text-field
      v-model="password"
      label="Password"
      :rules="passwordRules"
      type="password"
      outlined
    ></v-text-field>
    <v-text-field label="Retype Password" :rules="retypePasswordRules" type="password" outlined></v-text-field>
    <v-btn color="primary" @click="validateAndRegister" large depressed>Create Account</v-btn>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Register",

  data() {
    return {
      email: "",
      name: "",
      password: "",

      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 20 || "Name must be less than 10 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [v => !!v || "Password is required"],
      retypePasswordRules: [v => v == this.password || "Passwords don't match"]
    };
  },

  methods: {
    ...mapActions(["createUserWithEmailAndPassword"]),
    validateAndRegister() {
      let isValid = this.$refs.registerForm.validate();

      if (isValid) {
        let userDetails = {
          email: this.email,
          password: this.password,
          name: this.name
        };

        this.createUserWithEmailAndPassword(userDetails);
      }
    }
  }
};
</script>

<style>
</style>