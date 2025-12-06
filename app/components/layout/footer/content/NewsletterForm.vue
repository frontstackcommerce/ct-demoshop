<script setup lang="ts">
const { t } = useI18n()

const links = computed(() => {
  return [
    {
      label: t('footer.newsletter.privacy'),
      href: '/content/privacy-policy',
    },
    {
      label: t('footer.newsletter.terms'),
      href: '/content/terms-of-service',
    },
  ]
})
</script>

<template>
  <div class="font-display">{{ $t('footer.newsletter.title') }}</div>
  <div class="mt-4 flex flex-col gap-4 text-sm">
    <div class="pr-10">{{ $t('footer.newsletter.description') }}</div>

    <div class="max-w-64">
      <Input type="email" placeholder="Email Address" />
    </div>
    <div class="flex items-center gap-2">
      <div class="flex items-center space-x-2">
        <Checkbox id="accept" />
        <label
          for="accept"
          class="text-xs leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {{ $t('footer.newsletter.accept') }}
          <NuxtLinkLocale
            v-if="links[0]"
            :to="links[0].href"
            class="text-inverted-foreground underline underline-offset-4"
            >{{ links[0].label }}</NuxtLinkLocale
          >
          {{ $t('footer.newsletter.divider') }}
          <NuxtLinkLocale
            v-if="links[1]"
            :to="links[1].href"
            class="text-inverted-foreground underline underline-offset-4"
            >{{ links[1].label }}</NuxtLinkLocale
          >
        </label>
      </div>
    </div>
  </div>
</template>
