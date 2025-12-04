<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void
}>()

const { categoryId, listing: categories, refreshListing, category } = useCategories()

const SHOP_CATEGORY_KEY = '0194bcd116837bd9a18b8d134ee54be2'

onMounted(async () => {
  categoryId.value = SHOP_CATEGORY_KEY
  await refreshListing()
})

const close = () => {
  emit('close')
}

const activeSubmenu = ref<string>('')

async function handleShowSubCategory(key: string) {
  activeSubmenu.value = key
  categoryId.value = key
  await refreshListing()
}

async function handleShowParentCategory() {
  activeSubmenu.value =
    category.value?.parentKey && category.value?.parentKey !== SHOP_CATEGORY_KEY
      ? category.value.parentKey
      : ''
  const parentKey = category.value?.parentKey || SHOP_CATEGORY_KEY
  categoryId.value = parentKey
  await refreshListing()
}
const isSubCategory = computed(() => {
  return categoryId?.value !== SHOP_CATEGORY_KEY
})
</script>

<template>
  <div class="fixed top-0 z-[2] h-full w-full bg-background">
    <div class="flex flex-col items-center md:hidden">
      <div class="flex w-full items-center justify-between py-6 pl-5">
        <Logo @click="close" />
        <StorePicker v-if="!isSubCategory">
          <StorePickerTrigger collapsed />
        </SharedStorePicker>
        <Button
          v-else
          variant="link"
          size="sm"
          class="mr-2 flex items-center gap-3"
          @click.stop="handleShowParentCategory"
        >
          <IconArrowLeft class="size-5" />
          <span class="uppercase">{{ $t('actions.back') }}</span>
        </Button>
      </div>
      <div v-if="category" class="flex w-full flex-col gap-1">
        <Transition name="submenu">
          <PageDrawerMenuSubmenu
            v-if="isSubCategory && categories"
            :category="category"
            :children="categories"
            @back="handleShowParentCategory"
            @close="close"
            @show="handleShowSubCategory"
          />
        </Transition>

        <NuxtLink
          v-if="!isSubCategory"
          :to="category?.link?.path"
          class="flex items-center justify-between p-3 text-xl font-semibold"
          @click="close"
        >
          <span>{{ category?.title }}</span>
        </NuxtLink>
        <template v-if="!isSubCategory">
          <div class="flex flex-col gap-1">
            <div v-for="item in categories?.items" :key="item.key">
              <NuxtLink
                v-if="item.childCount && item.childCount > 0"
                class="flex w-full items-center justify-between px-3 py-4 text-xl font-medium"
                @click.stop="handleShowSubCategory(item.key)"
              >
                <span>{{ item.title }}</span>
                <IconChevronDown class="size-8" :stroke-width="1" />
              </NuxtLink>

              <NuxtLink
                v-else
                :to="item.link?.path"
                class="flex w-full items-center justify-between text-xl font-medium"
                @click="close"
              >
                <span>{{ item.title }}</span>
              </NuxtLink>
            </div>
          </div>
          <Separator />
          <div class="my-5 px-3">
            <PageNavbarMenuAboutMenu />
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
