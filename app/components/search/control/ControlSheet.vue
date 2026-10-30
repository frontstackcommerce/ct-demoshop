<script setup lang="ts">
import { ChevronDown, Search, SlidersHorizontal, X } from 'lucide-vue-next'
import { useFocus } from '@vueuse/core'
import type { UiFilter, UiSort } from '@frontic/nuxt/types'

defineProps<{
  category?: string
  availableFilters: UiFilter<any>[]
  availableSorts: UiSort<any>[]
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

function handleResetFilter(filterField?: string) {
  emit('resetFilter', filterField)
}

function handleFilterResult(filterField: string, filterOptions: string[]) {
  emit('filterResult', filterField, filterOptions)
}

function handleSortResult(sortBy: string) {
  emit('sortResult', sortBy)
}

function handleUpdateSearch(newTerm: string | number) {
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
      <button
        class="group relative inline-flex items-center gap-2.5 border border-border px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
      >
        <SlidersHorizontal
          :size="16"
          class="text-muted-foreground transition-colors group-hover:text-foreground"
        />
        <span class="font-medium tracking-wide">{{ $t('control.button') }}</span>
        <ClientOnly>
          <span
            v-if="activeFilterCount > 0"
            class="flex size-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground"
          >
            {{ activeFilterCount }}
          </span>
        </ClientOnly>
      </button>
    </SheetTrigger>

    <SheetContent class="flex w-full flex-col p-0 sm:max-w-lg lg:max-w-xl">
      <SheetHeader class="border-b border-border px-8 pb-6 pt-8">
        <div class="flex items-center justify-between">
          <div>
            <SheetTitle class="font-serif text-3xl font-light">{{
              $t('control.title')
            }}</SheetTitle>
            <p class="mt-1 text-sm text-muted-foreground">
              {{ $t('control.pagination.showed', { count: totalResults, total: totalResults }) }}
            </p>
          </div>
          <button
            v-if="activeFilterCount > 0"
            class="text-sm font-medium text-primary transition-colors hover:text-primary/80"
            @click="emit('resetFilter')"
          >
            {{ $t('control.reset') }}
          </button>
        </div>
      </SheetHeader>

      <ScrollArea class="flex-1">
        <div class="space-y-10 px-8 py-8">
          <!-- Sort Section -->
          <div>
            <h3
              class="mb-5 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground"
            >
              {{ $t('control.sort.title') }}
            </h3>
            <RadioGroup
              default-value="default"
              class="grid grid-cols-2 gap-3"
              @update:model-value="(v: any) => handleSortResult(String(v))"
            >
              <div v-for="sortOption in availableSorts" :key="sortOption.key" class="relative">
                <RadioGroupItem
                  :id="sortOption.key"
                  :value="sortOption.value"
                  class="peer sr-only"
                />
                <Label
                  :for="sortOption.key"
                  class="flex cursor-pointer items-center justify-center border border-border px-4 py-3 text-sm font-light text-foreground/70 transition-all hover:border-foreground/30 peer-data-[state=checked]:border-foreground peer-data-[state=checked]:bg-foreground peer-data-[state=checked]:text-background"
                >
                  {{ sortOption.label }}
                </Label>
              </div>
            </RadioGroup>
          </div>

          <!-- Search within category -->
          <div v-if="category">
            <h3
              class="mb-5 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground"
            >
              {{ $t('control.search.title', { category }) }}
            </h3>
            <div class="relative">
              <Input
                ref="autoFocus"
                :model-value="searchTerm"
                :placeholder="$t('control.search.placeholder')"
                class="h-14 border-0 bg-warm-100 pl-12 pr-12 text-base placeholder:text-muted-foreground/60 focus-visible:ring-1 focus-visible:ring-foreground"
                @update:model-value="handleUpdateSearch"
              />
              <Search
                class="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
              />
              <button
                v-if="searchTerm.length > 0"
                class="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-muted-foreground transition-colors hover:text-foreground"
                @click="handleClearSearch"
              >
                <X class="size-5" />
              </button>
            </div>
          </div>

          <!-- Filters Section -->
          <div>
            <h3
              class="mb-5 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground"
            >
              {{ $t('control.filters.title') }}
            </h3>
            <div class="space-y-1">
              <div v-for="filter in availableFilters" :key="filter.key">
                <SearchControlFilterText
                  :filter-field="filter.key"
                  :filter-options="filter.options"
                  :active-options="currentFilter?.[filter.key] ?? []"
                  @reset-filter="handleResetFilter"
                  @filter-result="handleFilterResult"
                >
                  <div class="group flex w-full items-center justify-between py-4">
                    <span
                      class="text-sm font-medium text-foreground transition-colors group-hover:text-primary"
                    >
                      {{ filter.label }}
                    </span>
                    <div class="flex items-center gap-3">
                      <SearchControlFilterPreview
                        :selected-options="currentFilter?.[filter.key] ?? []"
                      />
                      <ChevronDown
                        class="size-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180"
                      />
                    </div>
                  </div>
                </SearchControlFilterText>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>

      <SheetFooter class="border-t border-border bg-warm-50 px-8 py-6">
        <div class="flex w-full gap-4">
          <Button
            variant="outline"
            :disabled="!activeFilterCount"
            class="h-14 flex-1 border-foreground/20 text-sm font-medium uppercase tracking-wide hover:border-foreground hover:bg-transparent disabled:opacity-40"
            @click.prevent="emit('resetFilter')"
          >
            {{ $t('control.reset') }}
          </Button>
          <Button
            class="h-14 flex-1 bg-foreground text-sm font-medium uppercase tracking-wide hover:bg-foreground/90"
            @click.prevent="emit('closeControl')"
          >
            {{ $t('control.pagination.showed', { count: totalResults, total: totalResults }) }}
          </Button>
        </div>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
