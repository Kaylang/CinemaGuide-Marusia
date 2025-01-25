<script lang="ts" setup>
import TheSpinner from '@/components/TheSpinner.vue';
import { ref } from 'vue';

const {} = defineProps<{
  srcString?: string;
  altString?: string;
  title?: string;
  classes?: string;
  isPoster?: boolean;
  isBig?: boolean;
  isSmall?: boolean;
}>();

const isLoading = ref<boolean>(true);
const isLoaded = ref<boolean>(false);
const isError = ref<boolean>(false);

const onLoad = () => {
  isLoading.value = false;
  isLoaded.value = true;
  isError.value = false;
};

const onError = () => {
  isLoading.value = false;
  isLoaded.value = false;
  isError.value = true;
};
</script>

<template>
  <template v-if="!srcString">
    <img
      class="image"
      :class="classes"
      :src="
        isPoster ? '../../images/no-poster.png' : '../../images/no-backdrop.png'
      "
    />
    <div v-if="isPoster" class="no-poster-title">
      {{ title }}
    </div>
  </template>
  <TheSpinner
    v-if="isLoading && srcString"
    :class="[
      { big: isBig },
      { small: isSmall },
      { medium: !isBig && !isSmall },
    ]"
  />
  <transition name="fade" appear>
    <img
      v-show="isLoaded"
      class="image"
      :class="classes"
      :src="srcString"
      :alt="altString"
      :title="altString"
      @load="onLoad"
      @error="onError"
    />
  </transition>
  <template v-if="isError">
    <img
      class="image"
      :class="classes"
      :src="
        isPoster
          ? '../../images/poster-loading-error.png'
          : '../../images/image-loading-error.png'
      "
    />
    <div class="no-poster-title">
      {{ title }}
    </div>
  </template>
</template>

<style lang="scss" scoped>
.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-poster,
.loading,
.error {
  padding: 12px;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.no-poster,
.error {
  position: relative;
  flex-direction: column;
  color: var(--content-secondary);

  p {
    text-align: center;

    &.middle {
      text-transform: uppercase;
    }
  }
  &-title {
    position: absolute;
    top: 20px;
    left: 50%;
    padding: 0 20px;
    width: 100%;
    text-align: center;
    font-weight: 700;
    color: var(--white);
    transform: translateX(-50%);
  }
}

.big {
  font-size: 48px;
  line-height: 56px;
  &.middle {
    font-size: 72px;
    line-height: 96px;
  }
}

.small {
  font-size: 24px;
  line-height: 28px;
  &.middle {
    font-size: 32px;
    line-height: 36px;
  }
}
</style>
