<script setup lang="ts">
const { updateContext, getLocaleLabel } = useContext()
const { page, suggestRedirect } = usePageRouter()

async function denySuggestion() {
  if (!page.value?.route.context?.region || !page.value?.route.context?.locale) return
  // TODO: check implementation (update fails since route context is wrong) as soon as fetch api is fixed
  await updateContext({
    region: page.value.route.context.region,
    locale: page.value.route.context.locale,
  })
}

async function acceptSuggestion() {
  console.log('acceptSuggestion', page.value?.route.context?.suggested)
  if (!page.value?.route.context?.suggested?.path) return
  suggestRedirect.value = false
  await navigateTo(page.value.route.context.suggested.path)
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
        v-if="page?.route.context?.suggested"
        variant="outline"
        size="lg"
        class="flex items-center gap-4 rounded-full py-6"
        @click="acceptSuggestion"
        ><StoreLocaleFlag code="en-us" size="lg" />
        {{
          $t('context.suggest.accept', {
            locale: getLocaleLabel(page?.route.context.suggested.locale),
          })
        }}
      </Button>
      <DialogFooter>
        <Button variant="link" @click="denySuggestion">{{ $t('context.suggest.deny') }}</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
