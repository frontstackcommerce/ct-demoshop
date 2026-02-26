<script setup lang="ts">
const props = defineProps<{
  item: LineItem
  locale?: string
}>()

const price = computed(() => ({
  amount: (props.item.price?.value?.centAmount ?? 0) * props.item.quantity,
  currency: props.item.price?.value?.currencyCode ?? 'EUR',
  precision: props.item.price?.value?.fractionDigits ?? 2,
}))
</script>

<template>
  <div class="flex gap-4">
    <div class="relative size-16 shrink-0">
      <NuxtImg
        v-if="item.variant?.images?.[0]"
        :src="item.variant.images[0].url"
        :alt="item.name[locale ?? ''] ?? item.key"
        class="size-full rounded object-cover"
        width="64"
        height="64"
        loading="lazy"
      />
      <div
        v-if="item.quantity > 1"
        class="bg-foreground text-background absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full text-xs font-bold"
      >
        {{ item.quantity }}
      </div>
    </div>
    <div class="flex flex-1 items-center justify-between">
      <p class="text-sm font-medium">{{ item.name[locale ?? ''] ?? item.key }}</p>
      <p class="text-sm font-medium">
        <Price :price="price" />
      </p>
    </div>
  </div>
</template>
