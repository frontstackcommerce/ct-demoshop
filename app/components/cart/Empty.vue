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
  <div class="px-5">
    <p class="mt-10 p-6 text-center text-5xl font-semibold">
      {{ $t('cart.empty.title') }}
    </p>
    <div v-if="cartRecoStatus === 'success'" class="mx-auto max-w-md px-5">
      <p class="text-muted-foreground mb-5 text-center text-sm font-medium uppercase">
        {{ $t('cart.empty.recommended') }}
      </p>
      <div class="space-y-2">
        <template v-for="item in cartRecoList?.items" :key="item.key">
          <NuxtLink :to="item.link?.path">
            <div class="flex items-center gap-4" @click="$emit('close')">
              <img
                :src="item.cover?.src"
                :alt="item.cover?.altText"
                class="size-20 rounded-md object-cover"
                loading="lazy"
              />
              <div class="flex w-full flex-col gap-3">
                <p class="text-sm font-medium">{{ item.name }}</p>
                <p class="text-end text-sm">
                  <Price v-if="item.price" :price="item.price" />
                </p>
              </div>
            </div>
          </NuxtLink>
        </template>
      </div>
    </div>
  </div>
</template>
