<script setup lang="ts">
const props = defineProps<{
  reviews: ProductReviews
}>()
</script>

<template>
  <div class="grid grid-cols-12 gap-8">
    <div class="col-span-12">
      <div class="mb-6 flex items-center gap-4">
        <h2 class="text-2xl font-bold">
          {{ $t('product.details.reviews.title') }}
        </h2>
        <div class="flex items-center gap-2">
          <div class="flex items-center">
            <span class="text-2xl font-bold text-gray-900">
              {{ (reviews?.aggregation?.rating?.total.avg || 0).toFixed(1) }}
            </span>
            <span class="text-gray-500">/5</span>
          </div>
          <div class="flex items-center gap-0.5">
            <svg
              v-for="i in 5"
              :key="i"
              class="h-5 w-5"
              :class="i <= Math.round(reviews?.aggregation?.rating?.total.avg || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span class="text-sm text-gray-500">
            {{ $t('product.details.reviews.count', { count: reviews?.total || 0 }) }}
          </span>
        </div>
      </div>

      <div class="flex flex-col divide-y divide-gray-200">
        <ProductReviewItem
          v-for="review in reviews?.items"
          :key="review.key"
          :review="review"
        />
      </div>
    </div>
  </div>
</template>

