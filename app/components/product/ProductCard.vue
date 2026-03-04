<script setup lang="ts">
const props = defineProps<{
  product: ProductCard
}>()

const firstImage = computed(() => props.product.variants?.[0]?.images?.[0]?.src)
const secondImage = computed(() => props.product.variants?.[0]?.images?.[1]?.src)
const hasSecondImage = computed(() => !!secondImage.value)

onMounted(() => {
  if (hasSecondImage.value && secondImage.value) {
    const img = new Image()
    img.src = secondImage.value
  }
})
</script>

<template>
  <NuxtLink :to="product.link?.path" class="group block">
    <div class="flex flex-col">
      <div class="relative mb-4 aspect-[3/4] overflow-hidden bg-shade">
        <NuxtImg
          :src="firstImage"
          :alt="product.name"
          class="absolute inset-0 size-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
        />
        <NuxtImg
          v-if="hasSecondImage"
          :src="secondImage"
          :alt="product.name"
          class="absolute inset-0 size-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
        />
        <div
          class="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/5"
        />
        <div
          class="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Button
            variant="default"
            class="h-10 w-full bg-background/95 text-xs uppercase tracking-wider text-foreground backdrop-blur-sm hover:bg-background"
          >
            {{ $t('actions.quick-view') }}
          </Button>
        </div>
      </div>

      <div
        v-if="Array.isArray(product.variants) && product.variants.length > 1"
        class="mb-3 flex gap-1.5"
      >
        <NuxtLink
          v-for="variant in product.variants.slice(0, 4)"
          :key="variant.key"
          :to="product.link?.path + '?sku=' + variant.key"
          @click.stop
        >
          <div
            class="size-5 overflow-hidden rounded-full ring-1 ring-border transition-all duration-300 hover:ring-foreground"
          >
            <NuxtImg
              :src="variant.images?.[0]?.src"
              :alt="variant.images?.[0]?.altText"
              class="size-full scale-[3] object-cover blur-[1px]"
            />
          </div>
        </NuxtLink>
        <span
          v-if="product.variants.length > 4"
          class="ml-1 self-center text-xs text-muted-foreground"
        >
          +{{ product.variants.length - 4 }}
        </span>
      </div>

      <div class="space-y-1">
        <h3
          class="line-clamp-1 text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-primary"
        >
          {{ product.name }}
        </h3>
        <p
          v-if="product.brand"
          class="text-xs uppercase tracking-wide text-muted-foreground"
        >
          {{ product.brand }}
        </p>
        <p v-if="product.price?.amount" class="pt-1 text-sm font-medium text-foreground">
          {{ formatPrice(product.price) }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
