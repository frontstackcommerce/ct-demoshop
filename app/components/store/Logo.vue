<script setup lang="ts">
defineProps<{
  isInverted?: boolean
  class?: string
}>()
</script>

<template>
  <NuxtLink to="/" class="inline-block">
    <img
      v-if="isInverted"
      src="/brand/logo-inverted.svg"
      alt="Store Logo"
      :class="$props.class"
    />
    <img v-else src="/brand/logo.svg" alt="Store Logo" :class="$props.class" />
  </NuxtLink>
</template>
