<script lang="ts" setup>
import IconOk from './icons/IconOk.vue';
import IconTelegram from './icons/IconTelegram.vue';
import IconVk from './icons/IconVk.vue';
import IconYoutube from './icons/IconYoutube.vue';
</script>

<template>
  <footer class="footer flex">
    <div class="footer__socials flex">
      <IconVk />
      <IconYoutube />
      <IconOk />
      <IconTelegram />
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  margin: 0 auto;
  padding: 42px 0;
  width: 100%;
  align-items: center;
  justify-content: flex-end;

  &__socials {
    align-items: center;
    column-gap: 24px;
  }
}
</style>
