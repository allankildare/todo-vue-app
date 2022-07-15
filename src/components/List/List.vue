<template>
  <v-container class="task-type">
    <!-- TO DO: when click in the tasks open taskModal, user can edit -->
    <v-badge
      color="#050505"
      :content="filteredTasks.length"
    >
      <v-card
        class="py-2 pl-2 mb-3"
        color="#d4d4d4"
        width="180px"
      >
        <h1 class="text-h5 text-capitalize">
          {{ type === 'incomplete' ? 'In progress' : capitalizeFirstLetter(type) }}
        </h1>
      </v-card>
    </v-badge>
    <div class="tasks-list">
      <div
        v-for="task in filteredTasks"
        :key="task.id"
        class="task"
      >
        <p
          v-if="task.status === 'complete'"
          class="font-italic"
        >
          Completed
        </p>
        <p
          v-else-if="task.status === 'incomplete' && !isTaskLate(task.date)"
          class="font-italic"
        >
          In progress
        </p>
        <p
          v-else
          class="font-italic"
        >
          Late
        </p>
        <h2 class="text-truncate">
          {{ task.title }}
        </h2>
        <p
          class="task-description"
          @click="openModal(task.id)"
        >
          {{ task.description }}
        </p>

        <div class="d-flex flex-row justify-end align-center">
          <v-btn
            v-if="task.status !== 'complete'"
            icon="mdi-check"
            color="success"
            size="small"
            title="Complete task"
            class="mr-2"
            @click="tasksStore.completeTask(task.id)"
          />

          <v-btn
            icon="mdi-delete"
            color="error"
            size="small"
            title="Delete task"
            @click="tasksStore.deleteTask(task.id)"
          />
        </div>
      </div>
      <task-modal
        :modal-active="taskModalActive"
        @close="toggleTaskModal"
      >
        <div v-if="state.editable === false">
          <h1>{{ taskForModal.title }}</h1>
          <span
            class="font-italic"
            :title="formatDate(taskForModal.date)"
          >
            {{ timeFromNow(taskForModal.date) }}
          </span>
          <p>{{ taskForModal.description }}</p>
          <v-btn
            v-if="taskForModal.status !== 'complete'"
            icon="mdi-pencil"
            color="black"
            size="small"
            title="Edit task"
            class="mr-2"
            @click="editTask"
          />
        </div>

        <div v-else-if="state.editable === true">
          <v-form ref="form">
            <h1>Edit task</h1>
            <span class="font-italic">The current date of this task is:
              <strong>{{ taskForModal.title }}</strong>
            </span>
            <v-text-field
              v-model="state.taskEditForm.title"
              label="Title"
              counter="50"
              max-length="50"
            />

            <span class="font-italic">
              The current date of this task is:
              {{ formatDate(taskForModal.date) }}
            </span>

            <v-date-picker
              v-model="state.taskEditForm.date"
              mode="dateTime"
              is24hr
            >
              <template #default="{ inputValue, inputEvents }">
                <v-text-field
                  v-model="state.taskEditForm.date"
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
              v-model="state.taskEditForm.description"
              label="Description"
              counter="1000"
              clearable
            />

            <v-btn
              color="primary"
              @click="submit(task.id)"
            >
              Edit task
            </v-btn>
          </v-form>
        </div>
      </task-modal>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref } from 'vue'
import { capitalizeFirstLetter } from '~/helpers/capitalizeFirstLetter'
import TaskModal from '~/components/TaskModal/TaskModal.vue'

import {
  VBadge,
  VCard,
  VBtn,
  VContainer,
  VTextField,
  VForm,
  VTextarea,
} from 'vuetify/components'

import { isTaskLate, timeFromNow, formatDate } from '~/helpers/validateDate'
import { useTasksStore } from '~/stores/useTasksStore'

