<script setup lang="ts">
import type { ComboboxEmptyProps } from 'reka-ui'
import { RotateCcw } from 'lucide-vue-next'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<ComboboxEmptyProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

function resetFilter() {
  emit('update:modelValue', [])
}
</script>

<template>
  <div class="mt-2 flex items-center justify-center">
    <Button :variant="'outline'" :size="'sm'" class="mt-1 !rounded-full" @click="resetFilter">
      <RotateCcw class="mr-3 h-4 w-4" />
      <slot />
    </Button>
  </div>
</template>
