<script setup lang="ts">
const { locale } = useI18n()
const { listing: fullTree } = useFronticListing('MenuTree', {})

const contentCollection = computed(() => `home_${locale.value}`)
const { data: homeContent } = await useAsyncData(`home-${locale.value}`, () =>
  queryCollection(contentCollection.value as any).first(),
)

const categories = computed(() => {
  const images = homeContent.value?.categoryImages ?? []
  const childrenFlat = fullTree.value?.items?.flatMap((item: any) => item.children?.items ?? [])

  // Return first 4 main categories and append 4 children (add images to the children)
  return [
    ...(fullTree.value?.items?.slice(0, 4) ?? []),
    ...(childrenFlat?.slice(0, 4) ?? []).map((item: any, index: number) => ({
      ...item,
      image: { src: images[index] },
    })),
  ]
})

const featured = computed(() => homeContent.value?.featured ?? [])
</script>

<template>
  <div class="flex min-h-screen flex-col gap-20">
    <div class="relative max-h-[680px] w-full overflow-hidden">
      <NuxtImg
        :src="homeContent?.hero?.image"
        :alt="homeContent?.hero?.imageAlt"
        class="max-h-[680px] w-full object-cover"
      />

      <div class="absolute inset-0 flex flex-col items-center justify-center gap-8">
        <h1 class="font-display max-w-2xl text-center text-4xl text-white">
          {{ homeContent?.hero?.title }}
        </h1>
        <Button class="border-slate-100 text-slate-100" variant="outline" size="lg">
          {{ homeContent?.hero?.button }}
        </Button>
      </div>
    </div>

    <div class="flex flex-col gap-8 px-4 sm:px-12">
      <h2 class="font-display text-left text-2xl text-gray-800">
        {{ homeContent?.categories?.title }}
      </h2>
      <div class="grid grid-cols-2 gap-4 md:hidden">
        <div v-for="item in categories.slice(0, 4)" :key="item.key">
          <NuxtLink :to="item.link?.path ?? ''" class="flex flex-col gap-2 text-left">
            <NuxtImg
              :src="item.image?.src"
              :alt="item.name"
              class="aspect-[0.75] w-full object-cover shadow-xs"
            />
            <p class="font-light text-slate-500 uppercase">{{ item.name }}</p>
          </NuxtLink>
        </div>
      </div>
      <div class="grid-cols-4 gap-4 md:grid lg:hidden">
        <div v-for="item in categories" :key="item.key">
          <NuxtLink :to="item.link?.path ?? ''" class="flex flex-col gap-2 text-left">
            <NuxtImg
              :src="item.image?.src"
              :alt="item.name"
              class="aspect-[0.75] w-full object-cover shadow-xs"
            />
            <p class="font-light text-slate-500 uppercase">{{ item.name }}</p>
          </NuxtLink>
        </div>
      </div>
      <div class="hidden grid-cols-8 gap-4 lg:grid">
        <div v-for="item in categories" :key="item.key">
          <NuxtLink :to="item.link?.path ?? ''" class="flex flex-col gap-2 text-left">
            <NuxtImg
              :src="item.image?.src"
              :alt="item.name"
              class="aspect-[0.75] w-full object-cover shadow-xs"
            />
            <p class="font-light text-slate-500 uppercase">{{ item.name }}</p>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div>
      <div class="grid h-screen grid-cols-1 sm:grid-cols-2">
        <div class="relative overflow-hidden bg-gray-200">
          <NuxtImg :src="featured[1]?.image" class="h-full w-full object-cover shadow-xs" />
          <NuxtLink :to="featured[1]?.link">
            <div
              class="font-display absolute inset-0 flex flex-col items-start justify-end p-8 text-5xl text-gray-800 text-white text-shadow-lg"
            >
              {{ featured[1]?.label }}
            </div>
          </NuxtLink>
        </div>
        <div class="grid grid-rows-1 overflow-hidden bg-gray-300 sm:grid-rows-2">
          <div class="relative overflow-hidden bg-gray-400">
            <NuxtImg :src="featured[0]?.image" class="h-full w-full object-cover shadow-xs" />
            <NuxtLink :to="featured[0]?.link">
              <div
                class="font-display absolute inset-0 flex flex-col items-start justify-end p-8 text-5xl text-gray-800 text-white text-shadow-lg"
              >
                {{ featured[0]?.label }}
              </div>
            </NuxtLink>
          </div>
          <div class="relative hidden overflow-hidden bg-gray-500 sm:block">
            <NuxtImg :src="featured[2]?.image" class="h-full w-full object-cover shadow-xs" />
            <NuxtLink :to="featured[2]?.link">
              <div
                class="font-display absolute inset-0 flex flex-col items-start justify-end p-8 text-5xl text-gray-800 text-white text-shadow-lg"
              >
                {{ featured[2]?.label }}
              </div>
            </NuxtLink>
          </div>
        </div>
        <div class="relative block overflow-hidden bg-gray-500 sm:hidden">
          <NuxtImg :src="featured[2]?.image" class="h-full w-full object-cover shadow-xs" />
          <NuxtLink :to="featured[2]?.link">
            <div
              class="font-display absolute inset-0 flex flex-col items-start justify-end p-8 text-5xl text-gray-800 text-white text-shadow-lg"
            >
              {{ featured[2]?.label }}
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-4 px-12 pb-20 text-left">
      <p class="font-light text-slate-500 uppercase">
        {{ homeContent?.newArrivals?.label }}
      </p>
      <h2 class="font-display text-left text-5xl text-gray-800">
        {{ homeContent?.newArrivals?.title }}
      </h2>
      <div class="pt-4">
        <NuxtLink to="/new-arrivals">
          <Button variant="default" class="font-light">
            {{ homeContent?.newArrivals?.button }}
          </Button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
