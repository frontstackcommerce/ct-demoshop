<script setup lang="ts">
import { Search, ShoppingBag, ChevronDown, ArrowRight } from 'lucide-vue-next'
import { onClickOutside, onKeyStroke } from '@vueuse/core'

const { fullTree } = useShopMenu()

const activeMenu = ref<string | null>(null)
const isSearchOpen = ref(false)
const navRef = ref<HTMLElement | null>(null)

onClickOutside(navRef, () => {
  activeMenu.value = null
  isSearchOpen.value = false
})

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

const activeCategory = computed(() => {
  if (!activeMenu.value || !fullTree.value?.items) return null
  return fullTree.value.items.find((item: any) => item.key === activeMenu.value)
})
</script>

<template>
  <div ref="navRef" class="relative w-full">
    <!-- Main Nav Bar -->
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">
      <!-- Logo -->
      <div class="z-20 shrink-0">
        <StoreLogo class="h-6 lg:h-7" />
      </div>

      <!-- Center Navigation -->
      <nav v-if="fullTree?.items" class="z-20 hidden items-center gap-1 md:flex">
        <template v-for="item in fullTree.items" :key="item.key">
          <NuxtLink
            v-if="!item.categoryId && item.path"
            :to="item.path"
            class="px-4 py-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
            @click="closeMenu"
          >
            {{ item.name }}
          </NuxtLink>
          <button
            v-else
            class="group flex items-center gap-1 px-4 py-2 text-sm transition-colors"
            :class="
              activeMenu === item.key
                ? 'text-foreground'
                : 'text-foreground/80 hover:text-foreground'
            "
            @click="toggleMenu(item.key)"
          >
            {{ item.name }}
            <ChevronDown
              class="size-3.5 transition-transform duration-200"
              :class="activeMenu === item.key ? 'rotate-180' : ''"
            />
          </button>
        </template>
      </nav>

      <!-- Right Actions -->
      <div class="z-20 flex items-center gap-1">
        <button
          class="p-2.5 text-foreground/70 transition-colors hover:text-foreground"
          @click="openSearch"
        >
          <Search class="size-5" />
        </button>
        <NuxtLink
          to="/cart"
          class="relative p-2.5 text-foreground/70 transition-colors hover:text-foreground"
        >
          <ShoppingBag class="size-5" />
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
        class="absolute left-0 right-0 top-full z-10 border-t border-border/40 bg-background shadow-2xl shadow-black/5"
      >
        <div class="mx-auto max-w-7xl px-6 py-10 lg:px-12">
          <div class="grid grid-cols-12 gap-10">
            <!-- Categories Column -->
            <div class="col-span-8">
              <div class="mb-8 flex items-center justify-between border-b border-border/40 pb-4">
                <h3 class="font-serif text-2xl">{{ activeCategory.name }}</h3>
                <NuxtLink
                  :to="activeCategory.link?.path"
                  class="group flex items-center gap-2 text-sm text-primary transition-colors hover:text-primary/80"
                  @click="closeMenu"
                >
                  {{ $t('navigation.shop-all', { name: activeCategory.name }) }}
                  <ArrowRight class="size-4 transition-transform group-hover:translate-x-1" />
                </NuxtLink>
              </div>
              <div class="grid grid-cols-3 gap-x-10 gap-y-8">
                <div v-for="child in activeCategory.children?.items" :key="child.key">
                  <NuxtLink
                    :to="child.link?.path"
                    class="mb-4 block text-sm font-medium text-foreground transition-colors hover:text-primary"
                    @click="closeMenu"
                  >
                    {{ child.name }}
                  </NuxtLink>
                  <ul v-if="child.children?.items?.length" class="space-y-2.5">
                    <li
                      v-for="subChild in child.children.items.slice(0, 5)"
                      :key="subChild.key"
                    >
                      <NuxtLink
                        :to="subChild.link?.path"
                        class="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                        @click="closeMenu"
                      >
                        {{ subChild.name }}
                      </NuxtLink>
                    </li>
                    <li v-if="child.children.items.length > 5">
                      <NuxtLink
                        :to="child.link?.path"
                        class="mt-1 inline-flex items-center gap-1 text-xs text-primary transition-colors hover:text-primary/80"
                        @click="closeMenu"
                      >
                        {{ $t('navigation.view-all') }}
                        <ArrowRight class="size-3" />
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
                class="group relative block aspect-[3/4] overflow-hidden bg-muted"
                @click="closeMenu"
              >
                <NuxtImg
                  :src="activeCategory.image?.src"
                  :alt="activeCategory.name"
                  class="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                />
                <div class="absolute bottom-0 left-0 right-0 p-6">
                  <p class="mb-2 text-xs uppercase tracking-widest text-white/60">{{ $t('product.featured') }}</p>
                  <p class="mb-3 text-lg font-medium text-white">
                    {{ $t('navigation.explore', { name: activeCategory.name }) }}
                  </p>
                  <span
                    class="inline-flex items-center gap-2 border-b border-white/40 pb-0.5 text-sm text-white transition-colors group-hover:border-white"
                  >
                    {{ $t('navigation.shop-now-short') }}
                    <ArrowRight class="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </NuxtLink>
              <div v-else class="flex aspect-[3/4] items-center justify-center bg-shade">
                <p class="text-sm text-muted-foreground">
                  {{ activeCategory.name }}
                </p>
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
      <div
        v-if="isSearchOpen"
        class="absolute left-0 right-0 top-full z-10 border-t border-border/40 bg-background shadow-2xl shadow-black/5"
      >
        <div class="mx-auto max-w-2xl px-6 py-10">
          <div class="relative">
            <input
              type="text"
              :placeholder="$t('search.placeholder')"
              class="h-14 w-full border-0 border-b-2 border-foreground/20 bg-transparent px-0 text-xl transition-colors placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
            />
            <button
              class="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowRight class="size-5" />
            </button>
          </div>
          <div class="mt-8">
            <p class="mb-4 text-xs uppercase tracking-wider text-muted-foreground">
              {{ $t('search.suggest') }}
            </p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="tag in $t('search.suggestions').split(', ')"
                :key="tag"
                class="bg-shade px-4 py-2 text-sm transition-colors hover:bg-shade-200"
              >
                {{ tag }}
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
        class="fixed inset-x-0 bottom-0 top-[104px] z-0 bg-black/30 backdrop-blur-sm"
      />
    </Transition>
  </div>
</template>
