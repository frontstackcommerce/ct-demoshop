<script setup lang="ts">
import { filename } from 'pathe/utils'

withDefaults(
  defineProps<{
    code?: 'de' | 'gb' | string
    size?: 'sm' | 'md' | 'lg'
    alt?: string
  }>(),
  {
    code: 'de',
    size: 'md',
    alt: '',
  }
)

const glob = import.meta.glob<{ default: string }>('@/assets/flags/*.svg', { eager: true })
const images = Object.fromEntries(
  Object.entries(glob).map(([key, value]) => [filename(key), value.default])
)
</script>

<template>
  <img
    :src="images[code] ?? images['us']"
    :alt="alt ?? code"
    class="border-px rounded border-muted"
    :width="size === 'sm' ? 20 : size === 'lg' ? 36 : 30"
    :height="size === 'sm' ? 20 : size === 'lg' ? 36 : 30"
  />
</template>
