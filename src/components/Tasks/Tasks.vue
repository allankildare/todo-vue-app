<template>
  <div 
    v-if="tasksStore.getTasksLength > 0"
    class="tasks"
  >
    <list type="incomplete" />
    <list type="late" />
    <list type="complete" />
  </div>
  <div
    v-else
    class="empty text-center"
  >
    <main class="main-intro">
      <h1 class="text-h3">
        Hello
      </h1>
      <h2 class="text-h5">
        Welcome to To-Do App
      </h2>
      <p class="text-body-2 mb-3">
        A Vue application developed by Allan Kildare
      </p>
      <p class="text-body-1 font-weight-medium mb-2">
        Here you can save your tasks and complete them, as well as check if they are overdue
      </p>
      <p class="text-body-1 font-weight-medium">
        You don't have tasks yet, what do you think about creating one?
      </p>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useTasksStore } from '~/stores/useTasksStore'
import List from '~/components/List/List.vue'

export default defineComponent({
  name: 'Tasks',
  components: {
    List
  },
  setup() {
    const tasksStore = useTasksStore()

    onMounted(() => {
      tasksStore.populateTasks()
    })

    return { tasksStore }
  },
})
</script>

<style lang="scss" scoped>
// TO DO: responsive tasks list
$gray: #f3f3f5;
.empty {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  .main-intro {
    width: 60%;
    margin-bottom: 100px; /* forcing to go up */
  }
}

.tasks {
  height: 100vh;
  width: 100%;
  display: flex;
  padding: 1rem;
  padding-bottom: 0;
  background-color: $gray;

  & > div {
    width: 30%;
    height: 80vh;
  }
}

@media only screen and (max-width: 760px) and (min-width: 610px) {
  .empty {
  .main-intro {
    width: 600px;
    margin-bottom: 100px; /* forcing to go up */
  }
  }
}

@media only screen and (max-width: 609px) {
  .empty {
  .main-intro {
    width: 300px;
    margin-bottom: 100px; /* forcing to go up */
  }
  }
}

@media only screen and (max-width: 690px) {
  .tasks {
    height: auto;
    flex-direction: column;
    align-items: center;

  & > div {
    width: 90%;
    height: auto;
  }
}
}
</style>
