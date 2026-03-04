<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="card-image"
    :class="cn('-mt-6 overflow-hidden rounded-t-xl first:rounded-t-xl', props.class)"
  >
    <slot />
  </div>
</template>
