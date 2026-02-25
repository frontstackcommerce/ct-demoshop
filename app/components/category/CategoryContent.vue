<script setup lang="ts">
const props = defineProps<{
  category: CategoryFull
}>()

const { listing: categoryContent, status } = useFronticListing('CategoryMeta', {
  categoryKeys: [props.category.key],
})
</script>

<template>
  <div class="h-[360px]">
    <NuxtImg
      v-if="status === 'success'"
      :src="categoryContent?.item?.image?.src"
      :alt="category.name"
      class="h-full w-full object-cover"
    />
  </div>
</template>
