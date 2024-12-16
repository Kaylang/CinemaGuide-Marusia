<template>
  <div class="spinner grid">
    <div class="spinner__wrapper anim"></div>
  </div>
</template>

<style lang="scss">
.big {
  @extend .spinner;
  $border-width: 4px;
  $basic-spinner-dimensions: 250px;
  $main-spinner-dimensions: $basic-spinner-dimensions - $border-width * 2;
  $small-spinner-dimensions: $main-spinner-dimensions * 0.7;
  .spinner {
    &__wrapper {
      width: $basic-spinner-dimensions;
      height: $basic-spinner-dimensions;

      &:before,
      &:after {
        border-width: $border-width;
      }

      &.anim {
        &:before {
          width: $main-spinner-dimensions;
          height: $main-spinner-dimensions;
        }

        &:after {
          top: calc(($main-spinner-dimensions - $small-spinner-dimensions) / 2);
          left: calc(
            ($main-spinner-dimensions - $small-spinner-dimensions) / 2
          );
          width: $small-spinner-dimensions;
          height: $small-spinner-dimensions;
        }
      }
    }
  }
}

.small {
  @extend .spinner;
  $border-width: 1px;
  $basic-spinner-dimensions: 35px;
  $main-spinner-dimensions: $basic-spinner-dimensions - $border-width * 2;
  $small-spinner-dimensions: $main-spinner-dimensions * 0.7;
  .spinner {
    &__wrapper {
      width: $basic-spinner-dimensions;
      height: $basic-spinner-dimensions;

      &:before,
      &:after {
        border-width: $border-width;
      }

      &.anim {
        &:before {
          width: $main-spinner-dimensions;
          height: $main-spinner-dimensions;
        }

        &:after {
          top: calc(($main-spinner-dimensions - $small-spinner-dimensions) / 2);
          left: calc(
            ($main-spinner-dimensions - $small-spinner-dimensions) / 2
          );
          width: $small-spinner-dimensions;
          height: $small-spinner-dimensions;
        }
      }
    }
  }
}

.medium {
  @extend .spinner;
  $border-width: 2px;
  $basic-spinner-dimensions: 125px;
  $main-spinner-dimensions: $basic-spinner-dimensions - $border-width * 2;
  $small-spinner-dimensions: $main-spinner-dimensions * 0.7;
  .spinner {
    &__wrapper {
      width: $basic-spinner-dimensions;
      height: $basic-spinner-dimensions;

      &:before,
      &:after {
        border-width: $border-width;
      }

      &.anim {
        &:before {
          width: $main-spinner-dimensions;
          height: $main-spinner-dimensions;
        }

        &:after {
          top: calc(($main-spinner-dimensions - $small-spinner-dimensions) / 2);
          left: calc(
            ($main-spinner-dimensions - $small-spinner-dimensions) / 2
          );
          width: $small-spinner-dimensions;
          height: $small-spinner-dimensions;
        }
      }
    }
  }
}

.spinner {
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  &__wrapper {
    position: relative;

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      border-style: solid;
      border-radius: 50%;
    }

    &.anim {
      @keyframes rotate-animation {
        0% {
          transform: rotate(0deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes anti-rotate-animation {
        0% {
          transform: rotate(0deg);
        }

        100% {
          transform: rotate(-360deg);
        }
      }

      &:before {
        top: 0px;
        left: 0px;
        border-bottom-color: var(--content-disabled);
        border-right-color: var(--content-disabled);
        border-top-color: transparent;
        border-left-color: transparent;
        animation: rotate-animation 1.5s linear 0s infinite;
      }

      &:after {
        border-bottom-color: var(--content-disabled);
        border-right-color: var(--content-disabled);
        border-top-color: transparent;
        border-left-color: transparent;
        animation: anti-rotate-animation 1.15s linear 0s infinite;
      }
    }
  }
}
</style>
