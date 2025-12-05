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
  <div class="bg-background mb-4 flex w-full gap-5 px-6 md:px-0">
    <div class="w-24 md:w-36">
      <NuxtImg
        v-if="item.variant?.images?.[0]"
        :src="item.variant.images[0].url"
        :alt="item.variant.images[0].label"
        class="h-full w-full object-cover"
        @click="$emit('click')"
      />
    </div>
    <div class="flex-1">
      <div class="flex items-center justify-between">
        <p class="max-sm:text-muted-foreground text-sm font-semibold">
          {{ item.name[context?.locale ?? 'en-us'] }}
        </p>
        <Button variant="icon" :disabled="locked" @click="$emit('remove', item.id ?? '')">
          <IconTrash class="size-4" />
        </Button>
      </div>

      <p class="max-sm:text-muted-foreground text-sm">
        <Price :price="price" />
      </p>
      <div class="mt-4 w-24">
        <Select v-model="quantity" size="sm" :disabled="locked">
          <SelectTrigger>
            <SelectValue :placeholder="$t('cart.items.quantity-placeholder')" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="i in 10" :key="i" :value="String(i)"> {{ i }} </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
</template>
