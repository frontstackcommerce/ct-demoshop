<script setup lang="ts">
import { useFocus } from '@vueuse/core'

const props = defineProps<{
  category?: string
  filters: FilterData
  currentFilter: ListingState<ProductSearch>['filter']
  searchTerm: string
  totalResults: number
}>()

const open = defineModel<boolean>('open')
const autoFocus = ref<HTMLInputElement>()

const emit = defineEmits([
  'addFilter',
  'resetFilter',
  'updateSearch',
  'sortResult',
  'filterResult',
  'closeControl',
])

type FILTER_KEY = string

const { t } = useI18n()

const OR_FILTER_KEYS = [
  'properties.70dda5dfb8053dc6d1c492574bce9bfd',
  'options.f7bd60b75b29d79b660a2859395c1a24',
]

const FILTER_KEY_MAP: {
  [key in FILTER_KEY]: string
} = {
  'options.finish-label': t('listing.filters.finish-label'),
  'options.search-color': t('listing.filters.search-color'),
}

const handleResetFilter = (filterField?: string) => {
  if (filterField && OR_FILTER_KEYS.includes(filterField)) {
    emit('resetFilter', { filterField, filterMode: 'or' })
  } else if (filterField) {
    emit('resetFilter', { filterField, filterMode: 'and' })
  } else {
    emit('resetFilter')
  }
}

const handleFilterResult = (filterField: string, filterOptions: string[]) => {
  if (OR_FILTER_KEYS.includes(filterField)) {
    emit('filterResult', { filterField, filterOptions, filterMode: 'or' })
  } else {
    emit('filterResult', { filterField, filterOptions, filterMode: 'and' })
  }
}

const handleSortResult = (sortBy: string) => {
  emit('sortResult', { sortBy })
}

const handleUpdateSearch = (newTerm: string | number) => {
  emit('updateSearch', newTerm)
}
function handleClearSearch() {
  handleUpdateSearch('')
  nextTick(() => {
    useFocus(autoFocus, { initialValue: true })
  })
}

const filterCount = computed(() => {
  return Object.keys(props.currentFilter ?? {}).length > 0
    ? Object.keys(props.currentFilter ?? {}).length
    : 0
})
</script>

<template>
  <Sheet v-model:open="open">
    <SheetTrigger as-child>
      <Button variant="outline" class="relative flex items-center gap-2 rounded-full">
        <IconSettings2 :size="16" />
        {{ $t('control.button') }}
        <ClientOnly>
          <div
            v-if="filterCount > 0"
            class="bg-active absolute top-[-0.4em] right-[-0.4em] flex size-5 items-center justify-center rounded-full text-xs"
          >
            <span class="text-active-foreground">{{ filterCount }}</span>
          </div>
        </ClientOnly>
      </Button>
    </SheetTrigger>
    <SheetContent class="flex flex-col">
      <ScrollArea class="flex-1">
        <div class="sm:pt-12">
          <div class="bg-shade-200 mb-4 p-4">
            <p class="mb-5 text-lg leading-none font-semibold">{{ $t('control.sort.title') }}</p>
            <RadioGroup
              default-value="default"
              class="gap-y-2.5"
              @update:model-value="handleSortResult"
            >
              <div class="flex items-center space-x-4">
                <RadioGroupItem id="default" value="default" />
                <Label for="default" class="text-base font-normal">{{
                  $t('control.sort.options.default')
                }}</Label>
              </div>
              <div class="flex items-center space-x-4">
                <RadioGroupItem id="name:asc" value="name:asc" />
                <Label for="name:asc" class="text-base font-normal">{{
                  $t('control.sort.options.name:asc')
                }}</Label>
              </div>
              <div class="flex items-center space-x-4">
                <RadioGroupItem id="name:desc" value="name:desc" />
                <Label for="name:desc" class="text-base font-normal">{{
                  $t('control.sort.options.name:desc')
                }}</Label>
              </div>
              <div class="flex items-center space-x-4">
                <RadioGroupItem id="price:asc" value="price.amount:asc" />
                <Label for="price:asc" class="text-base font-normal">{{
                  $t('control.sort.options.price:asc')
                }}</Label>
              </div>
              <div class="flex items-center space-x-4">
                <RadioGroupItem id="price:desc" value="price.amount:desc" />
                <Label for="price:desc" class="text-base font-normal">{{
                  $t('control.sort.options.price:desc')
                }}</Label>
              </div>
            </RadioGroup>
          </div>
          <template v-if="category">
            <hr class="my-5" />

            <p class="mb-5 text-lg leading-none font-semibold">
              {{ $t('control.search.title', { category }) }}
            </p>

            <div class="relative w-full items-center">
              <Input
                ref="autoFocus"
                :model-value="searchTerm"
                :placeholder="$t('control.search.placeholder')"
                class="bg-muted rounded-full py-6 pr-5 pl-10 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 active:ring-0"
                @update:model-value="handleUpdateSearch"
              />
              <span class="absolute inset-y-0 start-3 flex items-center justify-center">
                <IconSearch class="text-muted-foreground size-5" />
              </span>
              <span
                v-if="searchTerm.length > 0"
                class="absolute inset-y-0 end-3 flex items-center justify-center"
              >
                <Button size="sm" variant="icon" @click="handleClearSearch">
                  <IconX class="text-muted-foreground size-6" />
                </Button>
              </span>
            </div>
          </template>
          <hr class="my-5" />

          <p class="mb-3 text-lg leading-none font-semibold">{{ $t('control.filters.title') }}</p>

          <div>
            <div
              v-for="filterKey in Object.keys(FILTER_KEY_MAP).filter(
                (key) => filters?.[key as FILTER_KEY]
              )"
              :key="filterKey"
              :class="{ 'mb-2': FILTER_KEY_MAP[filterKey as FILTER_KEY] !== undefined }"
            >
              <SearchControlFilterText
                v-if="FILTER_KEY_MAP[filterKey as FILTER_KEY] !== undefined"
                :default-open="false"
                :filter-field="filterKey"
                :filter-name="FILTER_KEY_MAP[filterKey as FILTER_KEY] ?? ''"
                :filter-options="filters[filterKey as FILTER_KEY] ?? []"
                :active-options="currentFilter?.[filterKey as FILTER_KEY] ?? []"
                @reset-filter="handleResetFilter"
                @filter-result="handleFilterResult"
              >
                <div class="mr-6 flex w-full justify-between">
                  <span>
                    {{ FILTER_KEY_MAP[filterKey as FILTER_KEY] ?? filterKey }}
                  </span>
                  <span>
                    <SearchControlFilterPreview
                      :selected-options="currentFilter?.[filterKey] ?? []"
                    />
                  </span>
                </div>
              </SearchControlFilterText>
            </div>
          </div>
        </div>
      </ScrollArea>
      <SheetFooter class="mt-auto">
        <div class="flex items-center gap-2 sm:flex-col sm:gap-3">
          <Button size="xl" class="sm:w-full" @click.prevent="emit('closeControl')">
            <span class="hidden sm:block">{{ $t('control.submit', { count: totalResults }) }}</span>
            <span class="block sm:hidden"
              >{{ $t('control.submit-sm') }}
              {{ $t('default.in-brackets', { text: totalResults }) }}</span
            >
          </Button>
          <Button
            size="xl"
            variant="outline"
            :disabled="!filterCount"
            class="sm:w-full"
            @click.prevent="emit('resetFilter')"
          >
            <span class="hidden sm:block">{{ $t('control.reset') }}</span>
            <span class="block sm:hidden">{{ $t('control.reset-sm') }}</span>
          </Button>
        </div>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
