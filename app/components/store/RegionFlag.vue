<script setup lang="ts">
import { filename } from 'pathe/utils'

const props = withDefaults(
  defineProps<{
    code?: 'eu' | 'uk' | 'us' | string
    size?: 'sm' | 'md' | 'lg'
    alt?: string
  }>(),
  {
    code: 'eu',
    size: 'md',
    alt: '',
  }
)

const glob = import.meta.glob<{ default: string }>('@/assets/flags/*.svg', { eager: true })
const images = Object.fromEntries(
  Object.entries(glob).map(([key, value]) => [filename(key), value.default])
)

const width = computed(() => {
  return props.size === 'sm' ? 20 : props.size === 'lg' ? 48 : 30
})
const height = computed(() => {
  return props.size === 'sm' ? 20 : props.size === 'lg' ? 48 : 30
})
</script>

<template>
  <NuxtImg
    :src="images[code] ?? images['eu']"
    :alt="alt ?? code"
    class="border-px border-muted rounded"
    :width="width"
    :height="height"
  />
</template>
