<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void
}>()

const { closeMenu } = useShopMenu()

const _close = () => {
  emit('close')
  closeMenu()
}

// TODO: wire up useCart when available
const lineItems = ref<any[]>([])
</script>

<template>
  <div class="flex gap-10">
    <div class="w-full">
      <div v-if="lineItems.length">
        <div class="flex items-center justify-between p-6 font-semibold md:px-0">
          <p class="sm:hidden">{{ $t('cart.title') }}</p>
          <p class="hidden text-2xl font-semibold sm:block">
            {{ $t('cart.title-long') }}
          </p>
          <p class="text-lg max-sm:text-muted-foreground">
            {{ $t('cart.summary.count', { count: lineItems.length }) }}
          </p>
        </div>
        <ScrollArea class="h-[calc(100vh-10rem)] py-2">
          <!-- TODO: CartItem components will go here -->
          <div class="pb-40" />
        </ScrollArea>
      </div>
      <div v-else class="px-5">
        <p class="mt-10 p-6 text-center font-serif text-4xl font-light">
          {{ $t('cart.empty.title') }}
        </p>
      </div>
    </div>
  </div>
</template>
