<script setup lang="ts">
const { update: updateContext } = useFronticContext()
const { route } = useFronticPage()

const suggestRedirectDismissed = ref(false)
const suggestRedirect = computed({
  get: () => !suggestRedirectDismissed.value && !!route.value?.context?.suggested?.path,
  set: (val: boolean) => {
    if (!val) suggestRedirectDismissed.value = true
  },
})

async function denySuggestion() {
  if (!route.value?.context?.region || !route.value?.context?.locale) return
  // TODO: check implementation (update fails since route context is wrong) as soon as fetch api is fixed
  await updateContext({
    region: route.value.context.region,
    locale: route.value.context.locale,
  })
}

async function acceptSuggestion() {
  if (!route.value?.context?.suggested?.path) return
  suggestRedirect.value = false
  await navigateTo(route.value.context.suggested.path)
}
</script>

<template>
  <Dialog v-model:open="suggestRedirect">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ $t('context.suggest.title') }}</DialogTitle>
        <DialogDescription>{{ $t('context.suggest.description') }}</DialogDescription>
      </DialogHeader>

      <Button
        v-if="route?.context?.suggested"
        variant="outline"
        size="lg"
        class="flex items-center gap-4 rounded-full py-6"
        @click="acceptSuggestion"
        ><LayoutStoreLocaleFlag :code="route?.context?.suggested?.locale ?? ''" size="lg" />
        {{
          $t('context.suggest.accept', {
            locale: formatLabel(route?.context.suggested.locale),
          })
        }}
      </Button>
      <DialogFooter>
        <Button variant="link" @click="denySuggestion">{{ $t('context.suggest.deny') }}</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
