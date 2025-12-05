<script setup lang="ts">
import { filename } from 'pathe/utils'

const props = withDefaults(
  defineProps<{
    code?: 'de-de' | 'en-us' | string
    size?: 'sm' | 'md' | 'lg'
    alt?: string
  }>(),
  {
    code: 'en-us',
    size: 'md',
    alt: '',
  }
)

const glob = import.meta.glob<{ default: string }>('@/assets/flags/*.svg', { eager: true })
const images = Object.fromEntries(
  Object.entries(glob).map(([key, value]) => [filename(key), value.default])
)

const localeCode = computed(() => {
  switch (props.code) {
    case 'en-us':
      return 'gb'
    default:
      return props.code.slice(0, 2)
  }
})
</script>

<template>
  <NuxtImg
    :src="images[localeCode] ?? images['de']"
    :alt="alt ?? localeCode"
    class="border-px rounded border-muted"
    :width="size === 'sm' ? 20 : size === 'lg' ? 36 : 30"
    :height="size === 'sm' ? 20 : size === 'lg' ? 36 : 30"
  />
</template>
