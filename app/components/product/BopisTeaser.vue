<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="group relative flex flex-col h-full">
    <!-- Match product card aspect ratio -->
    <div class="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-emerald-50 via-emerald-50/80 to-teal-50 mb-4 flex flex-col items-center justify-center p-6 text-center">
      <!-- Decorative background pattern -->
      <div class="absolute inset-0 opacity-[0.04]" style="background-image: radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0); background-size: 24px 24px;" />

      <!-- Icon -->
      <div class="relative mb-5">
        <div class="size-16 rounded-full bg-emerald-100/80 flex items-center justify-center ring-1 ring-emerald-200/40">
          <IconStore class="size-7 text-emerald-700" />
        </div>
      </div>

      <!-- Content -->
      <div class="relative space-y-3">
        <p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-600/80">
          {{ t('bopis.teaser.label') }}
        </p>
        <h3 class="text-lg font-serif text-emerald-900 leading-snug">
          {{ t('bopis.teaser.title') }}
        </h3>
        <p class="text-xs text-emerald-700/70 leading-relaxed max-w-[200px] mx-auto">
          {{ t('bopis.teaser.description') }}
        </p>
      </div>

      <!-- Features -->
      <div class="relative mt-5 space-y-2">
        <div class="flex items-center gap-2 text-xs text-emerald-700/80">
          <IconCircleCheck class="size-3.5 text-emerald-600 flex-shrink-0" />
          <span>{{ t('bopis.teaser.freePickup') }}</span>
        </div>
        <div class="flex items-center gap-2 text-xs text-emerald-700/80">
          <IconClock class="size-3.5 text-emerald-600 flex-shrink-0" />
          <span>{{ t('bopis.teaser.readyTime') }}</span>
        </div>
        <div class="flex items-center gap-2 text-xs text-emerald-700/80">
          <IconMapPin class="size-3.5 text-emerald-600 flex-shrink-0" />
          <span>{{ t('bopis.teaser.findStore') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
