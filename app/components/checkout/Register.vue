<script setup lang="ts">
const emit = defineEmits<{
  (e: 'success' | 'back'): void
}>()

const { register, loading } = useCustomer()
const { emailForm } = useCheckout()

const form = reactive({
  email: emailForm.value,
  password: '',
  firstName: '',
  lastName: '',
})
const showError = ref(false)

const handleRegister = async () => {
  showError.value = false
  try {
    await register(form)
    emit('success')
  } catch {
    showError.value = true
  }
}
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold">{{ $t('checkout.register.title') }}</h3>

    <p v-if="showError" class="text-destructive text-sm">{{ $t('checkout.register.error') }}</p>

    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-2">
        <Label for="register-first-name">{{ $t('checkout.register.first-name') }}</Label>
        <Input id="register-first-name" v-model="form.firstName" />
      </div>
      <div class="space-y-2">
        <Label for="register-last-name">{{ $t('checkout.register.last-name') }}</Label>
        <Input id="register-last-name" v-model="form.lastName" />
      </div>
    </div>

    <div class="space-y-2">
      <Label for="register-email">{{ $t('checkout.register.email') }}</Label>
      <Input id="register-email" v-model="form.email" type="email" />
    </div>

    <div class="space-y-2">
      <Label for="register-password">{{ $t('checkout.register.password') }}</Label>
      <Input id="register-password" v-model="form.password" type="password" />
    </div>

    <div class="flex gap-3">
      <Button variant="outline" @click="$emit('back')">
        {{ $t('checkout.back') }}
      </Button>
      <Button
        class="flex-1"
        :disabled="!form.email || !form.password || !form.firstName || !form.lastName || loading"
        @click="handleRegister"
      >
        {{ $t('checkout.register.submit') }}
      </Button>
    </div>
  </div>
</template>
