<script setup lang="ts">
import { X } from 'lucide-vue-next'

const props = defineProps<{
  item: any
  locked?: boolean
}>()

const emit = defineEmits<{
  (e: 'update', cartItemId: string, quantity: number): void
  (e: 'remove', cartItemId: string): void
  (e: 'click'): void
}>()

const quantity = ref(String(props.item.quantity))
const { context } = useContext()

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
    <div class="w-24 shrink-0">
      <div class="aspect-[3/4] cursor-pointer overflow-hidden bg-shade" @click="$emit('click')">
        <NuxtImg
          v-if="item.variant?.images?.[0]"
          :src="item.variant.images[0].url"
          :alt="item.variant.images[0].label"
          class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
    </div>
    <div class="flex min-w-0 flex-1 flex-col justify-between">
      <div>
        <div class="flex items-start justify-between gap-2">
          <h3 class="line-clamp-2 text-sm font-medium text-foreground">
            {{ item.name[context?.locale ?? 'en-GB'] }}
          </h3>
          <button
            class="shrink-0 p-1 text-muted-foreground transition-colors hover:text-destructive"
            :disabled="locked"
            @click="$emit('remove', item.id ?? '')"
          >
            <X class="size-4" />
          </button>
        </div>
        <p class="mt-1 text-sm font-medium text-foreground">
          <Price :price="price" />
        </p>
      </div>
      <div class="mt-3">
        <Select v-model="quantity" :disabled="locked">
          <SelectTrigger class="h-9 w-20 border-border text-sm">
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
