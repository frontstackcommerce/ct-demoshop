<script setup lang="ts">
const emit = defineEmits<{
  (e: 'success' | 'back'): void
}>()

const { login, loading } = useCustomer()
const { emailForm } = useCheckout()

const email = ref(emailForm.value)
const password = ref('')
const showError = ref(false)

const handleLogin = async () => {
  showError.value = false
  try {
    await login(email.value, password.value)
    emit('success')
  } catch {
    showError.value = true
  }
}
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold">{{ $t('checkout.login.title') }}</h3>

    <p v-if="showError" class="text-destructive text-sm">{{ $t('checkout.login.error') }}</p>

    <div class="space-y-2">
      <Label for="login-email">{{ $t('checkout.login.email') }}</Label>
      <Input id="login-email" v-model="email" type="email" />
    </div>

    <div class="space-y-2">
      <Label for="login-password">{{ $t('checkout.login.password') }}</Label>
      <Input id="login-password" v-model="password" type="password" @keyup.enter="handleLogin" />
    </div>

    <div class="flex gap-3">
      <Button variant="outline" @click="$emit('back')">
        {{ $t('checkout.back') }}
      </Button>
      <Button class="flex-1" :disabled="!email || !password || loading" @click="handleLogin">
        {{ $t('checkout.login.submit') }}
      </Button>
    </div>
  </div>
</template>
