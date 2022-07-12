<template>
  <div class="tasks">
    <list type="Incomplete" />
    <list type="Complete" />
    <list type="Late" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { VSnackbar, VBtn, VMain, VApp, VContainer } from "vuetify/components"
import List from './../List/List.vue'

export default defineComponent({
  name: 'Tasks',
  components: {
    List,
    VApp,
    VContainer,
    VSnackbar,
    VBtn,
    VMain,
  }
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
    border-radius: 10px;
    height: 80vh;
  }
}
</style>