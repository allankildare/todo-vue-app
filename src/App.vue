<template>
  <tasks />
  <v-btn dark color="blue darken-2" @click="snackbar = true" class="new-task">
    New task
  </v-btn>
  <v-snackbar v-model="snackbar" :timeout="timeout">
    {{ snackbarText }}
    <template v-slot:action="{ attrs }">
      <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { VSnackbar, VBtn, VMain, VApp } from "vuetify/components";
import HelloWorld from "./components/HelloWorld.vue";
import Tasks from "./components/Tasks/Tasks.vue";

export default defineComponent({
  name: "App",

  components: {
    HelloWorld,
    VSnackbar,
    VBtn,
    VMain,
    VApp,
    Tasks,
  },

  data() {
    return {
      snackbar: false,
      snackbarText: "Testando snackbar",
      timeout: 2000,
    };
  },
});
</script>

<style lang="scss" scoped>

.new-task {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
}
</style>
