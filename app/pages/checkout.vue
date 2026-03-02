<script setup lang="ts">
definePageMeta({
  layout: 'checkout',
})
defineI18nRoute({
  paths: {
    de: '/kasse',
  },
})

const { lineItems } = useCart()
const { currentStep } = useCheckout()
const localePath = useLocalePath()

watch(
  () => lineItems.value?.length,
  (count) => {
    if (!count && currentStep.value !== 'confirmation') {
      navigateTo(localePath('/'))
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="grid gap-10 lg:grid-cols-[1fr_380px]">
    <div>
      <CheckoutProgress />
      <div class="mt-8">
        <CheckoutEmail v-if="currentStep === 'email'" />
        <CheckoutAddress v-else-if="currentStep === 'address'" />
        <CheckoutShipping v-else-if="currentStep === 'shipping'" />
        <CheckoutPayment v-else-if="currentStep === 'payment'" />
        <CheckoutConfirmation v-else-if="currentStep === 'confirmation'" />
      </div>
    </div>
    <div v-if="currentStep !== 'confirmation'">
      <CheckoutSummary />
    </div>
  </div>
</template>
