<script setup lang="ts">
const { submitPayment, loading, error } = useCheckout()

const card = reactive({
  number: '4242 4242 4242 4242',
  expiry: '12/28',
  cvc: '123',
  name: 'Test Customer',
})
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold">{{ $t('checkout.payment.title') }}</h2>

    <p v-if="error" class="text-destructive text-sm">{{ error }}</p>

    <div class="bg-shade-200 text-muted-foreground rounded-md p-3 text-sm">
      {{ $t('checkout.payment.mock-notice') }}
    </div>

    <div class="space-y-2">
      <Label for="card-number">{{ $t('checkout.payment.card-number') }}</Label>
      <Input id="card-number" v-model="card.number" disabled />
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-2">
        <Label for="card-expiry">{{ $t('checkout.payment.expiry') }}</Label>
        <Input id="card-expiry" v-model="card.expiry" disabled />
      </div>
      <div class="space-y-2">
        <Label for="card-cvc">{{ $t('checkout.payment.cvc') }}</Label>
        <Input id="card-cvc" v-model="card.cvc" disabled />
      </div>
    </div>

    <div class="space-y-2">
      <Label for="card-name">{{ $t('checkout.payment.cardholder') }}</Label>
      <Input id="card-name" v-model="card.name" disabled />
    </div>

    <Button class="w-full" :disabled="loading" @click="submitPayment">
      {{ $t('checkout.payment.pay-now') }}
    </Button>
  </div>
</template>
