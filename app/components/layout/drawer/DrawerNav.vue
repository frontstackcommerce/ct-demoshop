<script setup lang="ts">
import { VisuallyHidden } from 'reka-ui'
const { section, open, resetDrawer, showDrawerMenuInside, hideDrawerMenu } = useDrawer()

const isMenu = computed(() => section.value === 'menu')
const isSearch = computed(() => section.value === 'search')
const isCart = computed(() => section.value === 'cart')

const toggleNavTrigger = (open: boolean) => {
  if (open) {
    showDrawerMenuInside.value = true
  }
}

function handleClose() {
  nextTick(() => {
    resetDrawer()
  })
}
</script>

<template>
  <ClientOnly>
    <div v-if="!showDrawerMenuInside" class="md:hidden">
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="transform translate-y-full opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition ease-in duration-300"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform translate-y-full opacity-80"
      >
        <LayoutDrawerNavTrigger v-if="!hideDrawerMenu" />
      </Transition>
    </div>
    <Drawer :open="open" fixed @close="resetDrawer" @animation-end="toggleNavTrigger">
      <DrawerContent>
        <VisuallyHidden as-child>
          <DrawerTitle>{{ $t('navigation.title') }}</DrawerTitle>
        </VisuallyHidden>
        <VisuallyHidden as-child>
          <DrawerDescription>{{ $t('navigation.description') }}</DrawerDescription>
        </VisuallyHidden>
        <LayoutDrawerMenu v-if="isMenu" @close="handleClose" />
        <LayoutDrawerSearch v-if="isSearch" @close="handleClose" />
        <LayoutDrawerCart v-if="isCart" @close="handleClose" />
        <DrawerFooter as-child>
          <DrawerClose as-child>
            <LayoutDrawerNavTrigger v-if="showDrawerMenuInside" />
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </ClientOnly>
</template>
