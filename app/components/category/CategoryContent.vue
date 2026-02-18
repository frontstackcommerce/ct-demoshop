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
  <div class="relative h-[45vh] min-h-[350px] max-h-[500px] overflow-hidden bg-warm-950">
    <!-- Background Image -->
    <div class="absolute inset-0">
      <NuxtImg
        v-if="status === 'success' && categoryContent?.image?.src"
        :src="categoryContent?.image?.src"
        alt="Category hero image"
        class="h-full w-full object-cover opacity-60"
      />
      <div v-else class="h-full w-full bg-gradient-to-br from-warm-800 to-warm-950" />
      <div class="absolute inset-0 bg-gradient-to-t from-warm-950 via-warm-950/50 to-transparent" />
    </div>
    
    <!-- Content -->
    <div class="relative h-full flex flex-col justify-end">
      <div class="container mx-auto px-6 lg:px-12 max-w-7xl pb-12 lg:pb-16">
        <!-- Breadcrumbs -->
        <nav v-if="category.breadcrumbs?.length" class="flex items-center gap-2 text-sm text-white/50 mb-6">
          <NuxtLink to="/" class="hover:text-white/80 transition-colors">Home</NuxtLink>
          <template v-for="(crumb, index) in category.breadcrumbs" :key="crumb.key">
            <span class="text-white/30">/</span>
            <NuxtLink 
              v-if="index < category.breadcrumbs.length - 1"
              :to="crumb.link?.path ?? ''" 
              class="hover:text-white/80 transition-colors"
            >
              {{ crumb.name }}
            </NuxtLink>
            <span v-else class="text-white/80">{{ crumb.name }}</span>
          </template>
        </nav>
        
        <h1 class="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-light">
          {{ category.name }}
        </h1>
        
        <p v-if="categoryContent?.description" class="text-white/60 text-lg font-light mt-4 max-w-2xl leading-relaxed">
          {{ categoryContent.description }}
        </p>
      </div>
    </div>
  </div>
</template>
