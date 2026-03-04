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
  <div class="max-w-md">
    <h3 class="font-serif text-2xl text-foreground lg:text-3xl">
      {{ $t('footer.newsletter.title') }}
    </h3>
    <p class="mb-6 mt-4 font-light leading-relaxed text-muted-foreground">
      {{ $t('footer.newsletter.description') }}
    </p>
    <div class="mb-4 flex gap-2">
      <Input
        type="email"
        placeholder="Enter your email"
        class="h-12 flex-1 border-border bg-background"
      />
      <Button class="h-12 shrink-0 px-6">
        {{ $t('actions.subscribe') }}
      </Button>
    </div>
    <div class="flex items-start gap-3">
      <Checkbox id="accept" class="mt-0.5" />
      <label for="accept" class="text-xs font-light leading-relaxed text-muted-foreground">
        {{ $t('footer.newsletter.accept') }}
        <NuxtLinkLocale
          v-if="links[0]"
          :to="links[0].href"
          class="text-foreground underline underline-offset-4 transition-colors hover:text-primary"
        >{{ links[0].label }}</NuxtLinkLocale>
        {{ $t('footer.newsletter.divider') }}
        <NuxtLinkLocale
          v-if="links[1]"
          :to="links[1].href"
          class="text-foreground underline underline-offset-4 transition-colors hover:text-primary"
        >{{ links[1].label }}</NuxtLinkLocale>
      </label>
    </div>
  </div>
</template>
