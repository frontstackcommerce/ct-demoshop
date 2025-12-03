<script setup lang="ts">
defineProps<{
  product: ProductFull
}>()
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">{{ product.name }}</h1>
    <p class="text-gray-500">{{ product.description }}</p>
    <div v-if="product.reviews?.total || 0 > 0">
      <h2 class="text-xl font-bold">
        {{ $t('product.details.reviews.title') }}
        {{ product.reviews?.aggregation?.rating?.total.avg + '/10' }}
      </h2>
      <div v-for="review in product.reviews?.items" :key="review.key">
        <h3 class="text-lg font-bold">{{ review.name }}</h3>
        <p class="text-gray-500">
          <span class="font-bold">{{ review.rating + '/10:' }}</span> {{ review.text }}
        </p>
      </div>
    </div>
  </div>
</template>
