<template>
  <div>
    <Error v-if="$vuetify.breakpoint.xs"></Error>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import Error from "./views/Error";

export default {
  name: "App",

  components: {
    Error
  },

  methods: {
    ...mapActions(["initializeFirebase"])
  },

  created() {
    this.initializeFirebase();
  }
};
</script>
