<script setup lang="ts">
const props = defineProps<{
  isInverted?: boolean
  hasBackdrop?: boolean
  grow?: boolean
}>()

function goHome() {
  navigateTo('/')
}

const logoSrc = computed(() => {
  return props.isInverted ? '/brand/logo-inverted.svg' : '/brand/logo.svg'
})
</script>

<template>
  <div>
    <button @click="goHome">
      <NuxtImg
        :src="logoSrc"
        alt="Flagship Store"
        class="relative z-10 transition-transform duration-300 md:h-16"
        :class="{
          'drop-shadow-lg': hasBackdrop,
          'w-36': grow,
        }"
      />
      <span
        v-if="hasBackdrop"
        class="absolute top-0 left-0 z-0 h-full w-full blur-3xl"
        :class="isInverted ? 'bg-inverted' : 'bg-background'"
      ></span>
    </button>
  </div>
</template>
