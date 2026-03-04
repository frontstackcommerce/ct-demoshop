<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { SwitchRoot, SwitchThumb } from "reka-ui"
import { cn } from "@/lib/utils"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    modelValue?: boolean
    label: string
    description?: string
    disabled?: boolean
  }>(),
  {
    modelValue: false,
    disabled: false,
  }
)

const emits = defineEmits<{
  "update:modelValue": [value: boolean]
}>()
</script>

<template>
  <div
    data-slot="filter-boolean-item"
    :class="
      cn(
        'flex items-center justify-between gap-3 rounded-md px-3 py-2.5',
        props.disabled && 'pointer-events-none opacity-50',
        props.class
      )
    "
  >
    <div class="flex flex-col gap-0.5">
      <label class="text-sm font-medium leading-none text-foreground">
        {{ label }}
      </label>
      <span v-if="description" class="text-xs text-muted-foreground">
        {{ description }}
      </span>
    </div>
    <SwitchRoot
      :checked="modelValue"
      :disabled="disabled"
      class="inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-input shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
      @update:checked="emits('update:modelValue', $event)"
    >
      <SwitchThumb
        class="pointer-events-none block size-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
      />
    </SwitchRoot>
  </div>
</template>
