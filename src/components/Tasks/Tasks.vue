<template>
  <div class="tasks" v-if="!isTasksEmpty">
    <list type="incomplete" />
    <list type="late" />
    <list type="complete" />
  </div>
  <div v-else>
    <!-- temporary text -->
    <p>You don't have tasks yet</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTasksStore } from '~/stores/useTasksStore'
import List from './../List/List.vue'

export default defineComponent({
  name: 'Tasks',
  components: {
    List,
  },
  setup() {
    const tasksStore = useTasksStore()
    const isTasksEmpty = tasksStore.tasks.length
    return { isTasksEmpty }
  },
})
</script>

<style lang="scss" scoped>
$white: #fcfcfc;
$gray: #f3f3f5;
$black: #050505;
$orange: #e7883d;
$green: #3b9d78;

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
</style>
