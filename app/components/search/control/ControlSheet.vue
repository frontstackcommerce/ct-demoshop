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
      <Button variant="ghost" class="relative flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <IconSlidersHorizontal :size="18" />
        <span>{{ $t('control.button') }}</span>
        <ClientOnly>
          <span
            v-if="activeFilterCount > 0"
            class="flex items-center justify-center size-5 rounded-full bg-primary text-primary-foreground text-xs font-medium"
          >
            {{ activeFilterCount }}
          </span>
        </ClientOnly>
      </Button>
    </SheetTrigger>
    
    <SheetContent class="flex flex-col w-full sm:max-w-md">
      <SheetHeader class="border-b border-border pb-6">
        <SheetTitle class="text-editorial text-2xl">Refine Results</SheetTitle>
      </SheetHeader>
      
      <ScrollArea class="flex-1 -mx-6 px-6">
        <div class="py-6 space-y-8">
          <!-- Sort -->
          <div>
            <h3 class="text-sm font-medium text-foreground mb-4">
              {{ $t('control.sort.title') }}
            </h3>
            <RadioGroup
              default-value="default"
              class="space-y-3"
              @update:model-value="handleSortResult"
            >
              <div
                v-for="sortOption in availableSorts"
                :key="sortOption.key"
                class="flex items-center space-x-3"
              >
                <RadioGroupItem :id="sortOption.key" :value="sortOption.value" />
                <Label :for="sortOption.key" class="text-sm font-light text-foreground/80 cursor-pointer">
                  {{ sortOption.label }}
                </Label>
              </div>
            </RadioGroup>
          </div>

          <!-- Search within category -->
          <template v-if="category">
            <div>
              <h3 class="text-sm font-medium text-foreground mb-4">
                {{ $t('control.search.title', { category }) }}
              </h3>
              <div class="relative">
                <Input
                  ref="autoFocus"
                  :model-value="searchTerm"
                  :placeholder="$t('control.search.placeholder')"
                  class="h-12 pl-10 pr-10 bg-shade border-0"
                  @update:model-value="handleUpdateSearch"
                />
                <IconSearch class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <button
                  v-if="searchTerm.length > 0"
                  class="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                  @click="handleClearSearch"
                >
                  <IconX class="size-4" />
                </button>
              </div>
            </div>
          </template>

          <!-- Filters -->
          <div>
            <h3 class="text-sm font-medium text-foreground mb-4">
              {{ $t('control.filters.title') }}
            </h3>
            <div class="space-y-1">
              <div v-for="filter in availableFilters" :key="filter.key">
                <SearchControlFilterText
                  :default-open="false"
                  :filter-field="filter.key"
                  :filter-name="filter.label"
                  :filter-options="filter.options"
                  :active-options="currentFilter?.[filter.key] ?? []"
                  @reset-filter="handleResetFilter"
                  @filter-result="handleFilterResult"
                >
                  <div class="flex w-full items-center justify-between py-3">
                    <span class="text-sm font-light">{{ filter.label }}</span>
                    <div class="flex items-center gap-2">
                      <SearchControlFilterPreview
                        :selected-options="currentFilter?.[filter.key] ?? []"
                      />
                      <IconChevronDown class="size-4 text-muted-foreground" />
                    </div>
                  </div>
                </SearchControlFilterText>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
      
      <SheetFooter class="border-t border-border pt-6 gap-3">
        <Button
          variant="outline"
          :disabled="!activeFilterCount"
          class="flex-1 h-12"
          @click.prevent="emit('resetFilter')"
        >
          {{ $t('control.reset') }}
        </Button>
        <Button 
          class="flex-1 h-12"
          @click.prevent="emit('closeControl')"
        >
          {{ $t('control.submit', { count: totalResults }) }}
        </Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
