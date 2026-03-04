<script setup lang="ts">
import { Search, X } from 'lucide-vue-next'

const searchTerm = defineModel<string>({ default: '' })

function clearSearch() {
  searchTerm.value = ''
}
</script>

<template>
  <div class="relative w-full items-center">
    <Input
      v-model="searchTerm"
      :placeholder="$t('search.placeholder')"
      class="border-t-0 border-r-0 border-b border-l-0 border-b-foreground bg-shade py-6 pr-5 pl-10 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 active:ring-0"
    />
    <span class="absolute inset-y-0 start-3 flex items-center justify-center">
      <Search class="size-5 text-muted-foreground" />
    </span>
    <span
      v-if="searchTerm.length > 0"
      class="absolute inset-y-0 end-3 flex items-center justify-center"
    >
      <Button size="sm" variant="ghost" @click="clearSearch">
        <X class="size-5 text-shade-300" />
      </Button>
    </span>
  </div>
</template>
