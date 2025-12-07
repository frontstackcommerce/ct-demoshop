<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void
}>()

const { fullTree } = useShopMenu()

const close = () => {
  emit('close')
}

// Navigation state: track menu hierarchy path
const menuStack = ref<any[]>([])

// Type guard to check if item has children
function hasChildren(item: any): boolean {
  return !!(item?.children?.items && item.children.items.length > 0)
}

// Helper to get name property from any menu item type
function getItemName(item: any): string | undefined {
  return item?.name || item?.label
}

// Helper to get link property from any menu item type
function getItemLink(item: any): PageRoute | undefined {
  return item?.link || (item?.href ? ({ path: item.href } as PageRoute) : undefined)
}

// Current menu level
const currentMenu = computed(() => {
  if (menuStack.value.length === 0) {
    // Top level - fullTree items
    return {
      items: fullTree.value?.items || [],
      title: undefined,
      link: undefined,
    }
  }

  const current = menuStack.value[menuStack.value.length - 1]
  if (!current) {
    return {
      items: [],
      title: undefined,
      link: undefined,
    }
  }

  // Get children items regardless of the specific type
  const items = current.children?.items || []

  return {
    items,
    title: getItemName(current),
    link: getItemLink(current),
  }
})

const isSubCategory = computed(() => menuStack.value.length > 0)

function handleShowSubCategory(item: any) {
  if (hasChildren(item)) {
    menuStack.value.push(item)
  }
}

function handleShowParentCategory() {
  menuStack.value.pop()
}
</script>

<template>
  <div class="bg-background z-2 h-full w-full">
    <div class="flex flex-col items-center md:hidden">
      <div v-if="currentMenu" class="flex w-full flex-col gap-1">
        <Transition name="submenu">
          <LayoutDrawerMenuSubmenu
            v-if="isSubCategory"
            :category="currentMenu"
            :children="currentMenu.items"
            @back="handleShowParentCategory"
            @close="close"
            @show="handleShowSubCategory"
          />
        </Transition>

        <NuxtLink
          v-if="!isSubCategory && currentMenu.link?.path"
          :to="currentMenu.link.path"
          class="font-display flex items-center justify-between p-3 text-3xl font-light"
          @click="close"
        >
          <span>{{ currentMenu.title }}</span>
        </NuxtLink>
        <template v-if="!isSubCategory">
          <div class="flex flex-col gap-1">
            <div v-for="item in currentMenu.items" :key="item.key">
              <NuxtLink
                v-if="hasChildren(item)"
                class="font-display flex w-full items-center justify-between px-3 py-5 text-4xl font-light"
                @click.stop="handleShowSubCategory(item)"
              >
                <span>{{ getItemName(item) }}</span>
                <IconChevronDown class="size-8" :stroke-width="1" />
              </NuxtLink>

              <NuxtLink
                v-else
                :to="getItemLink(item)?.path"
                class="font-display flex w-full items-center justify-between px-3 py-5 text-4xl font-light"
                @click="close"
              >
                <span>{{ getItemName(item) }}</span>
              </NuxtLink>
            </div>
          </div>
          <Separator />
          <div class="my-5 mb-20 flex w-full justify-between px-3">
            <LayoutNavbarMenuAboutMenu />
            <div>
              <StorePicker v-if="!isSubCategory">
                <StorePickerTrigger />
              </StorePicker>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.submenu-enter-active {
  transition: all 0.15s ease-out;
}

.submenu-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.submenu-enter-from,
.submenu-leave-to {
  transform: translateX(200px);
  opacity: 0;
}
</style>
