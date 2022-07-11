<template>
  <v-container class="task-type">
    <h1>{{ type }}</h1>
    <div v-for="item in tasks" :key="item" class="task">
      <h2>{{ item.name }}</h2>
      <span>{{ item.description }}</span>
      <p v-if="item.status === 'complete'">Completed</p>
      <p v-else-if="item.status === 'incomplete'">In progress</p>
      <p v-else>Late</p>
    </div>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import {
  VCard,
  VSnackbar,
  VBtn,
  VMain,
  VApp,
  VContainer,
} from "vuetify/components";

export default defineComponent({
  name: "List",
  props: {
    type: String,
  },
  components: {
    VApp,
    VCard,
    VContainer,
    VSnackbar,
    VBtn,
    VMain,
    VApp,
  },
  data: () => ({
    tasks: [
      {
        name: "Example 1",
        description: "Do some new projects (1)",
        date: "2022-07-18T04:08:01.745Z",
        status: "complete",
      },
      {
        name: "Example 2",
        description: "Do some new projects (2)",
        date: "2022-07-18T04:08:01.745Z",
        status: "late",
      },
      {
        name: "Example 3",
        description: "Do some new projects (3)",
        date: "2022-07-18T04:08:01.745Z",
        status: "incomplete",
      },
    ],
  }),
});
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
    -webkit-box-shadow: 5px 5px 15px -2px rgba(20,20,20,.2);
    box-shadow: 5px 5px 15px -2px rgba(20,20,20,.2);
  }
  .task:last-child {
    margin-bottom: 0;
  }
}
</style>