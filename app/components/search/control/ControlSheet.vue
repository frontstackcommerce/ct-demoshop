<script setup lang="ts">
import { useFocus } from '@vueuse/core'

defineProps<{
  category?: string
  availableFilters: UiFilter[]
  availableSorts: UiSort[]
  currentFilter: Record<string, any>
  searchTerm: string
  totalResults: number
  activeFilterCount: number
}>()

const open = defineModel<boolean>('open')
const autoFocus = ref<HTMLInputElement>()

const emit = defineEmits<{
  resetFilter: [filterField?: string]
  filterResult: [filterField: string, filterOptions: string[]]
  sortResult: [sortBy: string]
  updateSearch: [term: string | number]
  closeControl: []
}>()

const handleResetFilter = (filterField?: string) => {
  emit('resetFilter', filterField)
}

const handleFilterResult = (filterField: string, filterOptions: string[]) => {
  emit('filterResult', filterField, filterOptions)
}

const handleSortResult = (sortBy: string) => {
  emit('sortResult', sortBy)
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
</script>

<template>
  <Sheet v-model:open="open">
    <SheetTrigger as-child>
      <Button variant="link" class="relative flex items-center gap-2">
        <IconSettings2 :size="16" />
        {{ $t('control.button') }}
        <ClientOnly>
          <div
            v-if="activeFilterCount > 0"
            class="bg-active absolute top-[-0.4em] right-[-0.4em] flex size-5 items-center justify-center rounded-full text-xs"
          >
            <span class="text-active-foreground">{{ activeFilterCount }}</span>
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
              <div
                v-for="sortOption in availableSorts"
                :key="sortOption.key"
                class="flex items-center space-x-4"
              >
                <RadioGroupItem :id="sortOption.key" :value="sortOption.value" />
                <Label :for="sortOption.key" class="text-base font-normal">
                  {{ sortOption.label }}
                </Label>
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
            <div v-for="filter in availableFilters" :key="filter.key" class="mb-2">
              <SearchControlFilterText
                :default-open="false"
                :filter-field="filter.key"
                :filter-name="filter.label"
                :filter-options="filter.options"
                :active-options="currentFilter?.[filter.key] ?? []"
                @reset-filter="handleResetFilter"
                @filter-result="handleFilterResult"
              >
                <div class="mr-6 flex w-full justify-between">
                  <span>{{ filter.label }}</span>
                  <span>
                    <SearchControlFilterPreview
                      :selected-options="currentFilter?.[filter.key] ?? []"
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
            :disabled="!activeFilterCount"
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
