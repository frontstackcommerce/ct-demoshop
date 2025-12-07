<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    body: string
    width?: string
    close?: boolean
    icon?: 'info' | 'error' | 'warning' | 'success'
  }>(),
  {
    width: 'w-full',
    close: false,
    icon: undefined,
  }
)
defineEmits<{
  (e: 'closeToast'): void
}>()
</script>

<template>
  <div
    class="border-primary-200 flex rounded-md border bg-white py-5 pl-6 pr-8 shadow"
    :class="[width]"
  >
    <!-- APPEND -->
    <slot name="append">
      <div class="flex grow-0 items-center">
        <IconInfo v-if="icon == 'info'" class="mr-2" />
        <IconCheck
          v-else-if="icon == 'success'"
          height="24"
          width="24"
          icon-color="#22C55E"
          class="mr-2"
        />
        <IconAlertTriangle
          v-else-if="icon == 'error'"
          height="24"
          width="24"
          circle-color="#EF4444"
          icon-color="#EF4444"
          class="mr-2"
        />
      </div>
    </slot>
    <!-- CONTENT -->
    <div class="flex grow flex-col">
      <p class="text-grayscale-400 truncate text-sm font-bold leading-5 tracking-[-.02em]">
        {{ title }}
      </p>
      <span
        class="text-grayscale-300 truncate whitespace-normal break-words text-xs font-bold leading-4 tracking-[.004em]"
      >
        {{ body }}
      </span>
    </div>

    <div class="flex grow-0 items-center duration-300" @click="$emit('closeToast')">
      <IconX
        height="24"
        width="24"
        class="cursor-pointer rounded-full p-1 duration-300 hover:bg-gray-200"
      />
    </div>
  </div>
</template>
