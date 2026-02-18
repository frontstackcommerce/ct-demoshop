<script setup lang="ts">
import type { LineItem } from '@commercetools/platform-sdk';

const { context } = useContext()

const props = defineProps<{
  item: LineItem
  locked?: boolean
}>()
const emit = defineEmits<{
  (e: 'update', cartItemId: string, quantity: number): void
  (e: 'remove', cartItemId: string): void
  (e: 'click'): void
}>()

const quantity = ref(String(props.item.quantity))

const price = computed(() => {
  return {
    amount: props.item.price?.value?.centAmount ?? 0,
    currency: props.item.price?.value?.currencyCode ?? 'EUR',
    precision: props.item.price?.value?.fractionDigits ?? 2,
  } as Price
})

watch(quantity, (newQuantity) => {
  if (props.item.id) {
    emit('update', props.item.id, Number(newQuantity))
  }
})
</script>

<template>
  <div class="flex gap-4 py-4">
    <!-- Image -->
    <div class="w-24 shrink-0">
      <div 
        class="aspect-[3/4] bg-shade overflow-hidden cursor-pointer"
        @click="$emit('click')"
      >
        <NuxtImg
          v-if="item.variant?.images?.[0]"
          :src="item.variant.images[0].url"
          :alt="item.variant.images[0].label"
          class="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
    
    <!-- Details -->
    <div class="flex-1 flex flex-col justify-between min-w-0">
      <div>
        <div class="flex items-start justify-between gap-2">
          <h3 class="text-sm font-medium text-foreground line-clamp-2">
            {{ item.name[context?.locale ?? 'en-us'] }}
          </h3>
          <button 
            class="shrink-0 p-1 text-muted-foreground hover:text-destructive transition-colors"
            :disabled="locked" 
            @click="$emit('remove', item.id ?? '')"
          >
            <IconX class="size-4" />
          </button>
        </div>
        <p class="text-sm font-medium text-foreground mt-1">
          <Price :price="price" />
        </p>
      </div>
      
      <!-- Quantity -->
      <div class="mt-3">
        <Select v-model="quantity" :disabled="locked">
          <SelectTrigger class="w-20 h-9 text-sm border-border">
            <SelectValue :placeholder="$t('cart.items.quantity-placeholder')" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="i in 10" :key="i" :value="String(i)">
                {{ i }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
</template>
