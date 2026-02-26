<script setup lang="ts">
import { RotateCcw } from 'lucide-vue-next'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'

export interface ColorOption {
  label: string
  value: string
  color: string
  count?: number
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    colors?: ColorOption[]
    priceMin?: number
    priceMax?: number
    priceCurrency?: string
    pricePrecision?: number
  }>(),
  {
    colors: () => [],
    priceMin: 0,
    priceMax: 1000,
    priceCurrency: 'EUR',
    pricePrecision: 2,
  },
)

const emit = defineEmits<{
  'filter-color': [colors: string[]]
  'filter-price': [range: [number, number]]
  reset: []
}>()

const selectedColors = ref<string[]>([])
const priceRange = ref<number[]>([props.priceMin, props.priceMax])

const hasActiveFilters = computed(() => {
  return (
    selectedColors.value.length > 0 ||
    priceRange.value[0] !== props.priceMin ||
    priceRange.value[1] !== props.priceMax
  )
})

function toggleColor(value: string) {
  const index = selectedColors.value.indexOf(value)
  if (index === -1) {
    selectedColors.value = [...selectedColors.value, value]
  } else {
    selectedColors.value = selectedColors.value.filter((c) => c !== value)
  }
  emit('filter-color', selectedColors.value)
}

function handlePriceChange(value: number[]) {
  priceRange.value = value
  emit('filter-price', [value[0], value[1]])
}

function formatPriceLabel(amount: number) {
  const value = amount / Math.pow(10, props.pricePrecision)
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: props.priceCurrency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

function handleReset() {
  selectedColors.value = []
  priceRange.value = [props.priceMin, props.priceMax]
  emit('reset')
}

watch(
  () => [props.priceMin, props.priceMax],
  ([newMin, newMax]) => {
    priceRange.value = [newMin, newMax]
  },
)
</script>

<template>
  <div
    data-slot="product-quick-filter-bar"
    class="border-border flex flex-wrap items-end gap-6 border-b pb-4"
  >
    <!-- Color swatches -->
    <div v-if="colors.length > 0" class="flex flex-col gap-2">
      <span class="text-muted-foreground text-sm font-medium">
        {{ $t('control.quick-filter.color') }}
      </span>
      <div class="flex flex-wrap items-center gap-2">
        <button
          v-for="colorOption in colors"
          :key="colorOption.value"
          type="button"
          :title="colorOption.label"
          :disabled="colorOption.disabled"
          :class="
            cn(
              'focus-visible:ring-ring relative size-7 rounded-full border-2 transition-all hover:scale-110 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40',
              selectedColors.includes(colorOption.value)
                ? 'border-foreground ring-foreground ring-1 ring-offset-1'
                : 'border-transparent',
            )
          "
          @click="toggleColor(colorOption.value)"
        >
          <span
            class="absolute inset-0.5 rounded-full"
            :style="{ backgroundColor: colorOption.color }"
          />
        </button>
      </div>
    </div>

    <!-- Price range slider -->
    <div v-if="priceMax > priceMin" class="flex min-w-48 flex-col gap-2">
      <div class="flex items-center justify-between">
        <span class="text-muted-foreground text-sm font-medium">
          {{ $t('control.quick-filter.price') }}
        </span>
        <span class="text-muted-foreground text-xs">
          {{
            $t('control.quick-filter.price-range', {
              min: formatPriceLabel(priceRange[0]),
              max: formatPriceLabel(priceRange[1]),
            })
          }}
        </span>
      </div>
      <SliderRoot
        :model-value="priceRange"
        :min="priceMin"
        :max="priceMax"
        :step="1"
        :min-steps-between-thumbs="1"
        class="relative flex w-full touch-none items-center select-none"
        @update:model-value="handlePriceChange"
      >
        <SliderTrack class="bg-muted relative h-1.5 w-full grow overflow-hidden rounded-full">
          <SliderRange class="bg-primary absolute h-full" />
        </SliderTrack>
        <SliderThumb
          class="border-primary/50 bg-background hover:bg-accent focus-visible:ring-ring block size-4 rounded-full border shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
        />
        <SliderThumb
          class="border-primary/50 bg-background hover:bg-accent focus-visible:ring-ring block size-4 rounded-full border shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
        />
      </SliderRoot>
    </div>

    <!-- Reset button -->
    <div class="ml-auto">
      <Button
        variant="ghost"
        size="sm"
        :disabled="!hasActiveFilters"
        class="text-muted-foreground gap-1.5"
        @click="handleReset"
      >
        <RotateCcw class="size-3.5" />
        {{ $t('control.quick-filter.reset') }}
      </Button>
    </div>
  </div>
</template>
