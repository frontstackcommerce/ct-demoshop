<script setup lang="ts">
const { fullTree } = useShopMenu()

const images = [
  'https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Ivory_Lounge_Chair-1.3.jpeg',
  'https://a.storyblok.com/f/282508/x/baaa9b88cd/vitra-bild.avif',
  'https://a.storyblok.com/f/282508/1536x1024/9eb7427a46/trivaro-hero.png',
  'https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Rattan_Lounge_Chair-1.2.jpeg',
]

const categories = computed(() => {
  const childrenFlat = fullTree.value?.items?.flatMap((item: any) => item.children?.items ?? [])

  // Return first 4 main categories and append 2 children (add images to the children)
  return [
    ...(fullTree.value?.items?.slice(0, 4) ?? []),
    ...(childrenFlat?.slice(0, 4) ?? []).map((item: any, index: number) => ({
      ...item,
      image: { src: images[index] },
    })),
  ]
})

const livingProducts = [
  {
    image: 'https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Traditional_L_Seater_Sofa-1.3.jpeg',
    link: '/traditional-l-seater-sofa',
  },
  {
    image: 'https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Braided_Rug-1.2.jpeg',
    link: '/braided-rug',
  },
  {
    image: 'https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Jute_Rug-1.3.jpeg',
    link: '/jute-rug',
  },
]
</script>

<template>
  <div class="flex min-h-screen flex-col gap-20">
    <div class="relative max-h-[680px] w-full overflow-hidden">
      <NuxtImg src="https://a.storyblok.com/f/282508/1536x1024/b44eabb6eb/furniture.png" :alt="$t('home.hero.image-alt')" class="max-h-[680px] w-full object-cover" />

      <div class="absolute inset-0 flex flex-col items-center justify-center gap-8">
        <h1 class="font-display max-w-2xl text-center text-4xl text-white">
          {{ $t('home.hero.title') }}
        </h1>
        <Button class="border-slate-100 text-slate-100" variant="outline" size="lg">
          {{ $t('home.hero.button') }}
        </Button>
      </div>
    </div>

    <div class="flex flex-col gap-8 px-4 sm:px-12">
      <h2 class="font-display text-left text-2xl text-gray-800">
        {{ $t('home.categories.title') }}
      </h2>
      <div class="grid grid-cols-2 gap-4 md:hidden">
        <div v-for="item in categories.slice(0, 4)" :key="item.key">
          <NuxtLink :to="item.link?.path ?? ''" class="flex flex-col gap-2 text-left">
            <NuxtImg :src="item.image?.src" :alt="item.name" class="aspect-[0.75] w-full object-cover shadow-xs" />
            <p class="font-light text-slate-500 uppercase">{{ item.name }}</p>
          </NuxtLink>
        </div>
      </div>
      <div class="grid-cols-4 gap-4 md:grid lg:hidden">
        <div v-for="item in categories" :key="item.key">
          <NuxtLink :to="item.link?.path ?? ''" class="flex flex-col gap-2 text-left">
            <NuxtImg :src="item.image?.src" :alt="item.name" class="aspect-[0.75] w-full object-cover shadow-xs" />
            <p class="font-light text-slate-500 uppercase">{{ item.name }}</p>
          </NuxtLink>
        </div>
      </div>
      <div class="hidden grid-cols-8 gap-4 lg:grid">
        <div v-for="item in categories" :key="item.key">
          <NuxtLink :to="item.link?.path ?? ''" class="flex flex-col gap-2 text-left">
            <NuxtImg :src="item.image?.src" :alt="item.name" class="aspect-[0.75] w-full object-cover shadow-xs" />
            <p class="font-light text-slate-500 uppercase">{{ item.name }}</p>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div>
      <div class="grid h-screen grid-cols-1 sm:grid-cols-2">
        <div class="relative overflow-hidden bg-gray-200">
          <NuxtImg :src="livingProducts[1]?.image" class="h-full w-full object-cover shadow-xs" />
          <NuxtLink :to="livingProducts[1]?.link">
            <div class="font-display absolute inset-0 flex flex-col items-start justify-end p-8 text-5xl text-gray-800 text-white text-shadow-lg">
              {{ $t('home.featured.home-braid') }}
            </div>
          </NuxtLink>
        </div>
        <div class="grid grid-rows-1 overflow-hidden bg-gray-300 sm:grid-rows-2">
          <div class="relative overflow-hidden bg-gray-400">
            <NuxtImg :src="livingProducts[0]?.image" class="h-full w-full object-cover shadow-xs" />
            <NuxtLink :to="livingProducts[0]?.link">
              <div class="font-display absolute inset-0 flex flex-col items-start justify-end p-8 text-5xl text-gray-800 text-white text-shadow-lg">
                {{ $t('home.featured.lounge-furniture') }}
              </div>
            </NuxtLink>
          </div>
          <div class="relative hidden overflow-hidden bg-gray-500 sm:block">
            <NuxtImg :src="livingProducts[2]?.image" class="h-full w-full object-cover shadow-xs" />
            <NuxtLink :to="livingProducts[2]?.link">
              <div class="font-display absolute inset-0 flex flex-col items-start justify-end p-8 text-5xl text-gray-800 text-white text-shadow-lg">
                {{ $t('home.featured.rugs') }}
              </div>
            </NuxtLink>
          </div>
        </div>
        <div class="relative block overflow-hidden bg-gray-500 sm:hidden">
          <NuxtImg :src="livingProducts[2]?.image" class="h-full w-full object-cover shadow-xs" />
          <NuxtLink :to="livingProducts[2]?.link">
            <div class="font-display absolute inset-0 flex flex-col items-start justify-end p-8 text-5xl text-gray-800 text-white text-shadow-lg">
              {{ $t('home.featured.rugs') }}
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-4 px-12 pb-20 text-left">
      <p class="font-light text-slate-500 uppercase">
        {{ $t('home.new-arrivals.label') }}
      </p>
      <h2 class="font-display text-left text-5xl text-gray-800">
        {{ $t('home.new-arrivals.title') }}
      </h2>
      <div class="pt-4">
        <NuxtLink to="/new-arrivals">
          <Button variant="default" class="font-light">
            {{ $t('home.new-arrivals.button') }}
          </Button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
