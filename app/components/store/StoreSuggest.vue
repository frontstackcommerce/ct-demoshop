<script setup lang="ts">
const { updateContext, getLocaleLabel } = useContext()
const { data } = useFronticPage()
const suggestRedirect = ref(!!data.value?.route?.context?.suggested)

async function denySuggestion() {
  if (!data.value?.route.context?.region || !data.value?.route.context?.locale) return
  // TODO: check implementation (update fails since route context is wrong) as soon as fetch api is fixed
  await updateContext({
    region: data.value.route.context.region,
    locale: data.value.route.context.locale,
  })
}

async function acceptSuggestion() {
  if (!data.value?.route.context?.suggested?.path) return
  suggestRedirect.value = false
  await navigateTo(data.value.route.context.suggested.path)
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
        v-if="data?.route.context?.suggested"
        variant="outline"
        size="lg"
        class="flex items-center gap-4 rounded-full py-6"
        @click="acceptSuggestion"
        ><StoreLocaleFlag code="en-us" size="lg" />
        {{
          $t('context.suggest.accept', {
            locale: getLocaleLabel(data?.route.context.suggested.locale),
          })
        }}
      </Button>
      <DialogFooter>
        <Button variant="link" @click="denySuggestion">{{ $t('context.suggest.deny') }}</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
