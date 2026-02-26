<script setup lang="ts">
const { emailForm, submitEmail, loading, error } = useCheckout()

type SubState = 'guest' | 'login' | 'register'
const subState = ref<SubState>('guest')
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold">{{ $t('checkout.email.title') }}</h2>

    <p v-if="error" class="text-destructive text-sm">{{ error }}</p>

    <template v-if="subState === 'guest'">
      <div class="space-y-2">
        <Label for="checkout-email">{{ $t('checkout.email.label') }}</Label>
        <Input
          id="checkout-email"
          v-model="emailForm"
          type="email"
          :placeholder="$t('checkout.email.placeholder')"
          @keyup.enter="submitEmail"
        />
      </div>

      <Button class="w-full" :disabled="!emailForm || loading" @click="submitEmail">
        {{ $t('checkout.email.continue-guest') }}
      </Button>

      <div class="text-muted-foreground flex items-center gap-2 text-sm">
        <span>{{ $t('checkout.email.have-account') }}</span>
        <button class="text-primary hover:underline" @click="subState = 'login'">
          {{ $t('checkout.email.login') }}
        </button>
      </div>

      <div class="text-muted-foreground flex items-center gap-2 text-sm">
        <span>{{ $t('checkout.email.no-account') }}</span>
        <button class="text-primary hover:underline" @click="subState = 'register'">
          {{ $t('checkout.email.create-account') }}
        </button>
      </div>
    </template>

    <template v-else-if="subState === 'login'">
      <CheckoutLogin @success="submitEmail()" @back="subState = 'guest'" />
    </template>

    <template v-else-if="subState === 'register'">
      <CheckoutRegister @success="submitEmail()" @back="subState = 'guest'" />
    </template>
  </div>
</template>
