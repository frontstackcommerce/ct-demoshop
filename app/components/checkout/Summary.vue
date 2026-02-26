<script setup lang="ts">
const { lineItems, totalPrice, cart } = useCart()

const { current: context } = useFronticContext()
</script>

<template>
  <div class="border-input rounded-lg border p-6">
    <h3 class="mb-4 text-lg font-semibold">{{ $t('checkout.summary.title') }}</h3>

    <div class="space-y-4">
      <CheckoutSummaryItem
        v-for="item in lineItems"
        :key="item.id"
        :item="item"
        :locale="context?.locale"
      />
    </div>

    <Separator class="my-4" />

    <div class="text-muted-foreground space-y-2 text-sm">
      <div class="flex justify-between">
        <span>{{ $t('checkout.summary.subtotal') }}</span>
        <span>
          <Price
            :price="{
              amount: totalPrice.centAmount,
              currency: totalPrice.currencyCode,
              precision: totalPrice.fractionDigits,
            }"
          />
        </span>
      </div>

      <div class="flex justify-between">
        <span>{{ $t('checkout.summary.shipping') }}</span>
        <span v-if="cart?.shippingMethod">
          <Price
            :price="{
              amount: cart.shippingMethod.price.centAmount,
              currency: cart.shippingMethod.price.currencyCode,
              precision: cart.shippingMethod.price.fractionDigits,
            }"
          />
        </span>
        <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
        <span v-else>—</span>
      </div>

      <div class="flex justify-between">
        <span>{{ $t('checkout.summary.tax') }}</span>
        <span v-if="cart?.taxedPrice?.totalTax">
          <Price
            :price="{
              amount: cart.taxedPrice.totalTax.centAmount,
              currency: cart.taxedPrice.totalTax.currencyCode,
              precision: cart.taxedPrice.totalTax.fractionDigits,
            }"
          />
        </span>
        <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
        <span v-else>—</span>
      </div>
    </div>

    <Separator class="my-4" />

    <div class="flex justify-between text-lg font-semibold">
      <span>{{ $t('checkout.summary.total') }}</span>
      <span>
        <Price
          :price="{
            amount: cart?.taxedPrice?.totalGross?.centAmount ?? totalPrice.centAmount,
            currency: totalPrice.currencyCode,
            precision: totalPrice.fractionDigits,
          }"
        />
      </span>
    </div>
  </div>
</template>
