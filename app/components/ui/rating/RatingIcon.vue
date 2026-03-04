<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Star } from "lucide-vue-next"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <slot>
    <Star data-slot="rating-icon" :class="props.class" />
  </slot>
</template>
