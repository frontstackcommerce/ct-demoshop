<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void
}>()

const { cart, updateItem, status, removeItem } = useCart()
const { closeMenu } = useShopMenu()

const close = () => {
  emit('close')
  closeMenu()
}
const handleUpdate = async (cartItemId: string, quantity: number) => {
  await updateItem({ cartItemId, quantity })
}

const handleRemove = async (cartItemId: string) => {
  await removeItem({ cartItemId })
}
</script>

<template>
  <div class="flex gap-10">
    <div class="w-full">
      <div v-if="cart?.items?.length">
        <div class="flex items-center justify-between p-6 font-semibold md:px-0">
          <p class="sm:hidden">{{ $t('cart.title') }}</p>
          <p class="hidden text-2xl font-semibold sm:block">
            {{ $t('cart.title-long') }}
          </p>
          <p class="max-sm:text-muted-foreground text-lg">
            {{ $t('cart.summary.count', { count: cart?.items?.length }) }}
          </p>
        </div>
        <ScrollArea class="h-[calc(100vh-10rem)] py-2">
          <CartItem
            v-for="item in cart?.items"
            :key="item.key"
            :item="item"
            @update="handleUpdate"
            @remove="handleRemove"
            @click="close"
          />

          <div
            class="bg-shade-200 text-muted-foreground flex flex-col gap-2 rounded-lg px-6 pt-4 text-sm md:hidden"
          >
            <div class="flex items-center justify-between">
              <p>{{ $t('cart.summary.items') }}</p>
              <p v-if="cart?.price?.total">
                <Price :price="cart?.price?.total" />
              </p>
            </div>
            <div class="flex items-center justify-between">
              <p>{{ $t('cart.summary.shipping') }}</p>
              <p>{{ $t('cart.summary.free') }}</p>
            </div>
            <div class="flex items-center justify-between">
              <p>{{ $t('cart.summary.tax') }}</p>
              <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
              <p>-</p>
            </div>
            <Separator class="my-1.5" />
            <div class="flex items-center justify-between text-lg font-semibold">
              <p>{{ $t('cart.summary.total') }}</p>
              <p v-if="cart?.price?.total"><Price :price="cart?.price?.total" /></p>
            </div>
          </div>
          <div class="pb-40"></div>
        </ScrollArea>
      </div>
      <CartEmpty v-else-if="status !== 'error' && !cart?.items?.length" />
    </div>
    <div v-if="cart?.items?.length" class="hidden w-full flex-col gap-1 md:flex md:max-w-xs">
      <div class="bg-shade-300 my-5 flex flex-col gap-2 rounded-lg px-6 py-4 text-sm">
        <div class="flex items-center justify-between">
          <p>{{ $t('cart.summary.items') }}</p>
          <p v-if="cart?.price?.total"><Price :price="cart?.price?.total" /></p>
        </div>
        <div class="flex items-center justify-between">
          <p>{{ $t('cart.summary.shipping') }}</p>
          <p>{{ $t('cart.summary.free') }}</p>
        </div>
        <div class="flex items-center justify-between">
          <p>{{ $t('cart.summary.tax') }}</p>
          <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
          <p>-</p>
        </div>
        <Separator class="my-1.5" />
        <div class="flex items-center justify-between text-lg font-semibold">
          <p>{{ $t('cart.summary.total') }}</p>
          <p v-if="cart?.price?.total"><Price :price="cart?.price?.total" /></p>
        </div>
      </div>
      <NuxtLink to="/checkout">
        <Button
          class="flex w-full items-center gap-5 text-lg"
          :aria-label="$t('navigation.checkout')"
          color="checkout"
          size="xl"
          @click="closeMenu"
        >
          <IconShoppingCart class="text-checkout-foreground size-6" />
          {{ $t('navigation.goto-checkout') }}
        </Button>
      </NuxtLink>
      <Button
        class="w-full"
        :aria-label="$t('navigation.continue-shopping')"
        variant="link"
        @click="closeMenu"
      >
        {{ $t('navigation.continue-shopping') }}
      </Button>
    </div>
  </div>
</template>
