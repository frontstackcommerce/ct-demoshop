<script setup lang="ts">
const { updateLineItemQuantity, removeLineItem, lineItems, totalPrice, taxedPrice, refreshCart } = useCart()

const isUpdating = ref(false)

onMounted(async () => {
  await refreshCart()
})

const handleUpdate = async (cartItemId: string, quantity: number) => {
  isUpdating.value = true
  try {
    await updateLineItemQuantity(cartItemId, quantity)
  } finally {
    isUpdating.value = false
  }
}

const handleRemove = async (cartItemId: string) => {
  isUpdating.value = true
  try {
    await removeLineItem(cartItemId)
  } finally {
    isUpdating.value = false
  }
}

const itemCount = computed(() => lineItems.value?.length ?? 0)
</script>

<template>
  <div class="min-h-[60vh]">
    <div class="mx-auto max-w-6xl px-5 py-8 md:py-12">
      <!-- Header -->
      <div class="mb-8 md:mb-12">
        <h1 class="text-editorial text-3xl md:text-4xl text-foreground">
          {{ $t('cart.title-long') }}
        </h1>
        <p v-if="itemCount > 0" class="mt-2 text-muted-foreground">
          {{ $t('cart.summary.count', { count: itemCount }) }}
        </p>
      </div>

      <!-- Cart with items -->
      <div v-if="itemCount > 0" class="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <!-- Line Items -->
        <div class="flex-1 min-w-0">
          <div class="divide-y divide-border">
            <CartItem
              v-for="item in lineItems"
              :key="item.key"
              :item="item"
              :locked="isUpdating"
              @update="handleUpdate"
              @remove="handleRemove"
            />
          </div>

          <!-- Continue Shopping -->
          <div class="mt-8">
            <NuxtLinkLocale to="/">
              <Button variant="outline" class="gap-2">
                <IconArrowLeft class="size-4" />
                {{ $t('navigation.continue-shopping') }}
              </Button>
            </NuxtLinkLocale>
          </div>
        </div>

        <!-- Order Summary Sidebar -->
        <div class="w-full lg:max-w-sm lg:shrink-0">
          <div class="lg:sticky lg:top-28">
            <div class="bg-shade-200 p-6">
              <h2 class="text-lg font-semibold text-foreground mb-4">
                {{ $t('cart.summary.title') }}
              </h2>

              <div class="flex flex-col gap-3 text-sm">
                <div class="flex items-center justify-between">
                  <p class="text-muted-foreground">{{ $t('cart.summary.items') }}</p>
                  <p v-if="totalPrice" class="text-foreground">
                    <Price
                      :price="{
                        amount: totalPrice.centAmount ?? 0,
                        currency: totalPrice.currencyCode,
                        precision: totalPrice.fractionDigits,
                      }"
                    />
                  </p>
                </div>

                <div class="flex items-center justify-between">
                  <p class="text-muted-foreground">{{ $t('cart.summary.shipping') }}</p>
                  <p class="text-foreground">{{ $t('cart.summary.free') }}</p>
                </div>

                <div class="flex items-center justify-between">
                  <p class="text-muted-foreground">{{ $t('cart.summary.tax') }}</p>
                  <p v-if="taxedPrice" class="text-foreground">
                    <Price
                      :price="{
                        amount: (taxedPrice.totalGross?.centAmount ?? 0) - (taxedPrice.totalNet?.centAmount ?? 0),
                        currency: taxedPrice.totalGross?.currencyCode ?? 'EUR',
                        precision: taxedPrice.totalGross?.fractionDigits ?? 2,
                      }"
                    />
                  </p>
                  <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
                  <p v-else class="text-muted-foreground">-</p>
                </div>

                <Separator class="my-2" />

                <div class="flex items-center justify-between text-lg font-semibold">
                  <p class="text-foreground">{{ $t('cart.summary.total') }}</p>
                  <p v-if="totalPrice" class="text-foreground">
                    <Price
                      :price="{
                        amount: totalPrice.centAmount ?? 0,
                        currency: totalPrice.currencyCode,
                        precision: totalPrice.fractionDigits,
                      }"
                    />
                  </p>
                </div>
              </div>
            </div>

            <!-- Checkout Button -->
            <div class="mt-4 flex flex-col gap-2">
              <NuxtLinkLocale to="/checkout">
                <Button
                  class="flex w-full items-center gap-3 text-lg"
                  :aria-label="$t('navigation.checkout')"
                  color="checkout"
                  size="xl"
                >
                  <IconShoppingCart class="text-checkout-foreground size-5" />
                  {{ $t('navigation.goto-checkout') }}
                </Button>
              </NuxtLinkLocale>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty Cart -->
      <CartEmpty v-else />
    </div>
  </div>
</template>
