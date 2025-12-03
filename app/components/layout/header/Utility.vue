<script setup lang="ts">
const { utilMenu } = useMenu()
</script>

<template>
  <div class="h-8 items-center bg-inverted text-inverted-foreground sm:grid sm:grid-cols-3">
    <div class="hidden sm:block"></div>
    <div class="flex h-full items-center justify-center text-center text-xs tracking-wide">
      {{ $t('header.teaser') }}
    </div>
    <div class="hidden h-full items-center justify-end divide-x divide-border text-xs sm:flex">
      <SharedStorePicker>
        <SharedStorePickerTrigger size="sm" collapsed inverted />
      </SharedStorePicker>
      <NuxtLink
        v-for="(item, index) in utilMenu"
        :key="index"
        :to="item.href"
        class="flex h-full items-center px-4"
      >
        {{ item.label }}
      </NuxtLink>
    </div>
  </div>
</template>
