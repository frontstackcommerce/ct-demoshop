<script setup lang="ts">
const props = defineProps<{
  categoryId: string
}>()

function closeMenu() {
  console.log('closeMenu')
}

const categories = ref<CategoryCard['children']>([])
const category = ref<CategoryCard | undefined>(undefined)
const stateCategoryId = ref<string | undefined>(undefined)

onMounted(() => {
  stateCategoryId.value = props.categoryId
})
</script>

<template>
  <div class="flex h-full bg-red-500">
    <div class="flex h-full w-1/2 flex-col justify-between">
      <ul v-if="categories?.items && categories?.items.length > 0" class="mt-8 flex flex-col gap-8">
        <li>
          <NavigationMenuLink as-child>
            <NuxtLink
              class="flex items-center gap-3 text-3xl leading-none font-medium transition-all duration-300 hover:translate-x-2"
              :to="category?.link?.path"
            >
              <IconArrowRight class="size-6" />
              {{ $t('actions.shop-all') }}
            </NuxtLink>
          </NavigationMenuLink>
        </li>

        <li v-for="child in categories?.items" :key="child.key">
          <NavigationMenuLink as-child>
            <NuxtLink
              :to="child.link?.path"
              class="group relative inline-block overflow-hidden pb-2"
            >
              <div class="relative z-10 text-3xl leading-none font-medium">{{ child.title }}</div>
              <div
                class="bg-inverted absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"
              ></div>
            </NuxtLink>
          </NavigationMenuLink>
          <LayoutNavbarMenuSubItems :categories="child.children" />
        </li>
      </ul>
      <div class="mb-10">
        <LayoutNavbarMenuAboutMenu />
      </div>
    </div>
    <div class="w-1/2">
      <div v-if="category" class="mt-8 h-full w-auto">
        <NuxtLink :to="category.link?.path" class="grid" @click="closeMenu">
          <img
            src="https://placehold.co/600x400"
            :alt="category.cover?.altText"
            class="col-span-full row-span-full aspect-[3/4] w-full object-cover grayscale"
            :style="{
              'view-transition-name': `category-image-${category.key}`,
            }"
          />

          <div class="z-10 col-span-full row-span-full grid pb-5 pl-4 md:p-10">
            <h3
              class="self-end text-3xl font-bold text-white lg:text-5xl"
              :style="{
                'view-transition-name': `category-title-${category.key}`,
              }"
            >
              {{ category.title }}
            </h3>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
