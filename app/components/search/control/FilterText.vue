<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    filterField: string
    filterOptions: FilterGroup
    activeOptions?: FilterGroup
  }>(),
  {
    activeOptions: () => [],
  },
)

const emits = defineEmits(['resetFilter', 'filterResult'])

const selectedOptions = ref<string[]>([])

const isDisabled = computed(() => {
  return !props.filterOptions.some((option) => !option.disabled)
})

function resetFilter() {
  selectedOptions.value = []
  emits('resetFilter', props.filterField)
}

function updateFilter() {
  if (selectedOptions.value.length > 0) {
    emits('filterResult', props.filterField, selectedOptions.value)
  } else {
    resetFilter()
  }
}

watch(
  () => props.activeOptions,
  () => {
    if (props.activeOptions && props.activeOptions.length > 0) {
      selectedOptions.value = props.activeOptions.map((option) => option.value)
    }
  },
  { deep: true, immediate: true },
)
</script>

<template>
  <Filter
    v-model="selectedOptions"
    class="relative mx-0 rounded-none border-none pl-0 shadow-none"
    :multiple="true"
    :disabled="isDisabled"
    @update:model-value="updateFilter"
  >
    <FilterTrigger
      class="mx-0 w-full pl-0 font-normal"
      :disabled="isDisabled"
      :class="{ 'text-muted': isDisabled }"
    >
      <slot />
    </FilterTrigger>
    <FilterContent class="my-3 min-w-[280px] border border-border bg-warm-50 p-3 shadow-lg">
      <FilterList class="space-y-1">
        <FilterItem
          v-for="(option, index) in filterOptions"
          :key="index"
          :disabled="option.disabled"
          :option
          :value="option.value"
        >
          <FilterIndicator :disabled="option.disabled" />
        </FilterItem>
      </FilterList>
    </FilterContent>
  </Filter>
  <div class="h-px bg-border" />
</template>
