<script setup lang="ts">
defineProps<{
  categoryId: string
  category?: MenuItem
}>()

const { closeMenu } = useShopMenu()
</script>

<template>
  <div class="grid grid-cols-12 gap-8">
    <!-- Left: Category Links -->
    <div class="col-span-7">
      <div class="grid grid-cols-2 gap-x-8 gap-y-6">
        <!-- Shop All Link -->
        <div class="col-span-2">
          <NavigationMenuLink as-child>
            <NuxtLink
              class="group text-primary hover:text-primary/80 inline-flex items-center gap-2 text-sm font-medium transition-colors"
              :to="category?.link?.path"
            >
              {{ $t('actions.shop-all') }} {{ category?.name }}
              <IconArrowRight class="size-4 transition-transform group-hover:translate-x-1" />
            </NuxtLink>
          </NavigationMenuLink>
        </div>

        <!-- Subcategories -->
        <template v-for="child in category?.children?.items" :key="child.key">
          <div>
            <NavigationMenuLink as-child>
              <NuxtLink
                :to="child.link?.path"
                class="text-foreground hover:text-primary mb-3 block text-sm font-medium transition-colors"
              >
                {{ child.name }}
              </NuxtLink>
            </NavigationMenuLink>

            <!-- Sub-subcategories -->
            <ul v-if="child.children?.items?.length" class="space-y-2">
              <li v-for="subChild in child.children.items.slice(0, 5)" :key="subChild.key">
                <NavigationMenuLink as-child>
                  <NuxtLink
                    :to="subChild.link?.path"
                    class="text-muted-foreground hover:text-foreground block text-sm transition-colors"
                  >
                    {{ subChild.name }}
                  </NuxtLink>
                </NavigationMenuLink>
              </li>
              <li v-if="child.children.items.length > 5">
                <NavigationMenuLink as-child>
                  <NuxtLink
                    :to="child.link?.path"
                    class="text-primary hover:text-primary/80 text-sm transition-colors"
                  >
                    View all →
                  </NuxtLink>
                </NavigationMenuLink>
              </li>
            </ul>
          </div>
        </template>
      </div>
    </div>

    <!-- Right: Featured Image -->
    <div class="col-span-5">
      <NuxtLink
        v-if="category?.image?.src"
        :to="category.link?.path"
        class="group relative block aspect-[4/3] overflow-hidden rounded-md"
        @click="closeMenu"
      >
        <NuxtImg
          :src="category.image?.src"
          :alt="category.image?.altText || category.name"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
        />
        <div class="absolute right-0 bottom-0 left-0 p-4">
          <p class="mb-1 text-xs tracking-wider text-white/70 uppercase">Featured</p>
          <h3 class="font-medium text-white">{{ category.name }}</h3>
        </div>
      </NuxtLink>

      <!-- Fallback if no image -->
      <div v-else class="bg-shade flex aspect-[4/3] items-center justify-center rounded-md">
        <div class="text-center">
          <p class="text-muted-foreground text-sm">{{ category?.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
