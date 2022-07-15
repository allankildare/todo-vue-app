<template>
  <tasks />
  <v-btn
    dark
    color="blue darken-2"
    class="new-task"
    @click="toggleTaskModal"
  >
    New task
  </v-btn>
  <v-snackbar
    v-model="snackbar.isActive"
    :timeout="timeout"
  >
    {{ snackbar.text }}
    <template #action="{ attrs }">
      <v-btn
        color="blue"
        text
        v-bind="attrs"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
  <task-modal
    :modal-active="taskModalActive"
    @close="toggleTaskModal"
  >
    <div class="task-modal-content">
      <h1>Add task</h1>
      <p>Only some information is needed to add a task, let's go?</p>
      <v-form ref="form">
        <v-text-field
          v-model="taskForm.title"
          label="Title"
          :rules="[rules.required, rules.minLength, rules.maxLength]"
          counter="50"
          max-length="50"
        />

        <v-date-picker
          v-model="taskForm.date"
          mode="dateTime"
          is24hr
        >
          <template #default="{ inputValue, inputEvents }">
            <v-text-field
              v-model="taskForm.date"
              :rules="[rules.required]"
              :counter="max"
              :value="inputValue"
              title="Date to complete"
              single-line
              placeholder="Date to complete"
              prepend-inner-icon="mdi-calendar"
              readonly
              v-on="inputEvents"
            />
          </template>
        </v-date-picker>

        <v-textarea
          v-model="taskForm.description"
          label="Description"
          :rules="[rules.required, rules.maxLength]"
          counter="1000"
          clearable
        />
        <p
          v-if="error.isError"
          class="text-body-1 text-red"
        >
          {{ error.message }}
        </p>

        <v-btn
          color="primary"
          @click="submit"
        >
          Add task
        </v-btn>
      </v-form>
    </div>
  </task-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import {
  VSnackbar,
  VBtn,
  VForm,
  VTextField,
  VTextarea,
} from 'vuetify/components'
import Tasks from './components/Tasks/Tasks.vue'
import TaskModal from '~/components/TaskModal/TaskModal.vue'
import { useTasksStore } from '~/stores/useTasksStore'
import { isTaskLate } from '~/helpers/validateDate'

export default defineComponent({
  name: 'App',

  components: {
    VSnackbar,
    VBtn,
    Tasks,
    TaskModal,
    VForm,
    VTextField,
    VTextarea,
  },

  setup() {
    const taskForm = reactive({
      title: '',
      date: '',
      description: '',
    })

    const error = reactive({
      isError: false,
      message: '',
    })

    const errorText = {
      required: 'All fields are required',
      invalidDate: 'You should put a date in the future',
      title: 'Title should have at least 2 characters',
    }

    const tasksStore = useTasksStore()

    const taskModalActive = ref(false)

    function toggleTaskModal() {
      taskModalActive.value = !taskModalActive.value
    }

    const snackbar = reactive({
      isActive: false,
      text: 'Task has been saved',
    })

    async function submit() {
      const { title, date, description } = taskForm
      const tasksStore = useTasksStore()

      // validate
      if (!title || !date || !description) {
        error.isError = true
        error.message = errorText.required
      } else if (title.length < 2) {
        error.isError = true
        error.message = errorText.title
      } else if (isTaskLate(date)) {
        error.isError = true
        error.message = errorText.invalidDate
      } else {
        // add to tasks store
        await tasksStore.addTask({
          title,
          date,
          description,
        })
        // clean form
        taskForm.title = ''
        taskForm.date = ''
        taskForm.description = ''

        // close modal
        toggleTaskModal()

        // trigger snackbar
        snackbar.isActive = !snackbar.isActive
      }
    }

    return {
      error,
      snackbar,
      submit,
      taskForm,
      taskModalActive,
      tasksStore,
      timeout: 2000,
      toggleTaskModal,
    }
  },

  data() {
    return {
      rules: {
        required: (value: string) => !!value || 'This field is required',
        maxLength: (value: string) =>
          (value || '').length <= 1000 ||
          'Description must be 1000 characters or less.',
        minLength: (value: string) =>
          value.length >= 2 || 'This field must have at least 2 characters',
      },
    }
  },
})
</script>

<style lang="scss" scoped>
.new-task {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
}
</style>
