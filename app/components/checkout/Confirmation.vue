<script setup lang="ts">
import { CheckCircle } from 'lucide-vue-next'

const { orderConfirmation, reset } = useCheckout()
const localePath = useLocalePath()

const handleContinueShopping = () => {
  reset()
  navigateTo(localePath('/'))
}
</script>

<template>
  <div class="flex flex-col items-center gap-6 py-10 text-center">
    <CheckCircle class="text-primary size-16" />

    <h2 class="text-2xl font-semibold">{{ $t('checkout.confirmation.title') }}</h2>

    <div v-if="orderConfirmation" class="space-y-2">
      <p class="text-muted-foreground">
        {{ $t('checkout.confirmation.order-number') }}:
        <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
        <span class="font-mono font-semibold">{{
          orderConfirmation.orderNumber ?? orderConfirmation.id
        }}</span>
      </p>
      <p v-if="orderConfirmation.customerEmail" class="text-muted-foreground text-sm">
        {{
          $t('checkout.confirmation.email-notice', { email: orderConfirmation.customerEmail })
        }}
      </p>
    </div>

    <Button class="mt-4" @click="handleContinueShopping">
      {{ $t('checkout.confirmation.continue-shopping') }}
    </Button>
  </div>
</template>
