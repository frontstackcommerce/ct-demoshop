<script setup lang="ts">
defineProps<{
  category: CategoryFull
}>()
</script>

<template>
  <div>
    <h1>{{ category.name }}</h1>
  </div>
</template>
