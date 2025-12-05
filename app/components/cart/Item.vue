<script setup lang="ts">
const props = defineProps<{
  item: ShoppingCartItem
  locked?: boolean
}>()
const emit = defineEmits<{
  (e: 'update', cartItemId: string, quantity: number): void
  (e: 'remove', cartItemId: string): void
  (e: 'click'): void
}>()

const quantity = ref(String(props.item.quantity))

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
        v-if="item.data?.images?.[0]"
        :src="item.data.images[0].src"
        :alt="item.data.images[0].altText"
        class="h-full w-full object-cover"
        @click="$emit('click')"
      />
    </div>
    <div class="flex-1">
      <div class="flex items-center justify-between">
        <p class="max-sm:text-muted-foreground text-sm font-semibold">
          {{ item.data?.name }}
        </p>
        <Button variant="icon" :disabled="locked" @click="$emit('remove', item.id ?? '')">
          <IconTrash class="size-4" />
        </Button>
      </div>

      <p class="max-sm:text-muted-foreground text-sm">
        <Price v-if="item.price?.unit" :price="item.price?.unit" />
      </p>
      <!-- <p
        v-for="option in item.data?.options"
        :key="option.attribute"
        class="max-sm:text-muted-foreground text-xs"
      >
        {{ option.label }}{{ $t('default.colon') }} {{ option.value }}
      </p> -->
      <div class="mt-4 w-24">
        <Select v-model="quantity" size="sm" :disabled="locked">
          <SelectTrigger>
            <SelectValue :placeholder="$t('cart.items.quantity-placeholder')" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="i in 3" :key="i" :value="String(i)"> {{ i }} </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
</template>
