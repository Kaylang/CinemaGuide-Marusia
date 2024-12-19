<script lang="ts" setup>
import AppModal from './AppModal.vue';
import { useModalStore } from '@/stores/modal';

const modalStore = useModalStore();
modalStore.setModalType('trailer');
</script>

<template>
  <AppModal
    :is-modal-open="modalStore.getModalState()"
    @update:is-modal-open="modalStore.setModalState"
  />
</template>

<style lang="scss"></style>
