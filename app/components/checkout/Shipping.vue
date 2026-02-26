<script setup lang="ts">
const { shippingMethods, selectedShippingMethod, submitShipping, loading, error } = useCheckout()
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold">{{ $t('checkout.shipping.title') }}</h2>

    <p v-if="error" class="text-destructive text-sm">{{ error }}</p>

    <div v-if="!shippingMethods.length" class="text-muted-foreground text-sm">
      {{ $t('checkout.shipping.no-methods') }}
    </div>

    <RadioGroup v-else v-model="selectedShippingMethod">
      <div
        v-for="method in shippingMethods"
        :key="method.id"
        class="border-input flex items-center justify-between rounded-md border p-4"
      >
        <div class="flex items-center gap-3">
          <RadioGroupItem :value="method.id" />
          <Label class="cursor-pointer">{{ method.name }}</Label>
        </div>
        <span class="text-sm font-medium">
          <Price
            :price="{
              amount: method.price.centAmount,
              currency: method.price.currencyCode,
              precision: method.price.fractionDigits,
            }"
          />
        </span>
      </div>
    </RadioGroup>

    <Button
      class="w-full"
      :disabled="!selectedShippingMethod || loading"
      @click="submitShipping"
    >
      {{ $t('checkout.continue') }}
    </Button>
  </div>
</template>
