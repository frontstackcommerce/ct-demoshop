<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'

const { currentStep, goToStep } = useCheckout()

const steps = [
  { key: 'email', label: 'checkout.progress.information' },
  { key: 'shipping', label: 'checkout.progress.shipping' },
  { key: 'payment', label: 'checkout.progress.payment' },
] as const

type ProgressStep = (typeof steps)[number]['key']

const stepOrder: Record<string, number> = {
  email: 0,
  address: 0,
  shipping: 1,
  payment: 2,
  confirmation: 3,
}

const isActive = (step: ProgressStep) => {
  const currentOrder = stepOrder[currentStep.value] ?? 0
  const stepIdx = stepOrder[step] ?? 0
  return currentOrder === stepIdx
}

const isPast = (step: ProgressStep) => {
  const currentOrder = stepOrder[currentStep.value] ?? 0
  const stepIdx = stepOrder[step] ?? 0
  return currentOrder > stepIdx
}

const handleClick = (step: ProgressStep) => {
  if (isPast(step)) {
    // Map progress step back to checkout step
    const targetStep = step === 'email' ? 'email' : step
    goToStep(targetStep)
  }
}
</script>

<template>
  <nav class="flex items-center gap-2 text-sm">
    <template v-for="(step, index) in steps" :key="step.key">
      <ChevronRight v-if="index > 0" class="text-muted-foreground size-4 shrink-0" />
      <button
        :class="[
          'transition-colors',
          isActive(step.key) && 'font-semibold',
          isPast(step.key) && 'text-primary cursor-pointer hover:underline',
          !isActive(step.key) && !isPast(step.key) && 'text-muted-foreground',
        ]"
        :disabled="!isPast(step.key)"
        @click="handleClick(step.key)"
      >
        <!-- eslint-disable-next-line @intlify/vue-i18n/no-dynamic-keys -->
        {{ $t(step.label) }}
      </button>
    </template>
  </nav>
</template>
