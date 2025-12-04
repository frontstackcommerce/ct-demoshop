<script setup lang="ts">
const { section, setSection, resetDrawer, open: isOpen, showDrawerMenuInside } = useDrawer()
const { cart } = useCart()
const { isProductDetail } = useNavigation()

// Navigation states
const isSearchOpen = computed(() => section.value === 'search' && isOpen.value)
const isAccountOpen = computed(() => section.value === 'account' && isOpen.value)
const isMenuOpen = computed(() => section.value === 'menu' && isOpen.value)
const isCartOpen = computed(() => section.value === 'cart' && isOpen.value)

const isCartEmpty = computed(() => cart.value?.items.length === 0)

// UI states
const isCollapsed = ref(false)
const isInCorner = ref(false)

// Navigation actions
const handleSectionChange = (newSection: 'search' | 'cart' | 'account' | 'menu') => {
  setSection(newSection)
}

// Watch navigation states to update UI
watch(
  [isSearchOpen, isAccountOpen, isProductDetail, isMenuOpen, isCartOpen, isCartEmpty],
  ([isSearchOpen, isAccountOpen, isProductDetail, isMenuOpen, isCartOpen, isCartEmpty]) => {
    isCollapsed.value =
      (isProductDetail && !isMenuOpen) || isSearchOpen || isAccountOpen || isCartOpen
    isInCorner.value =
      (isCartEmpty && isCartOpen) ||
      isSearchOpen ||
      isAccountOpen ||
      (isProductDetail && !isMenuOpen && !isCartOpen)
  },
  { immediate: true }
)
</script>

<template>
  <div
    class="fixed bottom-4 left-1/2 z-[2147483645] -translate-x-1/2"
    :class="{
      'right-4 left-auto translate-x-0': isInCorner,
      'mr-[-1px] mb-[-1px]': showDrawerMenuInside,
    }"
  >
    <div class="flex items-center gap-4">
      <!-- Checkout Button -->
      <div
        v-if="isCartOpen && !isCartEmpty"
        class="bg-checkout flex h-16 items-center gap-8 rounded-full px-6 py-1 shadow-md"
      >
        <NuxtLink to="/checkout">
          <Button
            class="flex items-center gap-5"
            :aria-label="$t('navigation.checkout')"
            variant="default"
            color="checkout"
            size="lg"
            @click="resetDrawer"
          >
            <IconShoppingCart class="text-checkout-foreground size-6" />
            {{ $t('navigation.checkout') }}
          </Button>
        </NuxtLink>
      </div>

      <!-- Main Navigation -->
      <div
        class="bg-inverted flex items-center shadow-md"
        :class="
          isCollapsed
            ? 'size-16 justify-center rounded-full'
            : 'h-16 w-full gap-8 rounded-lg px-6 py-1'
        "
      >
        <!-- Close Button -->
        <template v-if="isSearchOpen || isAccountOpen || isCartOpen">
          <Button :aria-label="$t('navigation.close')" variant="icon" @click="resetDrawer">
            <IconX class="text-inverted-foreground size-6 scale-150" :stroke-width="1" />
          </Button>
        </template>

        <!-- Detail Mode Menu -->
        <template v-else-if="isProductDetail && !isMenuOpen">
          <Button
            :aria-label="$t('navigation.menu')"
            variant="icon"
            @click="handleSectionChange('menu')"
          >
            <IconMenu
              class="text-inverted-foreground relative size-6 scale-150"
              :stroke-width="1"
            />
            <CartBadge size="lg" />
          </Button>
        </template>

        <!-- Menu Mode -->
        <template v-else-if="isMenuOpen">
          <Button
            :aria-label="$t('navigation.search')"
            variant="icon"
            @click="handleSectionChange('search')"
          >
            <IconSearch class="text-inverted-foreground size-6" :stroke-width="1" />
          </Button>
          <Button
            :aria-label="$t('navigation.cart')"
            class="relative"
            variant="icon"
            @click="handleSectionChange('cart')"
          >
            <IconShoppingCart class="text-inverted-foreground size-6" :stroke-width="1" />
            <CartBadge />
          </Button>
          <Button
            :aria-label="$t('navigation.account')"
            variant="icon"
            @click="handleSectionChange('account')"
          >
            <IconUser class="text-inverted-foreground size-6" :stroke-width="1" />
          </Button>
          <Button :aria-label="$t('navigation.close')" variant="icon" @click="resetDrawer">
            <IconX class="text-inverted-foreground size-6 scale-150" :stroke-width="1" />
          </Button>
        </template>

        <!-- Default Navigation -->
        <template v-else>
          <Button
            :aria-label="$t('navigation.search')"
            variant="icon"
            @click="handleSectionChange('search')"
          >
            <IconSearch class="text-inverted-foreground size-6" :stroke-width="1" />
          </Button>
          <Button
            :aria-label="$t('navigation.cart')"
            class="relative"
            variant="icon"
            @click="handleSectionChange('cart')"
          >
            <IconShoppingCart class="text-inverted-foreground size-6" :stroke-width="1" />
            <CartBadge />
          </Button>
          <Button
            :aria-label="$t('navigation.account')"
            variant="icon"
            @click="handleSectionChange('account')"
          >
            <IconUser class="text-inverted-foreground size-6" :stroke-width="1" />
          </Button>
          <Button
            :aria-label="$t('navigation.menu')"
            variant="icon"
            @click="handleSectionChange('menu')"
          >
            <IconMenu class="text-inverted-foreground size-6" :stroke-width="1" />
          </Button>
        </template>
      </div>
    </div>
  </div>
</template>
