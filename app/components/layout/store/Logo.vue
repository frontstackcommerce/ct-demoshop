<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    target?: string
    isInverted?: boolean
    isClickable?: boolean
    class?: HTMLAttributes['class']
  }>(),
  {
    target: '/',
    isInverted: false,
    isClickable: true,
    class: 'h-20',
  }
)

const delegatedProps = reactiveOmit(props, 'class', 'target', 'isInverted', 'isClickable')

const logoSrc = computed(() => {
  return props.isInverted ? '/brand/logo-inverted.svg' : '/brand/logo.svg'
})
</script>

<template>
  <div>
    <NuxtLinkLocale v-if="isClickable" :to="target">
      <NuxtImg
        v-bind="delegatedProps"
        :src="logoSrc"
        height="48"
        :class="props.class"
        alt="Demo Shop"
      />
    </NuxtLinkLocale>
    <NuxtImg
      v-else
      v-bind="delegatedProps"
      :src="logoSrc"
      height="48"
      :class="props.class"
      alt="Demo Shop"
    />
  </div>
</template>
