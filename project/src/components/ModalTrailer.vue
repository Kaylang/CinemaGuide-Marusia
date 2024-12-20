<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import TheSpinner from './TheSpinner.vue';
import { onBeforeMount, ref, watch } from 'vue';
import { useTrailerStore } from '@/stores/trailer';
import { debounce } from '@/utils/debounce';
import { isDesktop } from '@/singltons/isDesktop';

const trailerStore = useTrailerStore();

const isLoading = ref<boolean>(true);
const frameWidth = ref<string>();
const frameHeight = ref<string>();
const player = ref();

const scriptTag = ref<HTMLScriptElement>();
const firstScriptTag = ref<HTMLElement>();

scriptTag.value = document.createElement('script');
if (scriptTag.value) scriptTag.value.src = 'https://www.youtube.com/iframe_api';

firstScriptTag.value = document.getElementsByTagName('script')[0];
firstScriptTag.value?.parentNode?.insertBefore(
  scriptTag.value,
  firstScriptTag.value,
);

if (scriptTag.value) {
  scriptTag.value.onload = () => {
    onYouTubeIframeAPIReadyDebounced({});
  };
}

const onFrameLoaded = (event: { target: { playVideo: () => void } }) => {
  const iFrame = player.value.getIframe();
  if (iFrame) iFrame.removeAttribute('style');
  isLoading.value = false;
  event.target.playVideo();
};

const onYouTubeIframeAPIReadyDebounced = debounce(
  onYouTubeIframeAPIReady,
  1000,
);

function onYouTubeIframeAPIReady() {
  if (window.YT) {
    player.value = new window.YT.Player('trailer', {
      height: frameHeight.value,
      width: frameWidth.value,
      frameborder: 0,
      // origin: window.location.origin,
      videoId: trailerStore.getMovieTrailerId(),
      events: {
        onReady: onFrameLoaded,
      },
    });
  }
}

const setFrameSize = () => {
  if (isDesktop.value) {
    frameWidth.value = '960';
    frameHeight.value = '540';
  } else {
    frameWidth.value = '375';
    frameHeight.value = '212';
  }
};

watch(isDesktop, () => {
  setFrameSize();
});

onBeforeMount(() => {
  setFrameSize();
});
</script>

<template>
  <div class="trailer flex">
    <div v-show="!isLoading" id="trailer"></div>
    <TheSpinner v-if="isLoading" :class="'big'" />
  </div>
</template>

<style lang="scss">
.trailer {
  position: relative;
  width: 1000px;
  height: 600px;
  align-items: center;
  justify-content: center;
}
</style>
