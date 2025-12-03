<script setup lang="ts">
const { items } = useCart()

const cartItemCount = computed(() => items.value.length)
</script>

<template>
  <nav class="bg-white p-4 shadow-sm">
    <div class="flex items-center justify-between">
      <NuxtLink to="/" class="text-xl font-bold text-gray-900"> Store </NuxtLink>

      <div class="flex space-x-6">
        <NuxtLink to="/" class="text-gray-600 hover:text-gray-900"> Home </NuxtLink>
        <NuxtLink to="/cart" class="flex items-center gap-1 text-gray-600 hover:text-gray-900">
          Cart
          <span
            v-if="cartItemCount > 0"
            class="rounded-full bg-blue-600 px-2 py-1 text-xs text-white"
          >
            {{ cartItemCount }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
