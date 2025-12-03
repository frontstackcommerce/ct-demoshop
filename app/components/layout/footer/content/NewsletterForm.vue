<script setup lang="ts">
const { t, locale } = useI18n()

const links = computed(() => {
  return [
    {
      label: t('footer.newsletter.privacy'),
      href: locale.value === 'de' ? '/datenschutz' : '/privacy',
    },
    {
      label: t('footer.newsletter.terms'),
      href: locale.value === 'de' ? '/nutzungsbedingungen' : '/terms-of-service',
    },
  ]
})
</script>

<template>
  <div class="font-normal">{{ $t('footer.newsletter.title') }}</div>
  <div class="mt-4 flex flex-col gap-4 text-sm">
    <div>{{ $t('footer.newsletter.description') }}</div>

    <div>
      <Input type="email" placeholder="Email Address" />
    </div>
    <div class="flex items-center gap-2">
      <div class="my-4 flex items-center space-x-2">
        <Checkbox id="accept" />
        <label
          for="accept"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {{ $t('footer.newsletter.accept') }}
          <NuxtLink
            v-if="links[0]"
            :to="links[0].href"
            class="text-inverted-foreground underline underline-offset-4"
            >{{ links[0].label }}</NuxtLink
          >
          {{ $t('footer.newsletter.divider') }}
          <NuxtLink
            v-if="links[1]"
            :to="links[1].href"
            class="text-inverted-foreground underline underline-offset-4"
            >{{ links[1].label }}</NuxtLink
          >
        </label>
      </div>
    </div>
  </div>
</template>
