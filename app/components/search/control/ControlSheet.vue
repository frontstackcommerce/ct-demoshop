<script setup lang="ts">
import { useFocus } from '@vueuse/core'
defineProps<{
  category?: string
  availableFilters: any[]
  availableSorts: any[]
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

const handleSortResult = (sortBy: any) => {
  emit('sortResult', String(sortBy))
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
      <button
        class="group text-muted-foreground hover:text-foreground border-border hover:border-foreground/30 relative inline-flex items-center gap-2.5 border px-5 py-2.5 text-sm transition-colors"
      >
        <IconSlidersHorizontal
          :size="16"
          class="text-muted-foreground group-hover:text-foreground transition-colors"
        />
        <span class="font-medium tracking-wide">{{ $t('control.button') }}</span>
        <ClientOnly>
          <span
            v-if="activeFilterCount > 0"
            class="bg-primary text-primary-foreground flex size-5 items-center justify-center rounded-full text-xs font-medium"
          >
            {{ activeFilterCount }}
          </span>
        </ClientOnly>
      </button>
    </SheetTrigger>

    <SheetContent class="flex w-full flex-col p-0 sm:max-w-lg lg:max-w-xl">
      <!-- Header -->
      <SheetHeader class="border-border border-b px-8 pt-8 pb-6">
        <div class="flex items-center justify-between">
          <div>
            <SheetTitle class="font-serif text-3xl font-light">Refine</SheetTitle>
            <p class="text-muted-foreground mt-1 text-sm">{{ totalResults }} products available</p>
          </div>
          <button
            v-if="activeFilterCount > 0"
            class="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
            @click="emit('resetFilter')"
          >
            Clear all
          </button>
        </div>
      </SheetHeader>

      <ScrollArea class="flex-1">
        <div class="space-y-10 px-8 py-8">
          <!-- Sort Section -->
          <div>
            <h3 class="text-muted-foreground mb-5 text-xs font-medium tracking-[0.15em] uppercase">
              {{ $t('control.sort.title') }}
            </h3>
            <RadioGroup
              default-value="default"
              class="grid grid-cols-2 gap-3"
              @update:model-value="handleSortResult"
            >
              <div v-for="sortOption in availableSorts" :key="sortOption.key" class="relative">
                <RadioGroupItem
                  :id="sortOption.key"
                  :value="sortOption.value"
                  class="peer sr-only"
                />
                <Label
                  :for="sortOption.key"
                  class="text-foreground/70 border-border hover:border-foreground/30 peer-data-[state=checked]:border-foreground peer-data-[state=checked]:bg-foreground peer-data-[state=checked]:text-background flex cursor-pointer items-center justify-center border px-4 py-3 text-sm font-light transition-all"
                >
                  {{ sortOption.label }}
                </Label>
              </div>
            </RadioGroup>
          </div>

          <!-- Search within category -->
          <div v-if="category">
            <h3 class="text-muted-foreground mb-5 text-xs font-medium tracking-[0.15em] uppercase">
              {{ $t('control.search.title', { category }) }}
            </h3>
            <div class="relative">
              <Input
                ref="autoFocus"
                :model-value="searchTerm"
                :placeholder="$t('control.search.placeholder')"
                class="bg-warm-100 placeholder:text-muted-foreground/60 focus-visible:ring-foreground h-14 border-0 pr-12 pl-12 text-base focus-visible:ring-1"
                @update:model-value="handleUpdateSearch"
              />
              <IconSearch
                class="text-muted-foreground absolute top-1/2 left-4 size-5 -translate-y-1/2"
              />
              <button
                v-if="searchTerm.length > 0"
                class="text-muted-foreground hover:text-foreground absolute top-1/2 right-4 -translate-y-1/2 p-1 transition-colors"
                @click="handleClearSearch"
              >
                <IconX class="size-5" />
              </button>
            </div>
          </div>

          <!-- Filters Section -->
          <div>
            <h3 class="text-muted-foreground mb-5 text-xs font-medium tracking-[0.15em] uppercase">
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
                  <div class="group flex w-full items-center justify-between py-4">
                    <span
                      class="text-foreground group-hover:text-primary text-sm font-medium transition-colors"
                    >
                      {{ filter.label }}
                    </span>
                    <div class="flex items-center gap-3">
                      <SearchControlFilterPreview
                        :selected-options="currentFilter?.[filter.key] ?? []"
                      />
                      <IconChevronDown
                        class="text-muted-foreground size-4 transition-transform group-data-[state=open]:rotate-180"
                      />
                    </div>
                  </div>
                </SearchControlFilterText>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>

      <!-- Footer -->
      <SheetFooter class="border-border bg-warm-50 border-t px-8 py-6">
        <div class="flex w-full gap-4">
          <Button
            variant="outline"
            :disabled="!activeFilterCount"
            class="border-foreground/20 hover:border-foreground h-14 flex-1 text-sm font-medium tracking-wide uppercase hover:bg-transparent disabled:opacity-40"
            @click.prevent="emit('resetFilter')"
          >
            {{ $t('control.reset') }}
          </Button>
          <Button
            class="bg-foreground hover:bg-foreground/90 h-14 flex-1 text-sm font-medium tracking-wide uppercase"
            @click.prevent="emit('closeControl')"
          >
            Show {{ totalResults }} Results
          </Button>
        </div>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
