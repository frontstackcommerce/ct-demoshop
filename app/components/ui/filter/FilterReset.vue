<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { RotateCcw } from "lucide-vue-next"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const emit = defineEmits<{
  reset: []
}>()

function handleReset() {
  emit("reset")
}
</script>

<template>
  <div data-slot="filter-reset" :class="cn('mt-2 flex items-center justify-center', props.class)">
    <Button variant="outline" size="sm" class="mt-1 !rounded-full" @click="handleReset">
      <RotateCcw class="mr-3 h-4 w-4" />
      <slot>Reset</slot>
    </Button>
  </div>
</template>
