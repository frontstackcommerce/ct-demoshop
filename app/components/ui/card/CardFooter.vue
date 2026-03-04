<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="card-footer"
    :class="cn('rounded-b-sm px-8 group-data-[size=sm]/card:px-6 [.border-t]:pt-8 group-data-[size=sm]/card:[.border-t]:pt-6 flex items-center', props.class)"
  >
    <slot />
  </div>
</template>