export default defineComponent({
  name: 'List',
  components: {
    VBadge,
    VCard,
    VContainer,
    VBtn,
    TaskModal,
    VTextField,
    VForm,
    VTextarea,
  },

  props: {
    type: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const state = reactive({
      editable: false,
      taskEditForm: {
        title: '',
        date: '',
        description: '',
      },
    })

    const taskForModal = reactive({
      title: '',
      date: '',
      description: '',
      status: ''
    })

    const tasksStore = useTasksStore()

    const taskModalActive = ref(false)

    function toggleTaskModal() {
      taskModalActive.value = !taskModalActive.value
      if (state.editable) state.editable = !state.editable
    }

    async function openModal(id: number) {
      const task = await tasksStore.findTask(id)
      
      if(task) {
        taskForModal.title = task.title
        taskForModal.date = task.date
        taskForModal.description = task.description
        taskForModal.status = task.status
      }

      if (!taskModalActive.value) taskModalActive.value = !taskModalActive.value
    }

    function editTask() {
      state.editable = !state.editable
    }

    async function submit(id: number) {
      const updatedDate = state.taskEditForm.date ? state.taskEditForm.date : ''
      tasksStore.editTask({
        id,
        title: state.taskEditForm.title,
        description: state.taskEditForm.description,
        date: updatedDate,
      })
      state.editable = !state.editable
    }

    const filteredTasks = computed(() => {
      // checking type and returning filtered lists
      if (props.type === 'incomplete') {
        return tasksStore.tasks.filter(
          item => !isTaskLate(item.date) && item.status === 'incomplete'
        )
      }

      if (props.type === 'late') {
        return tasksStore.tasks.filter(
          item => isTaskLate(item.date) && item.status === 'incomplete'
        )
      }

      return tasksStore.tasks.filter(item => item.status === 'complete')
    })

    return {
      capitalizeFirstLetter,
      editTask,
      filteredTasks,
      formatDate,
      isTaskLate,
      openModal,
      state,
      submit,
      taskForModal,
      taskModalActive,
      tasksStore,
      timeFromNow,
      toggleTaskModal,
    }
  },
})
</script>

<style lang="scss" scoped>
$white: #fcfcfc;
$black: #050505;

.task-type {
  .tasks-list {
    overflow-y: auto;
    overflow-x: hidden;
    height: calc(100% - 1rem);
    max-height: calc(100% - 1rem);
  }
  & > h1 {
    background-color: #333;
    color: $white;
    padding-left: 1rem;
    border-radius: 10px;
    margin-bottom: 1rem;
  }

  .task {
    border-radius: 10px;
    background-color: #fcfcfc;
    padding: 1rem;
    margin-bottom: 1rem;

    & > p {
      overflow-wrap: break-word;
      hyphens: auto;
      word-wrap: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      max-height: 120px; /* max of 5 lines*/
      cursor: pointer;
    }

    .complete-button {
      margin: 1rem 0 0 auto;
    }

    -webkit-box-shadow: 5px 5px 15px -2px rgba(20, 20, 20, 0.2);
    box-shadow: 5px 5px 15px -2px rgba(20, 20, 20, 0.2);
  }
  .task:last-child {
    margin-bottom: 0;
  }
}

@media only screen and (max-width: 690px) {
  .task-type {
    .tasks-list {
      overflow-y: auto;
      overflow-x: hidden;
      height: calc(100% - 1rem);
      max-height: calc(100% - 1rem);
    }
    & > h1 {
      background-color: #333;
      color: $white;
      padding-left: 1rem;
      border-radius: 10px;
      margin-bottom: 1rem;
    }

    .task {
      border-radius: 10px;
      background-color: #fcfcfc;
      padding: 1rem;
      margin-bottom: 1rem;

      & > p {
        overflow-wrap: break-word;
        hyphens: auto;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        max-height: 120px; /* max of 5 lines*/
        cursor: pointer;
      }

      .complete-button {
        margin: 1rem 0 0 auto;
      }

      -webkit-box-shadow: 5px 5px 15px -2px rgba(20, 20, 20, 0.2);
      box-shadow: 5px 5px 15px -2px rgba(20, 20, 20, 0.2);
    }
    .task:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
