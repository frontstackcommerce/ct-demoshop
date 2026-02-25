<script setup lang="ts">
defineProps<{
  inverted?: boolean
  collapsed?: boolean
}>()
const open = ref(false)
</script>

<template>
  <ClientOnly>
    <Dialog v-model:open="open">
      <DialogTrigger as-child
        ><slot><LayoutStorePickerTrigger :inverted="inverted" :collapsed="collapsed" /></slot
      ></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle class="font-display text-2xl font-medium">{{
            $t('context.title')
          }}</DialogTitle>
        </DialogHeader>
        <LazyLayoutStorePickerContent @success="open = false" />
      </DialogContent> </Dialog
  ></ClientOnly>
</template>
