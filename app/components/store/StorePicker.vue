<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <ClientOnly>
    <Dialog v-model:open="open">
      <DialogTrigger as-child
        ><slot><StorePickerTrigger /></slot
      ></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{{ $t('context.title') }}</DialogTitle>
        </DialogHeader>
        <LazyStorePickerContent @success="open = false" />
      </DialogContent> </Dialog
  ></ClientOnly>
</template>
