<script lang="ts" setup>
import type { TMovie } from '@/types/movie';
import { watch } from 'vue';

const props = defineProps<{
  isModalOpen: boolean;
  movie: TMovie;
}>();

const emit = defineEmits(['update:isModalOpen']);

const closeModal = () => {
  emit('update:isModalOpen', false);
};

watch(props, () => {});
</script>

<template>
  <div v-if="isModalOpen" @click="closeModal">
    <div :class="['overlay', { active: isModalOpen }]">
      <div class="overlay__wrapper" v-if="isModalOpen">
        <TheButton
          :btn-classes="'btn-close btn-close-auth'"
          :btn-type="'button'"
          @click="closeModal"
        ></TheButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
