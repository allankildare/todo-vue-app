<template>
  <v-container class="task-type">
    <v-badge color="#050505" :content="state.tasks.length">
      <v-card class="py-2 pl-2 mb-3" color="#d4d4d4" width="180px">
        <h1 class="text-h5">{{ type }}</h1>
      </v-card>
    </v-badge>
    <div v-for="item in state.tasks" :key="item" class="task">
      <h2>{{ item.title }}</h2>
      <span>{{ item.description }}</span>
      <p v-if="item.status === 'complete'">Completed</p>
      <p v-else-if="item.status === 'incomplete'">In progress</p>
      <p v-else>Late</p>
    </div>
  </v-container>
</template>

<script>
import { defineComponent, onMounted, reactive } from 'vue'
import {
  VBadge,
  VCard,
  VSnackbar,
  VBtn,
  VMain,
  VApp,
  VContainer,
} from 'vuetify/components'
import { useStorage } from 'vue3-storage'

export default defineComponent({
  name: 'List',
  props: {
    type: String,
  },
  components: {
    VApp,
    VBadge,
    VCard,
    VContainer,
    VSnackbar,
    VBtn,
    VMain,
    VApp,
  },
  setup(props) {
    const state = reactive({
      tasks: [],
    })
    const storage = useStorage()

    // pendencies
    // treat case when tasks storage doesn't exist
    const tasksFromStorage = storage.getStorageSync('tasks')
    const tasksArr = JSON.parse(tasksFromStorage)
    const filteredTasks = tasksArr.filter(item => item.status === props.type)

    onMounted(() => {
      if (tasksArr.length > 0) state.tasks = filteredTasks
    })

    return { state }
  },
})
</script>

<style lang="scss" scoped>
$white: #fcfcfc;
$black: #050505;

.task-type {
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
    -webkit-box-shadow: 5px 5px 15px -2px rgba(20, 20, 20, 0.2);
    box-shadow: 5px 5px 15px -2px rgba(20, 20, 20, 0.2);
  }
  .task:last-child {
    margin-bottom: 0;
  }
}
</style>
