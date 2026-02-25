<script setup lang="ts">
import { Search, Settings2, X } from 'lucide-vue-next'
import { VisuallyHidden } from 'reka-ui'
import { useFocus } from '@vueuse/core'

defineProps<{
  category?: string
  state: {
    active: { filter: Record<string, any>; count: { filter: number } }
    available: { filter: any[]; sorting: any[]; count: { result: number } }
  }
  searchTerm: string
}>()

const open = defineModel<boolean>('open')
const autoFocus = ref<HTMLInputElement>()

const emit = defineEmits<{
  reset: [filterField?: string]
  filter: [filterField: string, filterOptions: string[]]
  sort: [sortBy: string]
  search: [term: string | number]
  close: []
}>()

const handleReset = (filterField?: string) => {
  emit('reset', filterField)
}

const handleFilter = (filterField: string, filterOptions: string[]) => {
  emit('filter', filterField, filterOptions)
}

const handleSort = (sortBy: any) => {
  emit('sort', String(sortBy))
}

const handleSearch = (newTerm: string | number) => {
  emit('search', newTerm)
}

function handleClearSearch() {
  handleSearch('')
  nextTick(() => {
    useFocus(autoFocus, { initialValue: true })
  })
}
</script>

<template>
  <Sheet v-model:open="open">
    <SheetTrigger as-child>
      <Button variant="link" class="relative flex items-center gap-2">
        <Settings2 :size="16" />
        {{ $t('control.button') }}
        <ClientOnly>
          <div
            v-if="state.active.count.filter > 0"
            class="bg-active absolute top-[-0.4em] right-[-0.4em] flex size-5 items-center justify-center rounded-full text-xs"
          >
            <span class="text-active-foreground">{{ state.active.count.filter }}</span>
          </div>
        </ClientOnly>
      </Button>
    </SheetTrigger>
    <SheetContent class="flex flex-col">
      <VisuallyHidden as-child>
        <SheetTitle>{{ $t('control.button') }}</SheetTitle>
      </VisuallyHidden>
      <VisuallyHidden as-child>
        <SheetDescription>{{ $t('control.filters.title') }}</SheetDescription>
      </VisuallyHidden>
      <ScrollArea class="flex-1">
        <div class="sm:pt-12">
          <div class="mb-4 p-4">
            <p class="font-display mb-5 text-2xl leading-none font-semibold">
              {{ $t('control.sort.title') }}
            </p>
            <RadioGroup default-value="default" class="gap-y-2.5" @update:model-value="handleSort">
              <div
                v-for="sortOption in state.available.sorting"
                :key="sortOption.key"
                class="flex items-center space-x-4"
              >
                <RadioGroupItem :id="sortOption.key" :value="sortOption.value" />
                <Label
                  :for="sortOption.key"
                  class="text-lg font-medium sm:text-base sm:font-normal"
                >
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
                @update:model-value="handleSearch"
              />
              <span class="absolute inset-y-0 inset-s-3 flex items-center justify-center">
                <Search class="text-muted-foreground size-5" />
              </span>
              <span
                v-if="searchTerm.length > 0"
                class="absolute inset-y-0 inset-e-3 flex items-center justify-center"
              >
                <Button size="sm" variant="icon" @click="handleClearSearch">
                  <X class="text-muted-foreground size-6" />
                </Button>
              </span>
            </div>
          </template>
          <Separator class="my-5" />

          <p class="font-display mb-3 px-4 text-2xl leading-none font-semibold">
            {{ $t('control.filters.title') }}
          </p>

          <div class="">
            <div v-for="filter in state.available.filter" :key="filter.key">
              <SearchRefineFilterText
                :filter-field="filter.key"
                :filter-options="filter.options"
                :active-options="state.active.filter?.[filter.key] ?? []"
                @reset-filter="handleReset"
                @filter-result="handleFilter"
              >
                <div class="mr-8 ml-4 flex w-full justify-between py-3">
                  <span class="text-lg font-medium">{{ filter.label }}</span>
                  <span>
                    <SearchRefineFilterPreview
                      :selected-options="state.active.filter?.[filter.key] ?? []"
                    />
                  </span>
                </div>
              </SearchRefineFilterText>
            </div>
          </div>
        </div>
      </ScrollArea>
      <SheetFooter class="mt-auto">
        <div class="flex items-center gap-2 sm:flex-col sm:gap-3">
          <Button size="xl" class="sm:w-full" @click.prevent="emit('close')">
            <span class="hidden sm:block">{{
              $t('control.submit', { count: state.available.count.result })
            }}</span>
            <span class="block sm:hidden"
              >{{ $t('control.submit-sm') }}
              {{ $t('default.in-brackets', { text: state.available.count.result }) }}</span
            >
          </Button>
          <Button
            size="xl"
            variant="outline"
            :disabled="!state.active.count.filter"
            class="sm:w-full"
            @click.prevent="emit('reset')"
          >
            <span class="hidden sm:block">{{ $t('control.reset') }}</span>
            <span class="block sm:hidden">{{ $t('control.reset-sm') }}</span>
          </Button>
        </div>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
