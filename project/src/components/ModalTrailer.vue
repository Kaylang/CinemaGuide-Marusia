<script lang="ts" setup>
import { isDesktop } from '@/singltons/isDesktop';
import { useTrailerStore } from '@/stores/trailer';
import { onBeforeMount, ref, watch } from 'vue';
import TheSpinner from './TheSpinner.vue';

const trailerStore = useTrailerStore();

const isLoading = ref<boolean>(true);
const frameWidth = ref<string>();
const frameHeight = ref<string>();
// const player = ref();

// const origin = location.origin;

const scriptTag = ref<HTMLScriptElement>();
const firstScriptTag = ref<HTMLElement>();

scriptTag.value = document.createElement('script');
if (scriptTag.value) scriptTag.value.src = 'https://www.youtube.com/iframe_api';

firstScriptTag.value = document.getElementsByTagName('script')[0];
firstScriptTag.value?.parentNode?.insertBefore(
  scriptTag.value,
  firstScriptTag.value,
);

scriptTag.value.onload = () => {
  isLoading.value = false;
  // console.log(scriptTag.value?.src);
  // onYouTubeIframeAPIReady();
  // console.log(player.value);
};

// let player;
// function onYouTubeIframeAPIReady() {
//   player.value = new YT.Player('trailer', {
//     height: frameHeight,
//     width: frameWidth,
//     videoId: trailerStore.getMovieTrailerId(),
//   });
// }

// console.log(trailerStore.getMovieTitle());
// console.log(trailerStore.getMovieTrailerId());

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
  <div class="trailer flex" id="trailer">
    <iframe
      v-show="!isLoading"
      id="player"
      type="text/html"
      :width="frameWidth"
      :height="frameHeight"
      :src="`http://www.youtube.com/embed/${trailerStore.getMovieTrailerId}?controls=0&autoplay=1`"
      frameborder="0"
    ></iframe>
    <TheSpinner v-if="isLoading" :class="'big'" />
  </div>
</template>

<style lang="scss">
.trailer {
  width: 1000px;
  height: 600px;
  align-items: center;
  justify-content: center;
}
</style>
