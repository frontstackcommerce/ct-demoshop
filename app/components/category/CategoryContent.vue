<script setup lang="ts">
const props = defineProps<{
  category: CategoryFull
}>()

const { metadata, status } = useCategory(
  props.category.key,
  computed(() => props.category.breadcrumbs ?? [])
)

const categoryContent = computed(() => {
  return metadata.value?.item
})
</script>

<template>
  <div class="h-[360px]">
    <NuxtImg
      v-if="status === 'success'"
      :src="categoryContent?.image?.src"
      alt="Hero Image with a man in ski gear"
      class="h-full w-full object-cover"
    />
  </div>
</template>
