<script setup lang="ts">
import { ChevronDown, ChevronRight } from 'lucide-vue-next'

defineProps<{
  category: {
    title?: string
    link?: any
  }
  children: any[]
}>()

const emit = defineEmits<{
  (e: 'close' | 'back'): void
  (e: 'show', item: any): void
}>()

function hasChildren(item: any): boolean {
  return !!(item?.children?.items && item.children.items.length > 0)
}

function getItemName(item: any): string | undefined {
  return item?.name || item?.label
}

function getItemLink(item: any): any {
  return item?.link || (item?.href ? { path: item.href } : undefined)
}
</script>

<template>
  <Separator />
  <div class="z-20 h-full w-full bg-background">
    <div class="flex flex-col gap-5 pt-5">
      <div class="flex items-center gap-4 px-5">
        <NuxtLink
          :to="category?.link?.path"
          class="flex w-full items-center justify-between py-5 font-serif text-3xl font-light"
          @click.stop="emit('close')"
        >
          <span>{{ $t('actions.show-all') }} {{ category?.title }}</span>
          <ChevronRight class="size-8" :stroke-width="1" />
        </NuxtLink>
      </div>
      <div v-for="child in children" :key="child.key" class="flex items-center gap-4 p-5">
        <NuxtLink
          v-if="hasChildren(child)"
          class="flex w-full items-center justify-between font-serif text-3xl font-light"
          @click.stop="emit('show', child)"
        >
          <span>{{ getItemName(child) }}</span>
          <ChevronDown class="size-8" :stroke-width="1" />
        </NuxtLink>
        <NuxtLink
          v-else
          :to="getItemLink(child)?.path"
          class="flex w-full items-center justify-between font-serif text-3xl font-light"
          @click.stop="emit('close')"
        >
          <span>{{ getItemName(child) }}</span>
          <ChevronRight class="size-8" :stroke-width="1" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
