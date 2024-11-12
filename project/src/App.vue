<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheFooter from './components/TheFooter.vue';
import TheHeader from './components/TheHeader.vue';
import AuthForm from './components/AuthForm.vue';
import { isModalOpen } from './singltons/IsModalOpen';
import { updateModalStatus } from './utils/updateModalState';
</script>

<template>
  <TheHeader />
  <RouterView />
  <TheFooter />
  <AuthForm :is-open="isModalOpen" @update:is-open="updateModalStatus" />
</template>

<!--
<style scoped></style>
-->
