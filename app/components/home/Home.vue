<script setup lang="ts">
const { t } = useI18n()
const { fullTree } = useShopMenu()

const images = [
  'https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Ivory_Lounge_Chair-1.3.jpeg',
  'https://a.storyblok.com/f/282508/x/baaa9b88cd/vitra-bild.avif',
  'https://a.storyblok.com/f/282508/1536x1024/9eb7427a46/trivaro-hero.png',
  'https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Rattan_Lounge_Chair-1.2.jpeg'

]

const categories = computed(() => {

  const childrenFlat = fullTree.value?.items?.flatMap((item) => item.children?.items ?? [])

  // Return first 4 main categories and append 2 children (add images to the children)
  return [...(fullTree.value?.items?.slice(0, 4) ?? []), ...(childrenFlat?.slice(0, 4) ?? []).map((item, index) => ({
    ...item,
    image: { src: images[index] }
  }))]
})

const livingProducts = [
  {
    image: 'https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Traditional_L_Seater_Sofa-1.3.jpeg',
    link: '/traditional-l-seater-sofa'
  },
  {
    image: 'https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Braided_Rug-1.2.jpeg',
    link: '/braided-rug'
  },
  {
    image: 'https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Jute_Rug-1.3.jpeg',
    link: '/jute-rug'
  },
]
</script>

<template>
  <div class="min-h-screen flex flex-col gap-20">
    <div class="w-full max-h-[680px] overflow-hidden relative">
      <NuxtImg src="https://a.storyblok.com/f/282508/1536x1024/b44eabb6eb/furniture.png"
        :alt="$t('home.hero.imageAlt')" class="max-h-[680px] w-full object-cover" />

      <div class="absolute inset-0 flex items-center justify-center flex-col gap-8">
        <h1 class="font-display text-4xl text-white max-w-2xl text-center">
          {{ $t('home.hero.title') }}
        </h1>
        <Button class="border-slate-100 text-slate-100" variant="outline" size="lg">
          {{ $t('home.hero.button') }}
        </Button>
      </div>

    </div>

    <div class="flex flex-col gap-8 px-12">
      <h2 class="text-left font-display text-2xl text-gray-800">
        {{ $t('home.categories.title') }}
      </h2>
      <div class="grid grid-cols-8 gap-4">
        <div v-for="item in categories" :key="item.key">
          <NuxtLink :to="item.link?.path ?? ''" class="flex flex-col gap-2 text-left">
            <NuxtImg :src="item.image?.src" :alt="item.name" class="w-full aspect-[0.75] object-cover shadow-xs" />
            <p class="font-light uppercase text-slate-500">{{ item.name }}</p>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div>
      <div class="grid grid-cols-2 h-screen">

        <div class="bg-gray-200 overflow-hidden relative">
          <NuxtImg :src="livingProducts[1]?.image" class="h-full w-full object-cover shadow-xs" />
          <NuxtLink :to="livingProducts[1]?.link">
            <div class="absolute inset-0 flex items-start justify-end p-8 flex-col text-gray-800 font-display text-5xl text-white text-shadow-lg">
              {{ $t('home.featured.homeBraid') }}
            </div>
          </NuxtLink>
        </div>
        <div class="bg-gray-300 grid grid-rows-2 overflow-hidden">
          <div class="bg-gray-400 overflow-hidden relative">
            <NuxtImg :src="livingProducts[0]?.image" class="h-full w-full object-cover shadow-xs" />
            <NuxtLink :to="livingProducts[0]?.link">
              <div class="absolute inset-0 flex items-start justify-end p-8 flex-col text-gray-800 font-display text-5xl text-white text-shadow-lg">
                {{ $t('home.featured.loungeFurniture') }}
              </div>
            </NuxtLink>
          </div>
          <div class="bg-gray-500 overflow-hidden relative">
            <NuxtImg :src="livingProducts[2]?.image" class="h-full w-full object-cover shadow-xs" />
            <NuxtLink :to="livingProducts[2]?.link">
              <div class="absolute inset-0 flex items-start justify-end p-8 flex-col text-gray-800 font-display text-5xl text-white text-shadow-lg">
                {{ $t('home.featured.rugs') }}
              </div>
            </NuxtLink>
          </div>
        </div>

      </div>
    </div>


    <div class="flex flex-col gap-4 px-12 text-left pb-20">
      <p class="font-light uppercase text-slate-500">
        {{ $t('home.newArrivals.label') }}
      </p>
      <h2 class="text-left font-display text-5xl text-gray-800">
        {{ $t('home.newArrivals.title') }}
      </h2>
      <div class="pt-4">
        <NuxtLink to="/new-arrivals">
          <Button variant="default" class="font-light">
            {{ $t('home.newArrivals.button') }}
          </Button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
