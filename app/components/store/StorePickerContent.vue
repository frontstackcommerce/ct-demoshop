<script setup lang="ts">
const emit = defineEmits<{
  (e: 'success'): void
}>()

const { context, contextList, updateContext, getRegionLabel, getLocaleLabel } = useContext()

const selectedRegion = ref(context.value?.region ?? '')
const selectedLocale = ref(context.value?.locale ?? '')
const availableLocales = computed(() => {
  const region = contextList.value?.find((option) => option.region === selectedRegion.value)
  return region?.locales ?? []
})

const handleRegionChange = (value: string) => {
  selectedRegion.value = value
  selectedLocale.value = availableLocales.value[0]?.key ?? ''
}

const handleLocaleChange = (value: string) => {
  selectedLocale.value = value
}

const handleSubmit = async () => {
  if (!selectedRegion.value || !selectedLocale.value) return

  const regionOption = contextList.value?.find((option) => option.region === selectedRegion.value)
  const localeOption = regionOption?.locales.find((locale) => locale.key === selectedLocale.value)

  if (regionOption && localeOption) {
    await updateContext({ region: regionOption.region, locale: localeOption.key })
    const url = localeOption.url
    navigateTo(url)
    emit('success')
  }
}
</script>

<template>
  <div class="my-2 flex flex-col gap-8">
    <div class="flex flex-col gap-3">
      <Label>{{ $t('context.location.label') }}</Label>
      <Select
        class="flex items-center px-4"
        :model-value="selectedRegion"
        @update:model-value="handleRegionChange"
      >
        <SelectTrigger class="">
          <div class="flex items-center gap-2.5">
            <SharedRegionFlag :code="selectedRegion" />
            {{
              selectedRegion ? getRegionLabel(selectedRegion) : $t('context.location.placeholder')
            }}
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="(contextOption, index) in contextList"
            :key="index"
            :value="contextOption.region"
          >
            <div class="flex items-center gap-2.5">
              <SharedRegionFlag :code="contextOption.region" />
              {{ getRegionLabel(contextOption.region) }}
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div class="flex flex-col gap-2">
      <Label>{{ $t('context.language.label') }}</Label>
      <Select
        class="flex items-center px-4"
        :model-value="selectedLocale"
        :disabled="!selectedRegion"
        @update:model-value="handleLocaleChange"
      >
        <SelectTrigger class="">
          <div class="flex items-center gap-2.5">
            {{
              selectedLocale ? getLocaleLabel(selectedLocale) : $t('context.language.placeholder')
            }}
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="(locale, index) in availableLocales" :key="index" :value="locale.key">
            {{ getLocaleLabel(locale.key) }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <Button
      :disabled="!selectedRegion || !selectedLocale"
      size="xl"
      class="w-full rounded-full"
      @click="handleSubmit"
    >
      {{ $t('context.submit') }}
    </Button>
  </div>
</template>
