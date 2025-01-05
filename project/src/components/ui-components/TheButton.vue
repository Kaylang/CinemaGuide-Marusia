<script lang="ts" setup>
import type { TButtonType } from '@/types/components';

const { btnType, btnClasses } = defineProps<{
  btnClasses?: string;
  btnType?: TButtonType;
}>();
</script>

<template>
  <button class="btn" :class="btnClasses" :type="btnType">
    <slot></slot>
  </button>
</template>

<style lang="scss">
.btn {
  margin: 0;
  padding: 0;
  cursor: pointer;
  transition-property: color, border-color, background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  border: none;
  outline: none;

  &-link {
    font-size: 24px;
    line-height: 32px;
    color: var(--white);
    background-color: transparent;
    border-bottom: 1.5px solid transparent;
    transition: 0.3s border-bottom-color ease-in-out;
  }
  &-primary,
  &-secondary,
  &-white {
    padding: 16px 48px;
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
    border-radius: 28px;
    border: 1px solid transparent;
    outline: none;
  }

  &-primary,
  &-secondary {
    color: var(--white);
  }

  &-white {
    position: relative;
    color: var(--black);
    background-color: var(--white);
  }

  &-white::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    width: 100%;
    background-color: var(--black);
    transform: scaleX(0);
    transition: transform 0.2s ease-in-out;
  }

  &-primary {
    background-color: var(--btn-primary);
    outline-color: transparent;
    border-color: var(--btn-primary);
  }

  &-secondary {
    border: 1px solid var(--btn-secondary);
    background-color: var(--btn-secondary);
    outline-color: transparent;
    border-color: var(--btn-secondary);
  }

  &-primary:focus,
  &-primary:focus-visible {
    border-color: var(--btn-primary-active);
    outline-color: transparent;
    background-color: var(--btn-primary-active);
  }

  &-secondary:focus,
  &-secondary:focus-visible {
    border-color: var(--btn-secondary-active);
    outline-color: transparent;
    color: var(--btn-secondary-active-color);
    background-color: var(--btn-secondary-active);
  }

  &-w-100 {
    width: 100%;
  }

  &-svg:focus svg path,
  &-svg:focus-visible svg path,
  &-svg:active svg path {
    fill: var(--btn-secondary-active-color);
  }

  &-close {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    transform: scale(1);
    transition: transform 0.3s ease-in-out;
    border: none;
    outline: none;
    background-color: var(--white);
    z-index: 110;
  }

  &-close::after,
  &-close::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 2px;
    background-color: var(--black);
  }

  &-close::after {
    transform: translate(-50%, -50%) rotateZ(45deg);
  }

  &-close::before {
    transform: translate(-50%, -50%) rotateZ(-45deg);
  }
}

@media (min-width: 1024px) {
  .btn {
    &-close {
      top: 0px;
      right: -72px;
    }
  }
}

@media (hover: hover) {
  .btn {
    &-primary:hover {
      color: var(--btn-primary-hover-color);
      background-color: var(--btn-primary-hover);
      border-color: var(--btn-primary-hover) !important;
      outline-color: var(--btn-primary-hover) !important;
    }

    &-secondary:hover {
      border-color: var(--btn-secondary--stroke);
      color: var(--btn-secondary-hover-color);
      background-color: var(--btn-secondary-hover) !important;
      outline-color: var(--btn-secondary-hover) !important;
    }

    &-svg:hover svg path {
      fill: var(--btn-secondary-hover-color);
    }

    &-white:hover::after {
      transform: scaleX(1);
    }

    &-link:hover,
    &-user:hover {
      color: var(--content-active);
    }
    &-close-auth:hover {
      transform: scale(1.1);
    }
  }
}
</style>
