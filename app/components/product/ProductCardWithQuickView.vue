<script setup lang="ts">
import { Check, Eye, X } from 'lucide-vue-next'

const props = defineProps<{
  product: ProductCard
  isActive: boolean
}>()

const emit = defineEmits<{
  openQuickView: []
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

function handleQuickViewClick(e: Event) {
  e.preventDefault()
  e.stopPropagation()
  emit('openQuickView')
}
</script>

<template>
  <div class="group/card">
    <NuxtLink :to="product.link?.path" class="block">
      <div class="flex flex-col">
        <div
          class="relative mb-4 aspect-[3/4] overflow-hidden bg-shade transition-all duration-300"
          :class="isActive ? 'ring-2 ring-foreground' : ''"
        >
          <NuxtImg
            :src="firstImage"
            :alt="product.name"
            class="absolute inset-0 size-full object-cover transition-all duration-700 ease-out group-hover/card:scale-105"
          />
          <NuxtImg
            v-if="hasSecondImage"
            :src="secondImage"
            :alt="product.name"
            class="absolute inset-0 size-full object-cover opacity-0 transition-all duration-700 ease-out group-hover/card:opacity-100 group-hover/card:scale-105"
          />

          <div
            class="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover/card:bg-foreground/5"
          />

          <div
            v-if="isActive"
            class="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-foreground text-background"
          >
            <Check class="size-4" />
          </div>

          <div
            class="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition-all duration-500 group-hover/card:translate-y-0 group-hover/card:opacity-100"
          >
            <Button
              variant="default"
              class="h-10 w-full bg-background/95 text-xs uppercase tracking-wider text-foreground backdrop-blur-sm hover:bg-background"
              :class="isActive ? 'bg-foreground text-background hover:bg-foreground/90' : ''"
              @click="handleQuickViewClick"
            >
              <template v-if="isActive">
                <X class="mr-2 size-4" />
                {{ $t('actions.close-quick-view') }}
              </template>
              <template v-else>
                <Eye class="mr-2 size-4" />
                {{ $t('actions.quick-view') }}
              </template>
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
            class="line-clamp-1 text-sm font-medium text-foreground transition-colors duration-300 group-hover/card:text-primary"
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
  </div>
</template>
