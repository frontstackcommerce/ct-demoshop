<script setup lang="ts">
defineProps<{
  category: {
    title?: string
    link?: PageRoute
  }
  children: any[]
}>()

const emit = defineEmits<{
  (e: 'close' | 'back'): void
  (e: 'show', item: any): void
}>()

// Helper to check if item has children
function hasChildren(item: any): boolean {
  return !!(item?.children?.items && item.children.items.length > 0)
}

// Helper to get name from any item type
function getItemName(item: any): string | undefined {
  return item?.name || item?.label
}

// Helper to get link from any item type
function getItemLink(item: any): PageRoute | undefined {
  return item?.link || (item?.href ? ({ path: item.href } as PageRoute) : undefined)
}
</script>

<template>
  <Separator />
  <div class="bg-background z-20 h-full w-full">
    <p class="mt-3 px-4 text-2xl font-extralight">{{ category?.title }}</p>
    <div class="flex flex-col gap-5 pt-5">
      <div class="flex items-center gap-4 px-5">
        <NuxtLink
          :to="category?.link?.path"
          class="font-display flex w-full items-center justify-between py-5 text-4xl font-light"
          @click.stop="emit('close')"
        >
          <span>{{ $t('actions.show-all') }} {{ category?.title }} </span>

          <IconChevronRight class="size-8" :stroke-width="1" />
        </NuxtLink>
      </div>
      <div v-for="child in children" :key="child.key" class="flex items-center gap-4 p-5">
        <NuxtLink
          v-if="hasChildren(child)"
          class="font-display flex w-full items-center justify-between text-3xl font-light"
          @click.stop="emit('show', child)"
        >
          <span>{{ getItemName(child) }}</span>
          <IconChevronDown class="size-8" :stroke-width="1" />
        </NuxtLink>
        <NuxtLink
          v-else
          :to="getItemLink(child)?.path"
          class="font-display flex w-full items-center justify-between text-3xl font-light"
          @click.stop="emit('close')"
        >
          <span>{{ getItemName(child) }}</span>
          <IconChevronRight class="size-8" :stroke-width="1" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
