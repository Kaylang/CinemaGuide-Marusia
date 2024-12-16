<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheFooter from '@/components/TheFooter.vue';
import TheHeader from '@/components/TheHeader.vue';
import AppModal from '@/components/AppModal.vue';
import { isModalOpen } from '@/singltons/isModalOpen';
import { updateModalState } from '@/utils/updateModalState';
import { getUser } from './utils/getUser';
import { onBeforeMount, onMounted, onUnmounted } from 'vue';
import { isDesktop } from './singltons/isDesktop';

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
    :is-modal-open="isModalOpen"
    :type="'autorization'"
    @update:is-modal-open="updateModalState"
  />
</template>

<!--
<style scoped></style>
-->
