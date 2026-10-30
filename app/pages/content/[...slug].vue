<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()

const slug = computed(() => {
  const params = route.params.slug
  return Array.isArray(params) ? params.join('/') : params
})

const { data: page } = await useAsyncData(`content-${slug.value}-${locale.value}`, () =>
  queryCollection(`pages_${locale.value}`).path(`/${locale.value}/${slug.value}`).first(),
)
</script>

<template>
  <div class="container mx-auto min-h-screen max-w-4xl px-6 py-20">
    <template v-if="page">
      <h1 class="font-serif text-4xl font-light text-foreground">{{ page.title }}</h1>
      <p v-if="page.description" class="mt-4 text-lg text-muted-foreground">
        {{ page.description }}
      </p>
      <div class="prose prose-warm mt-12 max-w-none">
        <ContentRenderer :value="page" />
      </div>
    </template>
    <template v-else>
      <h1 class="font-serif text-3xl font-light capitalize text-foreground">{{ slug }}</h1>
      <p class="mt-4 text-muted-foreground">{{ $t('error.not-found.description') }}</p>
    </template>
  </div>
</template>
