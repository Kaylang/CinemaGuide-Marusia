<script lang="ts" setup>
import IconOk from './icons/IconOk.vue';
import IconTelegram from './icons/IconTelegram.vue';
import IconVk from './icons/IconVk.vue';
import IconYoutube from './icons/IconYoutube.vue';
</script>

<template>
  <footer class="footer flex">
    <div class="footer__socials flex">
      <a class="footer__socials-link" src="#!">
        <IconVk />
      </a>
      <a class="footer__socials-link" src="#!">
        <IconYoutube />
      </a>
      <a class="footer__socials-link" src="#!">
        <IconOk />
      </a>
      <a class="footer__socials-link" src="#!">
        <IconTelegram />
      </a>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  margin: 0 auto;
  padding: 24px 20px;
  width: 100%;
  align-items: center;

  &__socials {
    align-items: center;
    column-gap: 24px;

    &-link {
      display: block;
    }

    &-link svg {
      width: 24px;
      height: 24px;
    }
  }
}

@media (min-width: 1024px) {
  .footer {
    padding: 42px 0;
    justify-content: flex-end;

    &__socials {
      &-link {
        cursor: pointer;
      }

      &-link svg {
        width: 36px;
        height: 36px;
      }
    }
  }
}
</style>
