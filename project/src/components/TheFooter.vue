<script lang="ts" setup>
import IconCopyright from './icons/IconCopyright.vue';
import IconOk from './icons/IconOk.vue';
import IconTelegram from './icons/IconTelegram.vue';
import IconVk from './icons/IconVk.vue';
import IconYoutube from './icons/IconYoutube.vue';
</script>

<template>
  <footer class="footer flex">
    <div class="footer__copyright flex">
      <span class="footer__copyright-brand">LLC «Мультимедиа Визион»</span>
      <IconCopyright />
      <span class="footer__copyright-reserved">Все права защищены</span>
    </div>
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
  padding: 42px 0;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  line-height: 24px;

  &__copyright {
    align-items: center;
    column-gap: 12px;

    &-reserved {
      color: var(--white70);
      font-weight: normal;
    }
  }
  &__socials {
    align-items: center;
    column-gap: 24px;
  }
}
</style>
