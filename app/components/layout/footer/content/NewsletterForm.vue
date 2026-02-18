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
    <h3 class="text-editorial text-2xl lg:text-3xl text-foreground mb-4">
      {{ $t('footer.newsletter.title') }}
    </h3>
    <p class="text-muted-foreground font-light leading-relaxed mb-6">
      {{ $t('footer.newsletter.description') }}
    </p>

    <div class="flex gap-2 mb-4">
      <Input 
        type="email" 
        placeholder="Enter your email" 
        class="h-12 bg-background border-border flex-1"
      />
      <Button class="h-12 px-6 shrink-0">
        Subscribe
      </Button>
    </div>
    
    <div class="flex items-start gap-3">
      <Checkbox id="accept" class="mt-0.5" />
      <label
        for="accept"
        class="text-xs leading-relaxed text-muted-foreground font-light"
      >
        {{ $t('footer.newsletter.accept') }}
        <NuxtLinkLocale
          v-if="links[0]"
          :to="links[0].href"
          class="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
        >{{ links[0].label }}</NuxtLinkLocale>
        {{ $t('footer.newsletter.divider') }}
        <NuxtLinkLocale
          v-if="links[1]"
          :to="links[1].href"
          class="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
        >{{ links[1].label }}</NuxtLinkLocale>
      </label>
    </div>
  </div>
</template>
