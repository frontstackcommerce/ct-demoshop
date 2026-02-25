<script setup lang="ts">
defineProps<{
  reviews: ProductReviews
}>()
</script>

<template>
  <div class="grid grid-cols-12 gap-8">
    <div class="col-span-12">
      <div class="mb-6 flex flex-col gap-4">
        <h2 class="font-display text-2xl">
          {{ $t('product.details.reviews.title') }}
        </h2>
        <div class="flex items-center gap-2">
          <div class="flex items-center">
            <span class="text-2xl font-bold text-gray-900">
              {{ (reviews?.aggregation?.rating?.total.avg || 0).toFixed(1) }}
            </span>
            <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
            <span class="text-gray-500">/5</span>
          </div>
          <Rating :rating="reviews?.aggregation?.rating?.total.avg || 0" />
          <span class="text-sm text-gray-500">
            {{ $t('product.details.reviews.count', { count: reviews?.total || 0 }) }}
          </span>
        </div>
      </div>

      <div class="flex flex-col divide-y divide-gray-200">
        <ProductReviewItem v-for="review in reviews?.items" :key="review.key" :review="review" />
      </div>
    </div>
  </div>
</template>
