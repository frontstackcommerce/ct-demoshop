<script setup lang="ts">
import { onClickOutside, onKeyStroke } from '@vueuse/core'

const { fullTree } = useShopMenu()

const activeMenu = ref<string | null>(null)
const isSearchOpen = ref(false)
const navRef = ref<HTMLElement | null>(null)

// Close menu when clicking outside
onClickOutside(navRef, () => {
  activeMenu.value = null
  isSearchOpen.value = false
})

// Close menu on escape
onKeyStroke('Escape', () => {
  activeMenu.value = null
  isSearchOpen.value = false
})

function toggleMenu(key: string) {
  isSearchOpen.value = false
  activeMenu.value = activeMenu.value === key ? null : key
}

function closeMenu() {
  activeMenu.value = null
}

function openSearch() {
  activeMenu.value = null
  isSearchOpen.value = true
}

// Get the active category data
const activeCategory = computed(() => {
  if (!activeMenu.value || !fullTree.value?.items) return null
  return fullTree.value.items.find(item => item.key === activeMenu.value)
})
</script>

<template>
  <div ref="navRef" class="w-full relative">
    <!-- Main Nav Bar -->
    <div class="mx-auto flex h-16 items-center justify-between px-6 lg:px-12 max-w-7xl">
      <!-- Logo -->
      <div class="shrink-0 z-20">
        <StoreLogo class="h-6 lg:h-7" />
      </div>
      
      <!-- Center Navigation -->
      <nav v-if="fullTree?.items" class="hidden md:flex items-center gap-1 z-20">
        <template v-for="item in fullTree.items" :key="item.key">
          <!-- Simple link -->
          <NuxtLink
            v-if="!item.categoryId && item.path"
            :to="item.path"
            class="px-4 py-2 text-sm text-foreground/80 hover:text-foreground transition-colors"
            @click="closeMenu"
          >
            {{ item.name }}
          </NuxtLink>
          
          <!-- Dropdown trigger -->
          <button
            v-else
            class="group px-4 py-2 text-sm transition-colors flex items-center gap-1"
            :class="activeMenu === item.key ? 'text-foreground' : 'text-foreground/80 hover:text-foreground'"
            @click="toggleMenu(item.key)"
          >
            {{ item.name }}
            <IconChevronDown 
              class="size-3.5 transition-transform duration-200" 
              :class="activeMenu === item.key ? 'rotate-180' : ''"
            />
          </button>
        </template>
      </nav>
      
      <!-- Right Actions -->
      <div class="flex items-center gap-1 z-20">
        <!-- Search -->
        <button 
          class="p-2.5 text-foreground/70 hover:text-foreground transition-colors"
          @click="openSearch"
        >
          <IconSearch class="size-5" />
        </button>
        
        <!-- Cart -->
        <NuxtLink to="/cart" class="p-2.5 text-foreground/70 hover:text-foreground transition-colors relative">
          <IconShoppingBag class="size-5" />
          <StoreCartBadge />
        </NuxtLink>
      </div>
    </div>

    <!-- Mega Menu Dropdown -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div 
        v-if="activeCategory" 
        class="absolute top-full left-0 right-0 bg-background border-t border-border/40 shadow-2xl shadow-black/5 z-10"
      >
        <div class="mx-auto max-w-7xl px-6 lg:px-12 py-10">
          <div class="grid grid-cols-12 gap-10">
            <!-- Categories Column -->
            <div class="col-span-8">
              <div class="flex items-center justify-between mb-8 pb-4 border-b border-border/40">
                <h3 class="font-serif text-2xl">{{ activeCategory.name }}</h3>
                <NuxtLink 
                  :to="activeCategory.link?.path" 
                  class="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-2 group"
                  @click="closeMenu"
                >
                  Shop all {{ activeCategory.name }}
                  <IconArrowRight class="size-4 transition-transform group-hover:translate-x-1" />
                </NuxtLink>
              </div>
              
              <!-- Subcategories Grid -->
              <div class="grid grid-cols-3 gap-x-10 gap-y-8">
                <div v-for="child in activeCategory.children?.items" :key="child.key">
                  <NuxtLink
                    :to="child.link?.path"
                    class="block text-sm font-medium text-foreground hover:text-primary transition-colors mb-4"
                    @click="closeMenu"
                  >
                    {{ child.name }}
                  </NuxtLink>
                  
                  <ul v-if="child.children?.items?.length" class="space-y-2.5">
                    <li v-for="subChild in child.children.items.slice(0, 5)" :key="subChild.key">
                      <NuxtLink
                        :to="subChild.link?.path"
                        class="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                        @click="closeMenu"
                      >
                        {{ subChild.name }}
                      </NuxtLink>
                    </li>
                    <li v-if="child.children.items.length > 5">
                      <NuxtLink
                        :to="child.link?.path"
                        class="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors mt-1"
                        @click="closeMenu"
                      >
                        View all
                        <IconArrowRight class="size-3" />
                      </NuxtLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <!-- Featured Image Column -->
            <div class="col-span-4">
              <NuxtLink 
                v-if="activeCategory.image?.src"
                :to="activeCategory.link?.path" 
                class="group block relative overflow-hidden aspect-[3/4] bg-muted"
                @click="closeMenu"
              >
                <NuxtImg
                  :src="activeCategory.image?.src"
                  :alt="activeCategory.name"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div class="absolute bottom-0 left-0 right-0 p-6">
                  <p class="text-white/60 text-xs tracking-widest uppercase mb-2">Featured</p>
                  <p class="text-white text-lg font-medium mb-3">Explore {{ activeCategory.name }}</p>
                  <span class="inline-flex items-center gap-2 text-white text-sm border-b border-white/40 pb-0.5 group-hover:border-white transition-colors">
                    Shop now
                    <IconArrowRight class="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </NuxtLink>
              <div v-else class="aspect-[3/4] bg-shade flex items-center justify-center">
                <p class="text-muted-foreground text-sm">{{ activeCategory.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Search Overlay -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isSearchOpen" class="absolute top-full left-0 right-0 bg-background border-t border-border/40 shadow-2xl shadow-black/5 z-10">
        <div class="mx-auto max-w-2xl px-6 py-10">
          <div class="relative">
            <input
              type="text"
              placeholder="What are you looking for?"
              class="w-full h-14 px-0 text-xl bg-transparent border-0 border-b-2 border-foreground/20 focus:border-foreground focus:outline-none transition-colors placeholder:text-muted-foreground"
            />
            <button class="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition-colors">
              <IconArrowRight class="size-5" />
            </button>
          </div>
          <div class="mt-8">
            <p class="text-xs text-muted-foreground tracking-wider uppercase mb-4">Popular searches</p>
            <div class="flex flex-wrap gap-2">
              <button class="px-4 py-2 text-sm bg-shade hover:bg-shade-200 transition-colors">
                Sofas
              </button>
              <button class="px-4 py-2 text-sm bg-shade hover:bg-shade-200 transition-colors">
                Chairs
              </button>
              <button class="px-4 py-2 text-sm bg-shade hover:bg-shade-200 transition-colors">
                Tables
              </button>
              <button class="px-4 py-2 text-sm bg-shade hover:bg-shade-200 transition-colors">
                Rugs
              </button>
              <button class="px-4 py-2 text-sm bg-shade hover:bg-shade-200 transition-colors">
                Lighting
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="activeMenu || isSearchOpen" 
        class="fixed inset-x-0 bottom-0 top-[104px] bg-black/30 backdrop-blur-sm z-0"
      />
    </Transition>
  </div>
</template>
