<script setup lang="ts">
defineProps<{
  productName: string
  productImage?: string
  price?: string
}>()

const emit = defineEmits<{
  (e: 'closeToast'): void
}>()
</script>

<template>
  <div class="flex w-full flex-col gap-2">
    <div class="bg-popover text-popover-foreground rounded-lg p-5 shadow">
      <p class="text-muted-foreground mb-4 text-sm font-medium">
        {{ $t('layout.toast.add-to-cart.title') }}
      </p>
      <div class="flex gap-4">
        <NuxtImg
          v-if="productImage"
          :src="productImage"
          :alt="productName"
          class="size-16 rounded object-cover"
          height="64"
          width="64"
          loading="lazy"
        />
        <div class="flex w-full flex-col gap-1">
          <p class="font-medium">
            {{ productName }}
          </p>
          <p v-if="price" class="text-muted-foreground text-sm">
            {{ price }}
          </p>
        </div>
      </div>
      <div class="mt-4 flex gap-2">
        <Button variant="outline" size="sm" class="flex-1" @click="emit('closeToast')">
          {{ $t('layout.toast.add-to-cart.continue-shopping') }}
        </Button>
        <NuxtLink to="/checkout" class="flex-1">
          <Button size="sm" class="w-full" @click="emit('closeToast')">
            {{ $t('layout.toast.add-to-cart.checkout') }}
          </Button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
