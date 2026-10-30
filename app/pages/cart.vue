<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'

const { lineItems, totalPrice, removeLineItem, updateLineItemQuantity, refreshCart } = useCart()

const isLoading = ref(false)

async function handleRemove(lineItemId: string) {
  isLoading.value = true
  try {
    await removeLineItem(lineItemId)
  } finally {
    isLoading.value = false
  }
}

async function handleUpdate(lineItemId: string, quantity: number) {
  isLoading.value = true
  try {
    await updateLineItemQuantity(lineItemId, quantity)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  refreshCart()
})
</script>

<template>
  <div class="container mx-auto min-h-screen max-w-4xl px-6 py-12 lg:py-20">
    <h1 class="font-serif text-3xl font-light text-foreground sm:text-4xl">
      {{ $t('cart.title') }}
    </h1>

    <div v-if="lineItems.length > 0" class="mt-8">
      <div class="divide-y divide-border">
        <CartItem
          v-for="item in lineItems"
          :key="item.id"
          :item="item"
          :locked="isLoading"
          @remove="handleRemove"
          @update="handleUpdate"
        />
      </div>

      <div class="mt-8 border-t border-border pt-8">
        <div class="flex items-center justify-between">
          <span class="text-lg font-medium text-foreground">{{ $t('cart.total') }}</span>
          <span v-if="totalPrice" class="text-lg font-medium text-foreground">
            <Price
              :price="{
                amount: totalPrice.centAmount,
                currency: totalPrice.currencyCode,
                precision: totalPrice.fractionDigits,
              }"
            />
          </span>
        </div>

        <div class="mt-8 flex flex-col gap-4 sm:flex-row">
          <NuxtLink to="/" class="flex-1">
            <Button variant="outline" class="w-full" size="lg">
              <ArrowLeft class="mr-2 size-4" />
              {{ $t('navigation.continue-shopping') }}
            </Button>
          </NuxtLink>
          <NuxtLink to="/checkout" class="flex-1">
            <Button color="checkout" class="w-full" size="lg">
              {{ $t('navigation.goto-checkout') }}
            </Button>
          </NuxtLink>
        </div>
      </div>
    </div>

    <CartEmpty v-else class="mt-12" />
  </div>
</template>
