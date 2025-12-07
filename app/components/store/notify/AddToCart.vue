<script setup lang="ts">
defineProps<{
  variant: ProductVariant
  recommended?: ProductCard
}>()
const emit = defineEmits<{
  (e: 'closeToast'): void
}>()

const { lineItems } = useCart()
const { openCart } = useShopNav()
const { showCart } = useShopMenu()

function handleOpenCart() {
  openCart()
  emit('closeToast')
}
function handleShowCart() {
  showCart()
  emit('closeToast')
}
</script>

<template>
  <div class="flex w-full flex-col gap-2">
    <div class="bg-shade text-foreground p-5 shadow">
      <div class="flex gap-4">
        <NuxtImg
          :src="variant.images?.[0]?.src"
          :alt="variant.name"
          class="size-24 object-cover"
          height="96"
          width="96"
          loading="lazy"
        />
        <div class="flex w-full flex-col gap-2">
          <p class="font-medium">
            {{ variant.name }}
          </p>
          <!-- <p v-for="option in variant.options" :key="option.attribute" class="text-sm">
            <span class="capitalize">{{ option.label }}</span
            >{{ $t('default.colon') }}{{ option.value }}
          </p> -->
          <div class="ml-auto flex">
            <Price v-if="variant.price" :price="variant.price" />
          </div>
        </div>
      </div>
      <div class="mt-6 flex items-center gap-2">
        <Button class="w-full sm:hidden" variant="outline" size="xl" @click="handleOpenCart">
          {{ $t('cart.notify.action.cart') }}
          {{ $t('default.in-brackets', { text: lineItems.length }) }}
        </Button>
        <Button class="hidden w-full sm:block" variant="outline" size="xl" @click="handleShowCart">
          {{ $t('cart.notify.action.cart') }}
          {{ $t('default.in-brackets', { text: lineItems.length }) }}
        </Button>

        <NuxtLink :to="'/checkout'">
          <Button color="checkout" class="w-full" size="xl" @click="emit('closeToast')">
            {{ $t('cart.notify.action.checkout') }}
          </Button>
        </NuxtLink>
      </div>
      <div v-if="recommended">
        <Separator class="my-5 bg-zinc-600" />
        <NuxtLink :to="recommended.link?.path">
          <div class="mx-3 flex gap-4">
            <img
              src="https://placehold.co/600x400"
              alt="Product Cover"
              class="size-20 rounded-md object-cover"
              loading="lazy"
            />
            <div class="flex flex-col gap-2">
              <p class="text-muted-foreground text-sm font-medium uppercase">
                {{ $t('cart.notify.recommended') }}
              </p>
              <p class="">
                {{ recommended.name }}
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
