<script setup lang="ts">
defineProps<{
  cartRecoStatus?: 'success' | 'error'
  cartRecoList?: any
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center px-6 py-16">
    <div class="bg-shade mb-6 flex h-16 w-16 items-center justify-center rounded-full">
      <IconShoppingBag class="text-muted-foreground size-8" />
    </div>
    <h3 class="text-editorial text-foreground mb-2 text-2xl">
      {{ $t('cart.empty.title') }}
    </h3>
    <p class="text-muted-foreground max-w-xs text-center text-sm font-light">
      Looks like you haven't added anything yet. Start exploring our collections.
    </p>

    <!-- Recommendations -->
    <div v-if="cartRecoStatus === 'success' && cartRecoList?.items?.length" class="mt-12 w-full">
      <p class="text-muted-foreground mb-6 text-center text-xs tracking-wider uppercase">
        {{ $t('cart.empty.recommended') }}
      </p>
      <div class="space-y-4">
        <template v-for="item in cartRecoList?.items?.slice(0, 3)" :key="item.key">
          <NuxtLink :to="item.link?.path" @click="$emit('close')">
            <div
              class="hover:bg-shade -mx-3 flex items-center gap-4 p-3 transition-colors duration-200"
            >
              <div class="bg-shade h-20 w-16 shrink-0 overflow-hidden">
                <NuxtImg
                  :src="item.cover?.src"
                  :alt="item.cover?.altText"
                  class="size-full object-cover"
                  loading="lazy"
                />
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-foreground line-clamp-1 text-sm font-medium">{{ item.name }}</p>
                <p class="text-muted-foreground mt-1 text-sm">
                  <Price v-if="item.price" :price="item.price" />
                </p>
              </div>
              <IconArrowRight class="text-muted-foreground size-4 shrink-0" />
            </div>
          </NuxtLink>
        </template>
      </div>
    </div>
  </div>
</template>
