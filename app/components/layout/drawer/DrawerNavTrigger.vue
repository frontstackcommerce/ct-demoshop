<script setup lang="ts">
import { Menu, X, Search, ShoppingCart, User } from 'lucide-vue-next'

const { section, setSection, resetNav, open: isOpen, showNavMenuInside } = useShopNav()

const isSearchOpen = computed(() => section.value === 'search' && isOpen.value)
const isAccountOpen = computed(() => section.value === 'account' && isOpen.value)
const isMenuOpen = computed(() => section.value === 'menu' && isOpen.value)
const isCartOpen = computed(() => section.value === 'cart' && isOpen.value)

const isCollapsed = ref(false)
const isInCorner = ref(false)

const handleSectionChange = (newSection: 'search' | 'cart' | 'account' | 'menu') => {
  setSection(newSection)
}

watch(
  [isSearchOpen, isAccountOpen, isMenuOpen, isCartOpen],
  ([searchOpen, accountOpen, _menuOpen, cartOpen]) => {
    isCollapsed.value = searchOpen || accountOpen || cartOpen
    isInCorner.value = cartOpen || searchOpen || accountOpen
  },
  { immediate: true },
)
</script>

<template>
  <div
    class="fixed bottom-4 left-1/2 z-[2147483645] -translate-x-1/2"
    :class="{
      'right-4 left-auto translate-x-0': isInCorner,
      '-mr-px -mb-px': showNavMenuInside,
    }"
  >
    <div class="flex items-center gap-4">
      <div
        class="flex items-center bg-inverted shadow-md"
        :class="isCollapsed ? 'size-16 justify-center' : 'h-16 w-full gap-8 px-6 py-1'"
      >
        <template v-if="isSearchOpen || isAccountOpen || isCartOpen">
          <Button :aria-label="$t('navigation.close')" variant="ghost" @click="resetNav">
            <X class="size-6 scale-150 text-inverted-foreground" :stroke-width="1" />
          </Button>
        </template>

        <template v-else-if="isMenuOpen">
          <Button
            :aria-label="$t('navigation.search')"
            variant="ghost"
            @click="handleSectionChange('search')"
          >
            <Search class="size-6 text-inverted-foreground" :stroke-width="1" />
          </Button>
          <Button
            :aria-label="$t('navigation.cart')"
            class="relative"
            variant="ghost"
            @click="handleSectionChange('cart')"
          >
            <ShoppingCart class="size-6 text-inverted-foreground" :stroke-width="1" />
            <StoreCartBadge />
          </Button>
          <Button
            :aria-label="$t('navigation.account')"
            variant="ghost"
            @click="handleSectionChange('account')"
          >
            <User class="size-6 text-inverted-foreground" :stroke-width="1" />
          </Button>
          <Button :aria-label="$t('navigation.close')" variant="ghost" @click="resetNav">
            <X class="size-6 scale-150 text-inverted-foreground" :stroke-width="1" />
          </Button>
        </template>

        <template v-else>
          <Button
            :aria-label="$t('navigation.search')"
            variant="ghost"
            @click="handleSectionChange('search')"
          >
            <Search class="size-6 text-inverted-foreground" :stroke-width="1" />
          </Button>
          <Button
            :aria-label="$t('navigation.cart')"
            class="relative"
            variant="ghost"
            @click="handleSectionChange('cart')"
          >
            <ShoppingCart class="size-6 text-inverted-foreground" :stroke-width="1" />
            <StoreCartBadge />
          </Button>
          <Button
            :aria-label="$t('navigation.account')"
            variant="ghost"
            @click="handleSectionChange('account')"
          >
            <User class="size-6 text-inverted-foreground" :stroke-width="1" />
          </Button>
          <Button
            :aria-label="$t('navigation.menu')"
            variant="ghost"
            @click="handleSectionChange('menu')"
          >
            <Menu class="size-6 text-inverted-foreground" :stroke-width="1" />
          </Button>
        </template>
      </div>
    </div>
  </div>
</template>
