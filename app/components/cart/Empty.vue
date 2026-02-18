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
  <div class="flex flex-col items-center justify-center py-16 px-6">
    <div class="w-16 h-16 rounded-full bg-shade flex items-center justify-center mb-6">
      <IconShoppingBag class="size-8 text-muted-foreground" />
    </div>
    <h3 class="text-editorial text-2xl text-foreground mb-2">
      {{ $t('cart.empty.title') }}
    </h3>
    <p class="text-sm text-muted-foreground font-light text-center max-w-xs">
      Looks like you haven't added anything yet. Start exploring our collections.
    </p>
    
    <!-- Recommendations -->
    <div v-if="cartRecoStatus === 'success' && cartRecoList?.items?.length" class="w-full mt-12">
      <p class="text-xs text-muted-foreground tracking-wider uppercase text-center mb-6">
        {{ $t('cart.empty.recommended') }}
      </p>
      <div class="space-y-4">
        <template v-for="item in cartRecoList?.items?.slice(0, 3)" :key="item.key">
          <NuxtLink :to="item.link?.path" @click="$emit('close')">
            <div class="flex items-center gap-4 p-3 hover:bg-shade transition-colors duration-200 -mx-3">
              <div class="w-16 h-20 bg-shade shrink-0 overflow-hidden">
                <NuxtImg
                  :src="item.cover?.src"
                  :alt="item.cover?.altText"
                  class="size-full object-cover"
                  loading="lazy"
                />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-foreground line-clamp-1">{{ item.name }}</p>
                <p class="text-sm text-muted-foreground mt-1">
                  <Price v-if="item.price" :price="item.price" />
                </p>
              </div>
              <IconArrowRight class="size-4 text-muted-foreground shrink-0" />
            </div>
          </NuxtLink>
        </template>
      </div>
    </div>
  </div>
</template>
