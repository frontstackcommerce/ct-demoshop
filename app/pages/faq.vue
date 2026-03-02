<script setup lang="ts">
defineI18nRoute({
  paths: {
    de: '/haeufige-fragen',
  },
})
const { locale } = useI18n()

const collectionName = computed(() => `faq_${locale.value}`)
const { data: faq } = await useAsyncData(`faq-${locale.value}`, () =>
  queryCollection(collectionName.value as any).first(),
)
</script>

<template>
  <div class="container mx-auto min-h-screen max-w-4xl px-5 py-20">
    <template v-if="faq">
      <h1 class="font-display mb-2 text-3xl font-light">{{ faq.title.line1 }}</h1>
      <h2 class="font-display mb-10 text-3xl font-light text-gray-500">{{ faq.title.line2 }}</h2>

      <Accordion type="single" collapsible>
        <AccordionItem v-for="(item, index) in faq.items" :key="index" :value="`faq-${index}`">
          <AccordionTrigger class="text-lg">{{ item.question }}</AccordionTrigger>
          <AccordionContent>
            <p class="leading-relaxed text-gray-600">{{ item.answer }}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </template>
  </div>
</template>
