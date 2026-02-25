<script setup lang="ts">
const props = defineProps<{
  review: ProductReview
}>()

const { context } = useContext()

const showFullReview = ref(false)
</script>

<template>
  <div class="py-6 flex flex-col gap-2">
    <div class="flex items-start justify-between">
      <div>
        <div class="flex items-center gap-2">
          <h3 class="text-lg font-medium text-gray-900">{{ review.name || 'Anonymous' }}</h3>
          <div class="flex items-center gap-0.5">
            <svg
              v-for="i in 5"
              :key="i"
              class="h-4 w-4"
              :class="i <= (review.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span class="text-sm font-medium text-gray-600">{{ review.rating || 0 }}/5</span>
        </div>
        <div class="text-sm text-gray-500 mt-2 mb-1">
          {{ review.date ? new Date(review.date).toLocaleDateString(context?.locale || 'en-GB') : '' }}
        </div>
      </div>
    </div>
    <p class="text-gray-700 leading-relaxed font-medium">{{ review.summary }}</p>
    <p class="text-gray-700 leading-relaxed text-xs">
      <button @click="showFullReview = !showFullReview">
        {{ $t('product.details.reviews.show-full-review') }} <span v-if="!showFullReview">▼</span><span v-else>▲</span>
      </button>
    </p>
    <p class="text-gray-700 leading-relaxed" v-if="showFullReview">{{ review.text }}</p>
  </div>
</template>

