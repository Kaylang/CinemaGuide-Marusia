<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheFooter from '@/components/page-blocks/TheFooter.vue';
import TheHeader from '@/components/page-blocks/TheHeader.vue';
import AppModal from '@/components/modal/AppModal.vue';
import { getUser } from './utils/getUser';
import { onBeforeMount, onMounted, onUnmounted } from 'vue';
import { isDesktop } from './singltons/isDesktop';
import { useModalStore } from './stores/modal';
import { isUserLogged } from './utils/controlUserLS';

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
  if (isUserLogged()) await getUser();
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
