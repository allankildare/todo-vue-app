<template>
  <tasks />
  <v-btn dark color="blue darken-2" @click="toggleTaskModal" class="new-task">
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
  <task-modal :modalActive="taskModalActive" @close="toggleTaskModal">
    <div class="task-modal-content">
      <h1>Add task</h1>
      <p>Only some information is needed to add a task, let's go?</p>
      <v-form ref="form">
        <v-text-field v-model="model" :counter="max" label="Title" />
        
        <v-date-picker v-model="date" mode="dateTime" is24hr>
          <template v-slot="{ inputValue, inputEvents }">
            <v-text-field
              v-model="todayDate"
              :counter="max"
              :value="inputValue"
              v-on="inputEvents"
              title="Date to complete"
              single-line
              placeholder="Date to complete"
              prepend-inner-icon="mdi-calendar"
              readonly
            >
            </v-text-field>
          </template>
        </v-date-picker>

        <v-textarea label="Description"/>

        <v-btn color="primary">Add task</v-btn>
      </v-form>
    </div>
  </task-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  VSnackbar,
  VBtn,
  VMain,
  VApp,
  VInput,
  VForm,
  VTextField,
  VTextarea
} from "vuetify/components";
import HelloWorld from "./components/HelloWorld.vue";
import Tasks from "./components/Tasks/Tasks.vue";
import TaskModal from "~/components/TaskModal/TaskModal.vue";

export default defineComponent({
  name: "App",

  components: {
    HelloWorld,
    VSnackbar,
    VBtn,
    VMain,
    VApp,
    Tasks,
    TaskModal,
    VInput,
    VForm,
    VTextField,
    VTextarea
  },

  data() {
    return {
      snackbar: false,
      snackbarText: "Testando snackbar",
      timeout: 2000,
    };
  },

  setup() {
    const taskModalActive = ref(false);

    function toggleTaskModal() {
      taskModalActive.value = !taskModalActive.value;
    }

    return { taskModalActive, toggleTaskModal };
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
