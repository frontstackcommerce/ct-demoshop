<script setup lang="ts">
const menuState = ref('accessories')
const isOpen = ref(false)

// SVG X icon encoded for cursor
const closeIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>`
const closeIconEncoded = computed(() => `data:image/svg+xml,${encodeURIComponent(closeIconSvg)}`)
</script>

<template>
  <div class="relative mt-5 hidden border border-red-500 sm:block">
    <div
      class="container mx-auto flex h-full items-center justify-between border border-green-500 px-6 md:px-0"
    >
      <div class="flex items-center gap-4 border border-yellow-500">
        <Logo />
      </div>
      <NavigationMenu
        v-model="menuState"
        :skip-delay-duration="0"
        :delay-duration="0"
        disable-click-trigger
        disable-pointer-leave-close
        class="shadow-inverted/30 z-50 flex w-full max-w-4xl items-center justify-between bg-blue-500 px-5 shadow-lg"
        :class="{
          'rounded-lg': !isOpen,
          'rounded-t-lg': isOpen,
        }"
      >
        <div class="border border-purple-500 bg-red-200">
          <LayoutNavbarMenuMain />
        </div>
      </NavigationMenu>
    </div>
    <!-- Backdrop -->
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ease-in-out"
      :class="{
        'opacity-0': !isOpen,
        'opacity-100': isOpen,
      }"
      :style="{ cursor: `url('${closeIconEncoded}') 20 20, pointer` }"
    />
  </div>
</template>

<style scoped>
/* Fallback for browsers that don't support SVG cursors */
.cursor-close {
  cursor: pointer;
}
</style>
