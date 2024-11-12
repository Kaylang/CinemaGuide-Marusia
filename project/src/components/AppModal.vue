<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
  },
});
</script>

<template>
  <transition name="fade" apear>
    <div v-if="props.modelValue">
      <div :class="['modal', { active: props.modelValue }]">
        <div class="modal__wrapper">
          <button
            class="btn-white modal__close"
            type="button"
            @click="$emit('update:modelValue', false)"
          ></button>
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: grid;
  justify-content: center;
  align-items: center;
  background-color: var(--black50);
  z-index: 100;

  &__wrapper {
    position: relative;
  }

  &__close {
    position: absolute;
    top: 0;
    right: -72px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    transform: scale(1);
    transition: transform 0.3s ease-in-out;
    z-index: 110;
  }

  &__close::after,
  &__close::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 2px;
    background-color: var(--black);
  }
  &__close::after {
    transform: translate(-50%, -50%) rotateZ(45deg);
  }
  &__close::before {
    transform: translate(-50%, -50%) rotateZ(-45deg);
  }
}

@media (hover: hover) {
  .modal__close:hover {
    transform: scale(1.1);
  }
}
</style>
