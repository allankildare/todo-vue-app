<template>
  <v-container class="task-type">
    <v-badge
      color="#050505"
      :content="filteredTasks.length"
    >
      <v-card
        class="py-2 pl-2 mb-3"
        color="#d4d4d4"
        width="180px"
      >
        <h1 class="text-h5">{{ type }}</h1>
      </v-card>
    </v-badge>
    <div class="tasks-list">
      <div
        v-for="item in filteredTasks"
        :key="item"
        class="task"
      >
        <div class="d-flex flex-row justify-space-between align-center">
          <p
            v-if="item.status === 'complete'"
            class="font-italic"
          >
            Completed
          </p>
          <p
            v-else-if="item.status === 'incomplete' && !isTaskLate(item.date)"
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
          <v-btn
            v-if="item.status !== 'complete'"
            color="success"
            size="small"
            @click="tasksStore.completeTask(item.id)"
          >
            <span class="text-black">Complete</span>
          </v-btn>
        </div>
        
        
        <h2 class="text-truncate">
          {{ item.title }}
        </h2>
        <p>{{ item.description }}</p>
      </div>
    </div>
  </v-container>
</template>

<script>
import { defineComponent, onMounted, reactive, computed } from 'vue'
import {
  VBadge,
  VCard,
  VSnackbar,
  VBtn,
  VMain,
  VApp,
  VContainer,
  VCheckbox,
  VHover,
} from 'vuetify/components'
import { isTaskLate } from '~/helpers/validateDate'
import { useTasksStore } from '~/stores/useTasksStore'

export default defineComponent({
  name: 'List',
  components: {
    VBadge,
    VCard,
    VContainer,
    VSnackbar,
    VBtn,
    VMain,
    VApp,
    VCheckbox,
    VHover,
  },

  props: {
    type: {
      type: String,
      default: ''
    },
  },
  

  setup(props) {
    const tasksStore = useTasksStore()
    
    const filteredTasks = computed(() => {
      // checking type and returning filtered lists
      if (props.type === 'incomplete') {
        return tasksStore.tasks.filter(item => !isTaskLate(item.date) && item.status === 'incomplete')
      }

      if (props.type === 'late') {
        return tasksStore.tasks.filter(item => isTaskLate(item.date) && item.status === 'incomplete')
      }

      return tasksStore.tasks.filter(item => item.status === 'complete')
    })

    onMounted(() => {
      tasksStore.populateTasks()
    })

    return { tasksStore, filteredTasks, isTaskLate }
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
</style>
