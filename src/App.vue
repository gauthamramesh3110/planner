<template>
  <div>
    <router-view v-if="!$vuetify.breakpoint.mobile"></router-view>
    <Error v-else></Error>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import Error from "./views/Error";

export default {
  name: "App",

  components: {
    Error,
  },

  methods: {
    ...mapActions(["initializeFirebase"])
  },

  created() {
    this.initializeFirebase();
  }
};
</script>
