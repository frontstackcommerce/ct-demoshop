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
      <button class="group relative inline-flex items-center gap-2.5 px-5 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors border border-border hover:border-foreground/30">
        <IconSlidersHorizontal :size="16" class="text-muted-foreground group-hover:text-foreground transition-colors" />
        <span class="font-medium tracking-wide">{{ $t('control.button') }}</span>
        <ClientOnly>
          <span
            v-if="activeFilterCount > 0"
            class="flex items-center justify-center size-5 rounded-full bg-primary text-primary-foreground text-xs font-medium"
          >
            {{ activeFilterCount }}
          </span>
        </ClientOnly>
      </button>
    </SheetTrigger>
    
    <SheetContent class="flex flex-col w-full sm:max-w-lg lg:max-w-xl p-0">
      <!-- Header -->
      <SheetHeader class="px-8 pt-8 pb-6 border-b border-border">
        <div class="flex items-center justify-between">
          <div>
            <SheetTitle class="font-serif text-3xl font-light">Refine</SheetTitle>
            <p class="text-sm text-muted-foreground mt-1">
              {{ totalResults }} products available
            </p>
          </div>
          <button 
            v-if="activeFilterCount > 0"
            class="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
            @click="emit('resetFilter')"
          >
            Clear all
          </button>
        </div>
      </SheetHeader>
      
      <ScrollArea class="flex-1">
        <div class="px-8 py-8 space-y-10">
          <!-- Sort Section -->
          <div>
            <h3 class="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground mb-5">
              {{ $t('control.sort.title') }}
            </h3>
            <RadioGroup
              default-value="default"
              class="grid grid-cols-2 gap-3"
              @update:model-value="handleSortResult"
            >
              <div
                v-for="sortOption in availableSorts"
                :key="sortOption.key"
                class="relative"
              >
                <RadioGroupItem 
                  :id="sortOption.key" 
                  :value="sortOption.value" 
                  class="peer sr-only"
                />
                <Label 
                  :for="sortOption.key" 
                  class="flex items-center justify-center px-4 py-3 text-sm font-light text-foreground/70 cursor-pointer border border-border hover:border-foreground/30 transition-all peer-data-[state=checked]:border-foreground peer-data-[state=checked]:bg-foreground peer-data-[state=checked]:text-background"
                >
                  {{ sortOption.label }}
                </Label>
              </div>
            </RadioGroup>
          </div>

          <!-- Search within category -->
          <div v-if="category">
            <h3 class="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground mb-5">
              {{ $t('control.search.title', { category }) }}
            </h3>
            <div class="relative">
              <Input
                ref="autoFocus"
                :model-value="searchTerm"
                :placeholder="$t('control.search.placeholder')"
                class="h-14 pl-12 pr-12 bg-warm-100 border-0 text-base placeholder:text-muted-foreground/60 focus-visible:ring-1 focus-visible:ring-foreground"
                @update:model-value="handleUpdateSearch"
              />
              <IconSearch class="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <button
                v-if="searchTerm.length > 0"
                class="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                @click="handleClearSearch"
              >
                <IconX class="size-5" />
              </button>
            </div>
          </div>

          <!-- Filters Section -->
          <div>
            <h3 class="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground mb-5">
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
                  <div class="flex w-full items-center justify-between py-4 group">
                    <span class="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {{ filter.label }}
                    </span>
                    <div class="flex items-center gap-3">
                      <SearchControlFilterPreview
                        :selected-options="currentFilter?.[filter.key] ?? []"
                      />
                      <IconChevronDown class="size-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                    </div>
                  </div>
                </SearchControlFilterText>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
      
      <!-- Footer -->
      <SheetFooter class="px-8 py-6 border-t border-border bg-warm-50">
        <div class="flex gap-4 w-full">
          <Button
            variant="outline"
            :disabled="!activeFilterCount"
            class="flex-1 h-14 text-sm font-medium tracking-wide uppercase border-foreground/20 hover:border-foreground hover:bg-transparent disabled:opacity-40"
            @click.prevent="emit('resetFilter')"
          >
            {{ $t('control.reset') }}
          </Button>
          <Button 
            class="flex-1 h-14 text-sm font-medium tracking-wide uppercase bg-foreground hover:bg-foreground/90"
            @click.prevent="emit('closeControl')"
          >
            Show {{ totalResults }} Results
          </Button>
        </div>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
