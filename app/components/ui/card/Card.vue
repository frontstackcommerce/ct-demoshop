<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  size?: "default" | "sm"
}>(), {
  size: "default",
})
</script>

<template>
  <div
    data-slot="card"
    :class="cn('ring-foreground/10 bg-card text-card-foreground gap-8 overflow-hidden rounded-sm py-8 text-sm shadow-xs ring-1 has-[>img:first-child]:pt-0 data-[size=sm]:gap-6 data-[size=sm]:py-6 *:[img:first-child]:rounded-t-sm *:[img:last-child]:rounded-b-sm group/card flex flex-col', props.class)"
  >
    <slot />
  </div>
</template>
