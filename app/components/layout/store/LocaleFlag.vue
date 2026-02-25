<script setup lang="ts">
import { filename } from 'pathe/utils'

const props = withDefaults(
  defineProps<{
    code?: 'de-DE' | 'en-GB' | string
    size?: 'sm' | 'md' | 'lg'
    alt?: string
  }>(),
  {
    code: 'en-GB',
    size: 'md',
    alt: '',
  }
)

const glob = import.meta.glob<{ default: string }>('@/assets/flags/*.svg', { eager: true })
const flags = Object.fromEntries(
  Object.entries(glob).map(([key, value]) => [filename(key), value.default])
)

const localeCode = computed(() => {
  switch (props.code) {
    case 'de-DE':
      return 'de'
    default:
      return 'uk'
  }
})
</script>

<template>
  <NuxtImg
    :src="flags[localeCode]"
    :alt="alt ?? code"
    class="border-px border-muted rounded"
    :width="size === 'sm' ? 20 : size === 'lg' ? 36 : 30"
    :height="size === 'sm' ? 20 : size === 'lg' ? 36 : 30"
  />
</template>
