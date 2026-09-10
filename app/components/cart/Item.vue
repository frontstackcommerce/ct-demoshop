<script setup lang="ts">
import type { LineItem } from '@commercetools/platform-sdk'

const { context } = useContext()

const props = defineProps<{
  item: LineItem
}>()

const emit = defineEmits<{
  (e: 'update', lineItemId: string, quantity: number): void
  (e: 'remove', lineItemId: string): void
  (e: 'click'): void
}>()

/**
 * Resolve a commercetools LocalizedString against the current context locale,
 * falling back to any available translation instead of rendering blank.
 * Mirrors the `item.name[context?.locale]` pattern already used elsewhere
 * in the project (see components/product/review/Item.vue), but guards
 * against the exact locale key being missing.
 */
const resolveLocalized = (
  value: Partial<Record<string, string>> | undefined,
  locale: string
): string | undefined => {
  if (!value) return undefined
  return value[locale] ?? Object.values(value).find(Boolean)
}

const locale = computed(() => context.value?.locale ?? 'en-us')

const productName = computed(
  () => resolveLocalized(props.item.name, locale.value) ?? props.item.variant?.sku ?? ''
)

// Best-effort product link. commercetools only gives us the raw Product
// slug here (not a Frontic-resolved route), so this assumes a flat
// `/<slug>` URL shape. If that doesn't match the real routing once
// Frontic + commercetools are both connected, render non-linked instead.
const productSlugPath = computed(() => {
  const slug = resolveLocalized(props.item.productSlug, locale.value)
  return slug ? `/${slug}` : undefined
})

const imageUrl = computed(() => props.item.variant?.images?.[0]?.url)
const imageAlt = computed(() => props.item.variant?.images?.[0]?.label || productName.value)
const sku = computed(() => props.item.variant?.sku)

const unitPrice = computed(() => {
  const value = props.item.price?.value
  if (!value) return undefined
  return {
    amount: value.centAmount ?? 0,
    currency: value.currencyCode,
    precision: value.fractionDigits ?? 2,
  }
})

const discountedUnitPrice = computed(() => {
  const value = props.item.price?.discounted?.value
  if (!value) return undefined
  return {
    amount: value.centAmount ?? 0,
    currency: value.currencyCode,
    precision: value.fractionDigits ?? 2,
  }
})

const lineTotal = computed(() => {
  const value = props.item.totalPrice
  if (!value) return undefined
  return {
    amount: value.centAmount ?? 0,
    currency: value.currencyCode,
    precision: value.fractionDigits ?? 2,
  }
})

// Lightweight in-flight state so the select/remove button can't fire
// duplicate mutations while the parent awaits the cart API call. There is
// no promise/callback coming back from the emit, so we clear it whenever
// the item's quantity prop actually changes, with a timeout as a safety
// net in case a mutation fails silently and never updates the prop.
const pending = ref(false)
let pendingFallback: ReturnType<typeof setTimeout> | undefined

const clearPending = () => {
  pending.value = false
  if (pendingFallback) {
    clearTimeout(pendingFallback)
    pendingFallback = undefined
  }
}

const startPending = () => {
  pending.value = true
  pendingFallback = setTimeout(clearPending, 15000)
}

onUnmounted(() => {
  if (pendingFallback) clearTimeout(pendingFallback)
})

const quantity = ref(String(props.item.quantity ?? 1))

watch(
  () => props.item.quantity,
  (value) => {
    quantity.value = String(value ?? 1)
    clearPending()
  }
)

const quantityOptions = computed(() => {
  const max = Math.max(10, props.item.quantity ?? 1)
  return Array.from({ length: max }, (_, index) => index + 1)
})

const handleQuantityChange = (value: string | number) => {
  const newQuantity = Number(value)
  if (!props.item.id || Number.isNaN(newQuantity) || newQuantity === props.item.quantity) {
    return
  }
  startPending()
  emit('update', props.item.id, newQuantity)
}

const handleRemove = () => {
  if (!props.item.id) return
  startPending()
  emit('remove', props.item.id)
}
</script>

<template>
  <Item as="div" size="default" class="flex-nowrap items-start gap-4 px-6 py-5 md:px-0">
    <ItemMedia class="bg-shade aspect-[3/4] w-20 shrink-0 overflow-hidden rounded-none sm:w-24">
      <NuxtLinkLocale
        v-if="productSlugPath"
        :to="productSlugPath"
        class="block size-full cursor-pointer"
        @click="$emit('click')"
      >
        <NuxtImg
          v-if="imageUrl"
          :src="imageUrl"
          :alt="imageAlt"
          class="size-full object-cover"
          loading="lazy"
        />
        <div v-else class="from-shade-200 to-shade-400 size-full bg-gradient-to-br" />
      </NuxtLinkLocale>
      <template v-else>
        <NuxtImg
          v-if="imageUrl"
          :src="imageUrl"
          :alt="imageAlt"
          class="size-full object-cover"
          loading="lazy"
        />
        <div v-else class="from-shade-200 to-shade-400 size-full bg-gradient-to-br" />
      </template>
    </ItemMedia>

    <ItemContent class="gap-2">
      <ItemHeader class="items-start">
        <ItemTitle class="w-full">
          <NuxtLinkLocale
            v-if="productSlugPath"
            :to="productSlugPath"
            class="line-clamp-2 cursor-pointer hover:underline"
            @click="$emit('click')"
          >
            {{ productName }}
          </NuxtLinkLocale>
          <span v-else class="line-clamp-2">{{ productName }}</span>
        </ItemTitle>
        <ItemActions>
          <Button
            variant="ghost"
            color="destructive"
            size="xs"
            class="cursor-pointer px-2"
            :disabled="pending"
            :aria-label="$t('actions.remove-item', { item: productName })"
            @click="handleRemove"
          >
            <IconLoader2 v-if="pending" class="size-4 animate-spin" />
            <IconTrash2 v-else class="size-4" />
          </Button>
        </ItemActions>
      </ItemHeader>

      <ItemDescription v-if="sku" class="line-clamp-1">
        {{ $t('product.sku') }}: {{ sku }}
      </ItemDescription>

      <div class="flex flex-wrap items-center gap-2 text-sm">
        <template v-if="discountedUnitPrice">
          <Price :price="discountedUnitPrice" class="text-foreground font-medium" />
          <Price v-if="unitPrice" :price="unitPrice" class="text-muted-foreground line-through" />
        </template>
        <Price v-else-if="unitPrice" :price="unitPrice" class="text-foreground font-medium" />
      </div>

      <ItemFooter class="flex-wrap items-center gap-3">
        <Select
          :model-value="quantity"
          :disabled="pending"
          @update:model-value="handleQuantityChange"
        >
          <SelectTrigger size="sm" class="w-20" :aria-label="$t('cart.items.quantity-placeholder')">
            <SelectValue :placeholder="$t('cart.items.quantity-placeholder')" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="option in quantityOptions" :key="option" :value="String(option)">
                {{ option }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <p v-if="lineTotal" class="text-foreground ml-auto text-sm font-medium">
          {{ $t('cart.summary.total') }} <Price :price="lineTotal" />
        </p>
      </ItemFooter>
    </ItemContent>
  </Item>
</template>
