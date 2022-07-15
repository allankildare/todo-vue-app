<template>
  <transition name="modal-animation">
    <div
      v-show="modalActive"
      class="task-modal"
    >
      <transition name="modal-animation-inner">
        <div
          v-show="modalActive"
          class="modal-inner"
        >
          <!-- modal content -->
          <slot />
          <button
            type="button"
            class="close-button"
            title="Close tab"
            @click.stop="close"
          >
            <i
              class="
                mdi-close-circle mdi
                v-icon
                notranslate
                v-theme--light
                v-icon--size-large
              "
              aria-hidden="true"
            />
          </button>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TaskModal',
  
  props: {
    modalActive: {
      type: Boolean,
      default: false
    },
    newTask: {
      type: Boolean,
      default: false
    }
  },
  
  emits: ['close'],

  setup(props, { emit }) {
    function close() {
      emit('close')
    }

    return { close }
  },
})
</script>

<style lang="scss" scoped>
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.4s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-inner-enter-active {
  transition: all 0.4s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.modal-animation-inner-leave-active {
  transition: all 0.4s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-animation-inner-leave-to {
  transform: scale(0.8);
}

.task-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  background-color: rgba(20, 20, 20, 0.4);

  .modal-inner {
    position: relative;
    max-width: 640px;
    width: 80%;
    background-color: #fff;
    padding: 4rem 1rem;
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
}
</style>
