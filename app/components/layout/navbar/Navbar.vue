<script setup lang="ts">
const { menuState, isOpen } = useShopMenu()

// SVG X icon encoded for cursor

const backdropCloseCursor = computed(
  () =>
    `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>`)}`
)
</script>

<template>
  <div class="bg-background w-full">
    <div class="border-border mx-auto flex h-full w-full justify-between border-b">
      <div class="ml-5 w-48">
        <StoreLogo />
      </div>
      <NavigationMenu
        v-model="menuState"
        :skip-delay-duration="0"
        :delay-duration="0"
        disable-click-trigger
        disable-pointer-leave-close
        class="bg-background z-50 flex w-full max-w-3xl items-center justify-between px-5 py-3"
      >
        <div>
          <LayoutNavbarMenuMain />
        </div>
        <div class="flex items-center gap-2">
          <LayoutNavbarSearch />
          <LayoutNavbarCart />
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
      :style="{ cursor: `url('${backdropCloseCursor}') 20 20, pointer` }"
    />
  </div>
</template>

<style scoped>
/* Fallback for browsers that don't support SVG cursors */
.cursor-close {
  cursor: pointer;
}
</style>
