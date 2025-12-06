<script setup lang="ts">
import { useFocus } from '@vueuse/core'
const { searchTerm } = useProductSearch()
const autoFocus = ref<HTMLInputElement>()
const isFocused = ref(false)

const emit = defineEmits<{
  (e: 'focus' | 'blur'): void
}>()

function clearSearch() {
  searchTerm.value = ''
  nextTick(() => {
    useFocus(autoFocus, { initialValue: true })
  })
}

function handleFocus() {
  isFocused.value = true
  emit('focus')
}

function handleBlur() {
  isFocused.value = false
  emit('blur')
}

// TODO: fix autofocus since when active the input os scrolling out of the view within the navigation (ios native keyboard appears and scrolls the input out of the view)
// onMounted(() => {
//   nextTick(() => {
//     useFocus(autoFocus, { initialValue: true })
//   })
// })
</script>

<template>
  <div class="relative w-full items-center">
    <Input
      ref="autoFocus"
      v-model="searchTerm"
      :placeholder="$t('search.placeholder')"
      class="bg-shade border-b-foreground border-t-0 border-r-0 border-b border-l-0 py-6 pr-5 pl-10 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 active:ring-0"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <span class="absolute inset-y-0 start-3 flex items-center justify-center">
      <IconSearch class="text-muted-foreground size-5" />
    </span>
    <span
      v-if="searchTerm.length > 0"
      class="absolute inset-y-0 end-3 flex items-center justify-center"
    >
      <Button size="sm" variant="icon" @click="clearSearch">
        <IconX class="text-shade-300 size-5" />
      </Button>
    </span>
  </div>
</template>
