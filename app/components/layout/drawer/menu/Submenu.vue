<script setup lang="ts">
defineProps<{
  category: CategoryPage
  children: CategoryChildList
}>()

const emit = defineEmits<{
  (e: 'close' | 'back'): void
  (e: 'show', key: string): void
}>()
</script>

<template>
  <Separator />
  <div class="z-20 h-full w-full bg-background">
    <p class="mt-3 px-4 text-xl font-semibold">{{ category?.title }}</p>
    <div class="flex flex-col gap-5 pt-5">
      <div class="flex items-center gap-4 px-5">
        <div class="h-20 w-32 rounded-full border bg-shade-100">
          <NuxtImg
            :src="`${swImageSrc(category?.cover)}`"
            alt="Icon"
            class="size-full rounded-lg object-cover"
          />
        </div>

        <NuxtLink
          :to="category?.link?.path"
          class="flex w-full items-center justify-between text-xl font-semibold"
          @click.stop="emit('close')"
        >
          <span>{{ $t('actions.show-all') }} {{ category?.title }} </span>

          <IconChevronRight class="size-8" :stroke-width="1" />
        </NuxtLink>
      </div>
      <div v-for="child in children.items" :key="child.key" class="flex items-center gap-4 px-5">
        <div class="h-20 w-32 rounded-full border bg-shade-100">
          <NuxtImg
            :src="`${swImageSrc(child.cover)}`"
            alt="Icon"
            class="size-full rounded-lg object-cover"
          />
        </div>
        <NuxtLink
          v-if="child.childCount && child.childCount > 0"
          class="flex w-full items-center justify-between text-xl font-medium"
          @click.stop="emit('show', child.key)"
        >
          <span>{{ child.title }}</span>
          <IconChevronDown class="size-8" :stroke-width="1" />
        </NuxtLink>
        <NuxtLink
          v-else
          :to="child.link?.path"
          class="flex w-full items-center justify-between text-xl font-medium"
          @click.stop="emit('close')"
        >
          <span>{{ child.title }}</span>
          <IconChevronRight class="size-8" :stroke-width="1" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
