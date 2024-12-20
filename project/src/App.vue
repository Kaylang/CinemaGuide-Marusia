<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheFooter from '@/components/TheFooter.vue';
import TheHeader from '@/components/TheHeader.vue';
import AppModal from '@/components/AppModal.vue';
import { getUser } from './utils/getUser';
import { onBeforeMount, onMounted, onUnmounted } from 'vue';
import { isDesktop } from './singltons/isDesktop';
import { useModalStore } from './stores/modal';

const modalStore = useModalStore();

const onResize = () => {
  isDesktop.value = window.innerWidth > 1024;
};

onMounted(() => {
  window.addEventListener('resize', onResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', onResize);
});

onBeforeMount(async () => {
  onResize();
  await getUser();
});
</script>

<template>
  <TheHeader />
  <RouterView />
  <TheFooter />
  <AppModal
    :is-modal-open="modalStore.getModalState()"
    @update:is-modal-open="modalStore.setModalState"
  />
</template>
