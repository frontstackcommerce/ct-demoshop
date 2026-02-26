<script setup lang="ts">
const { addressForm, billingAddressForm, sameAsBilling, submitAddress, loading, error } =
  useCheckout()

const isValid = computed(() => {
  const a = addressForm.value
  return a.firstName && a.lastName && a.streetName && a.postalCode && a.city && a.country
})
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold">{{ $t('checkout.address.title') }}</h2>

    <p v-if="error" class="text-destructive text-sm">{{ error }}</p>

    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-2">
        <Label for="addr-first-name">{{ $t('checkout.address.first-name') }}</Label>
        <Input id="addr-first-name" v-model="addressForm.firstName" />
      </div>
      <div class="space-y-2">
        <Label for="addr-last-name">{{ $t('checkout.address.last-name') }}</Label>
        <Input id="addr-last-name" v-model="addressForm.lastName" />
      </div>
    </div>

    <div class="grid grid-cols-[1fr_120px] gap-4">
      <div class="space-y-2">
        <Label for="addr-street">{{ $t('checkout.address.street-name') }}</Label>
        <Input id="addr-street" v-model="addressForm.streetName" />
      </div>
      <div class="space-y-2">
        <Label for="addr-number">{{ $t('checkout.address.street-number') }}</Label>
        <Input id="addr-number" v-model="addressForm.streetNumber" />
      </div>
    </div>

    <div class="grid grid-cols-[120px_1fr] gap-4">
      <div class="space-y-2">
        <Label for="addr-postal">{{ $t('checkout.address.postal-code') }}</Label>
        <Input id="addr-postal" v-model="addressForm.postalCode" />
      </div>
      <div class="space-y-2">
        <Label for="addr-city">{{ $t('checkout.address.city') }}</Label>
        <Input id="addr-city" v-model="addressForm.city" />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-2">
        <Label for="addr-country">{{ $t('checkout.address.country') }}</Label>
        <Input id="addr-country" v-model="addressForm.country" />
      </div>
      <div class="space-y-2">
        <Label for="addr-phone">{{ $t('checkout.address.phone') }}</Label>
        <Input id="addr-phone" v-model="addressForm.phone" type="tel" />
      </div>
    </div>

    <div class="flex items-center gap-2">
      <Checkbox
        id="same-billing"
        :checked="sameAsBilling"
        @update:checked="sameAsBilling = !!$event"
      />
      <Label for="same-billing">{{ $t('checkout.address.same-as-billing') }}</Label>
    </div>

    <template v-if="!sameAsBilling">
      <Separator />
      <h3 class="text-lg font-semibold">{{ $t('checkout.address.billing-title') }}</h3>

      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <Label for="bill-first-name">{{ $t('checkout.address.first-name') }}</Label>
          <Input id="bill-first-name" v-model="billingAddressForm.firstName" />
        </div>
        <div class="space-y-2">
          <Label for="bill-last-name">{{ $t('checkout.address.last-name') }}</Label>
          <Input id="bill-last-name" v-model="billingAddressForm.lastName" />
        </div>
      </div>

      <div class="grid grid-cols-[1fr_120px] gap-4">
        <div class="space-y-2">
          <Label for="bill-street">{{ $t('checkout.address.street-name') }}</Label>
          <Input id="bill-street" v-model="billingAddressForm.streetName" />
        </div>
        <div class="space-y-2">
          <Label for="bill-number">{{ $t('checkout.address.street-number') }}</Label>
          <Input id="bill-number" v-model="billingAddressForm.streetNumber" />
        </div>
      </div>

      <div class="grid grid-cols-[120px_1fr] gap-4">
        <div class="space-y-2">
          <Label for="bill-postal">{{ $t('checkout.address.postal-code') }}</Label>
          <Input id="bill-postal" v-model="billingAddressForm.postalCode" />
        </div>
        <div class="space-y-2">
          <Label for="bill-city">{{ $t('checkout.address.city') }}</Label>
          <Input id="bill-city" v-model="billingAddressForm.city" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <Label for="bill-country">{{ $t('checkout.address.country') }}</Label>
          <Input id="bill-country" v-model="billingAddressForm.country" />
        </div>
        <div class="space-y-2">
          <Label for="bill-phone">{{ $t('checkout.address.phone') }}</Label>
          <Input id="bill-phone" v-model="billingAddressForm.phone" type="tel" />
        </div>
      </div>
    </template>

    <Button class="w-full" :disabled="!isValid || loading" @click="submitAddress">
      {{ $t('checkout.continue') }}
    </Button>
  </div>
</template>
