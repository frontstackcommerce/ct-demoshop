<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void
}>()

const { closeMenu } = useShopMenu()
const { t } = useI18n()

const _close = () => {
  emit('close')
  closeMenu()
}

const suggestions = t('search.suggestions').split(',')

// TODO: wire up useFronticSearch when ready
const searchTerm = ref('')
</script>

<template>
  <div class="mt-4 px-4">
    <LayoutDrawerSearchInput v-model="searchTerm" />
  </div>

  <div class="flex flex-col gap-6">
    <ScrollArea class="h-[calc(100vh)] md:h-[calc(100vh-10rem)]">
      <div v-if="!searchTerm.length" class="px-4">
        <div class="mb-3 font-serif text-lg md:text-2xl">{{ $t('search.suggest') }}</div>
        <div class="flex flex-wrap gap-2">
          <Button
            v-for="suggestion in suggestions"
            :key="suggestion"
            variant="outline"
            class="flex items-center gap-2 font-serif font-light capitalize"
            @click="searchTerm = suggestion.trim()"
          >
            {{ suggestion.trim() }}
          </Button>
        </div>
      </div>
      <div v-else class="px-4 pb-60 md:pb-48">
        <div class="mb-3 font-serif text-lg md:text-2xl">{{ $t('search.results') }}</div>
        <!-- TODO: product grid will go here when search composable is ready -->
        <p class="text-muted-foreground">{{ $t('search.empty') }}</p>
      </div>
    </ScrollArea>
  </div>
</template>
