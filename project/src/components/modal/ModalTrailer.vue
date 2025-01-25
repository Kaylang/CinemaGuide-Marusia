<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import TheSpinner from '@/components/TheSpinner.vue';
import { ref, watch } from 'vue';
import { useTrailerStore } from '@/stores/trailer';
import { debounce } from '@/utils/debounce';
import { isDesktop } from '@/singltons/isDesktop';
import IconPlay from '../icons/iconPlay.vue';
import IconPause from '../icons/iconPause.vue';

const trailerStore = useTrailerStore();

const isLoading = ref<boolean>(true);
const frameWidth = ref<string>();
const frameHeight = ref<string>();
const player = ref();
const isPaused = ref<boolean>(false);
const isShowControl = ref<boolean>(false);

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

const onFrameLoaded = () => {
  const iFrame = player.value.getIframe();
  if (iFrame) iFrame.removeAttribute('style');
  isLoading.value = false;
  player.value.playVideo();
};

const onYouTubeIframeAPIReadyDebounced = debounce(
  onYouTubeIframeAPIReady,
  1000,
);

const handlerFrameOnClick = () => {
  const playerState: number = player.value.getPlayerState();
  if (playerState === 1) {
    player.value.pauseVideo();
    isPaused.value = true;
  }
  if (playerState === 2) {
    player.value.playVideo();
    isPaused.value = false;
  }
};

const handlerMouseEnter = () => {
  isShowControl.value = true;
};
const handlerMouseLeave = () => {
  isShowControl.value = false;
};

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

watch(
  isDesktop,
  () => {
    setFrameSize();
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <div class="trailer flex">
    <div
      class="trailer__over"
      @click="handlerFrameOnClick"
      @mouseenter="handlerMouseEnter"
      @mouseleave="handlerMouseLeave"
    >
      <div
        class="trailer__over-control"
        :class="[{ visible: isShowControl }, { hidden: !isShowControl }]"
      >
        <IconPlay v-show="isPaused" />
        <IconPause v-show="!isPaused" />
      </div>
      <div
        class="trailer__over-title"
        :class="[{ visible: isShowControl }, { hidden: !isShowControl }]"
      >
        {{ trailerStore.getMovieTitle() }}
      </div>
    </div>
    <div v-show="!isLoading" id="trailer"></div>
    <TheSpinner v-if="isLoading" :class="isDesktop ? 'big' : 'medium'" />
  </div>
</template>

<style lang="scss" scoped>
.trailer {
  position: relative;
  width: 375px;
  height: 212px;
  align-items: center;
  justify-content: center;

  &__over {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;

    &-title {
      position: absolute;

      left: 0px;
      right: 0px;
      bottom: 0px;
      padding: 24px 40px;
      font-weight: 700;
      background-color: var(--black);
    }
    &-control {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 64px;
      height: 64px;
      transform: translate(-50%, -50%);
      // opacity: 0;
      transition: opacity 0.3s ease-in-out;
      z-index: 200;
      & svg {
        width: 64px;
        height: 64px;
      }
    }
  }
}

.hidden {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.visible {
  opacity: 1;
}

@media (min-width: 1024px) {
  .trailer {
    width: 960px;
    height: 540px;

    &__over {
      &-title {
        left: 20px;
        right: 20px;
        bottom: 24px;
        font-size: 24px;
        line-height: 32px;
        background-color: var(--black50);
      }
      &-control {
        width: 80px;
        height: 80px;
        & svg {
          width: 80px;
          height: 80px;
        }
      }
    }
  }
}
</style>
