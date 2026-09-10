<script setup lang="ts">
const { refreshCart } = useCart()

onMounted(async () => {
  await refreshCart()
})
</script>

<template>
  <div class="mx-auto max-w-4xl px-5 py-10">
    <LayoutDrawerCart />
  </div>
</template>
