<script setup lang="ts">
const props = defineProps<{
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
              class="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
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
                class="block text-sm font-medium text-foreground hover:text-primary transition-colors mb-3"
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
                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {{ subChild.name }}
                  </NuxtLink>
                </NavigationMenuLink>
              </li>
              <li v-if="child.children.items.length > 5">
                <NavigationMenuLink as-child>
                  <NuxtLink
                    :to="child.link?.path"
                    class="text-sm text-primary hover:text-primary/80 transition-colors"
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
        class="group block relative overflow-hidden rounded-md aspect-[4/3]"
        @click="closeMenu"
      >
        <NuxtImg
          :src="category.image?.src"
          :alt="category.image?.altText || category.name"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div class="absolute bottom-0 left-0 right-0 p-4">
          <p class="text-white/70 text-xs tracking-wider uppercase mb-1">Featured</p>
          <h3 class="text-white font-medium">{{ category.name }}</h3>
        </div>
      </NuxtLink>
      
      <!-- Fallback if no image -->
      <div 
        v-else 
        class="rounded-md aspect-[4/3] bg-shade flex items-center justify-center"
      >
        <div class="text-center">
          <p class="text-muted-foreground text-sm">{{ category?.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
