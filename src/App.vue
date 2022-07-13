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
        <v-text-field
          label="Title"
          v-model="taskForm.title"
          :rules="[rules.required, rules.minLength, rules.maxLength]"
          counter="50"
          maxLength="50"
        />

        <v-date-picker v-model="taskForm.date" mode="dateTime" is24hr>
          <template v-slot="{ inputValue, inputEvents }">
            <v-text-field
              v-model="taskForm.date"
              :rules="[rules.required]"
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

        <v-textarea
          v-model="taskForm.description"
          label="Description"
          :rules="[rules.required, rules.maxLength]"
          counter="1000"
          clearable
        />

        <v-btn color="primary" @click="submit">Add task</v-btn>
      </v-form>
    </div>
  </task-modal>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive, computed } from 'vue'
import {
  VSnackbar,
  VBtn,
  VMain,
  VApp,
  VInput,
  VForm,
  VTextField,
  VTextarea,
} from 'vuetify/components'
import Tasks from './components/Tasks/Tasks.vue'
import TaskModal from '~/components/TaskModal/TaskModal.vue'
import { useTasksStore } from '~/stores/useTasksStore'
// use vuelidate
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

export default defineComponent({
  name: 'App',

  components: {
    VSnackbar,
    VBtn,
    VMain,
    VApp,
    Tasks,
    TaskModal,
    VInput,
    VForm,
    VTextField,
    VTextarea,
  },

  setup() {
    // pendencies
    // 1. transform values into states
    // 2. create computed rules

    const tasksStore = useTasksStore()

    const taskModalActive = ref(false)

    function toggleTaskModal() {
      taskModalActive.value = !taskModalActive.value
    }

    return { taskModalActive, toggleTaskModal, tasksStore }
  },

  data() {
    return {
      snackbar: false,
      snackbarText: 'Testando snackbar',
      timeout: 2000,
      rules: {
        required: (value: string) => !!value || 'This field is required',
        maxLength: (value: string) =>
          (value || '').length <= 1000 ||
          'Description must be 1000 characters or less.',
        minLength: (value: string) =>
          value.length >= 2 || 'This field must have at least 2 characters',
      },
      taskForm: {
        title: '',
        date: '',
        description: '',
      },
    }
  },

  methods: {
    async submit() {
      const { title, date, description } = this.taskForm
      const tasksStore = useTasksStore()

      return tasksStore.addTask({
        title,
        date,
        description,
      })

      // pendencies
      // 3. clear form
      // this.$refs.form.reset()
      // 4. validate the entire form
    },
  },
})
</script>

<style lang="scss" scoped>
.new-task {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
}
</style>
