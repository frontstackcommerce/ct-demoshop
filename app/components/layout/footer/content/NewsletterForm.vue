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
    <h3 class="text-editorial text-foreground mb-4 text-2xl lg:text-3xl">
      {{ $t('footer.newsletter.title') }}
    </h3>
    <p class="text-muted-foreground mb-6 leading-relaxed font-light">
      {{ $t('footer.newsletter.description') }}
    </p>

    <div class="mb-4 flex gap-2">
      <Input
        type="email"
        placeholder="Enter your email"
        class="bg-background border-border h-12 flex-1"
      />
      <Button class="h-12 shrink-0 px-6"> Subscribe </Button>
    </div>

    <div class="flex items-start gap-3">
      <Checkbox id="accept" class="mt-0.5" />
      <label for="accept" class="text-muted-foreground text-xs leading-relaxed font-light">
        {{ $t('footer.newsletter.accept') }}
        <NuxtLinkLocale
          v-if="links[0]"
          :to="links[0].href"
          class="text-foreground hover:text-primary underline underline-offset-4 transition-colors"
          >{{ links[0].label }}</NuxtLinkLocale
        >
        {{ $t('footer.newsletter.divider') }}
        <NuxtLinkLocale
          v-if="links[1]"
          :to="links[1].href"
          class="text-foreground hover:text-primary underline underline-offset-4 transition-colors"
          >{{ links[1].label }}</NuxtLinkLocale
        >
      </label>
    </div>
  </div>
</template>
