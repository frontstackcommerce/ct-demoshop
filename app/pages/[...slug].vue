<script setup lang="ts">
const { locale } = useI18n()
const nuxtRoute = useRoute()
const { data, type, status, route: fronticRoute } = useFronticPage()

const slug = computed(() => {
  const parts = nuxtRoute.params.slug
  return Array.isArray(parts) ? parts.join('/') : parts || ''
})

const { data: contentPage } = await useAsyncData(`content-${slug.value}-${locale.value}`, () =>
  queryCollection(`pages_${locale.value}` as any)
    .where('stem', '=', `${locale.value}/${slug.value}`)
    .first(),
)

// Handle Frontic 301 redirects
if (fronticRoute.value?.code === 301 && fronticRoute.value.redirect?.path) {
  await navigateTo(fronticRoute.value.redirect.path, { redirectCode: 301 })
}

// Handle Frontic 404
if (fronticRoute.value?.code === 404 && !contentPage.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

const isContentPage = computed(() => !!contentPage.value)
const isFronticPage = computed(
  () =>
    !isContentPage.value && !!type.value && ['Product', 'Brand', 'Category'].includes(type.value),
)
const isHome = computed(
  () => !isContentPage.value && !isFronticPage.value && fronticRoute.value?.code !== 404,
)
</script>

<template>
  <div class="min-h-screen">
    <template v-if="status === 'success'">
      <div v-if="isContentPage" class="container mx-auto min-h-screen max-w-4xl px-5 py-20">
        <h1 class="font-display mb-10 text-3xl font-light capitalize">{{ contentPage!.title }}</h1>
        <div class="prose prose-gray max-w-none">
          <ContentRenderer :value="contentPage!" />
        </div>
      </div>
      <Product v-else-if="type === 'Product'" :product="data" />
      <Brand v-else-if="type === 'Brand'" :brand="data" />
      <Category v-else-if="type === 'Category'" :category="data" />
      <div v-else-if="isHome" class="text-center">
        <Home />
      </div>
    </template>
    <template v-else-if="status === 'error'">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900">{{ $t('error.title') }}</h1>
        <p class="mt-4 text-gray-600">{{ $t('error.description') }}</p>
      </div>
    </template>
  </div>
  <LayoutStoreSuggest />
</template>
