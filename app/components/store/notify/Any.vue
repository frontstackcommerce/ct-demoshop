<script setup lang="ts">
import { AlertTriangle, Check, Info, X } from 'lucide-vue-next'

withDefaults(
  defineProps<{
    title: string
    body: string
    width?: string
    icon?: 'info' | 'error' | 'warning' | 'success'
  }>(),
  {
    width: 'w-full',
    icon: undefined,
  },
)

defineEmits<{
  (e: 'closeToast'): void
}>()
</script>

<template>
  <div
    class="flex rounded-md border border-primary/20 bg-white py-5 pl-6 pr-8 shadow"
    :class="[width]"
  >
    <slot name="append">
      <div class="flex grow-0 items-center">
        <Info v-if="icon === 'info'" class="mr-2 size-6" />
        <Check v-else-if="icon === 'success'" class="mr-2 size-6 text-green-500" />
        <AlertTriangle v-else-if="icon === 'error'" class="mr-2 size-6 text-red-500" />
      </div>
    </slot>
    <div class="flex grow flex-col">
      <p class="truncate text-sm font-bold leading-5 tracking-tight text-foreground">
        {{ title }}
      </p>
      <span
        class="truncate whitespace-normal break-words text-xs font-bold leading-4 tracking-wide text-muted-foreground"
      >
        {{ body }}
      </span>
    </div>
    <div
      class="flex grow-0 items-center duration-300"
      @click="$emit('closeToast')"
    >
      <X class="size-6 cursor-pointer rounded-full p-1 duration-300 hover:bg-gray-200" />
    </div>
  </div>
</template>
