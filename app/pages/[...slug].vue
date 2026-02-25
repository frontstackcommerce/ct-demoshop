<script setup lang="ts">
const { locale } = useI18n()
const route = useRoute()
const { data, type, status } = useFronticPage()

const slug = computed(() => {
  const parts = route.params.slug
  return Array.isArray(parts) ? parts.join('/') : parts || ''
})

const { data: contentPage } = await useAsyncData(`content-${slug.value}-${locale.value}`, () =>
  queryCollection(`pages_${locale.value}` as any)
    .where('stem', '=', `${locale.value}/${slug.value}`)
    .first(),
)

const isFronticPage = computed(
  () => !!type.value && ['Product', 'Brand', 'Category'].includes(type.value),
)
const isContentPage = computed(() => !isFronticPage.value && !!contentPage.value)
const isHome = computed(() => !isFronticPage.value && !isContentPage.value)
</script>

<template>
  <div class="min-h-screen">
    <template v-if="status === 'success'">
      <Product v-if="type === 'Product'" :product="data" />
      <Brand v-else-if="type === 'Brand'" :brand="data" />
      <Category v-else-if="type === 'Category'" :category="data" />
      <div v-else-if="isContentPage" class="container mx-auto min-h-screen max-w-4xl px-5 py-20">
        <h1 class="font-display mb-10 text-3xl font-light capitalize">{{ contentPage!.title }}</h1>
        <div class="prose prose-gray max-w-none">
          <ContentRenderer :value="contentPage!" />
        </div>
      </div>
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
  <!-- <p>
    <span class="block sm:hidden">XS</span><span class="hidden sm:block md:hidden">SM</span
    ><span class="hidden md:block lg:hidden">MD</span
    ><span class="hidden lg:block xl:hidden">LG</span
    ><span class="hidden xl:block 2xl:hidden">XL</span><span class="hidden 2xl:block">2XL</span>
  </p> -->
  <LayoutStoreSuggest />
</template>
