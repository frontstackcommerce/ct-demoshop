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

const showLocaleSelector = computed(() => {
  return availableLocales.value.length > 1
})

const handleRegionSelect = (regionCode: string) => {
  selectedRegion.value = regionCode
  const locales = availableLocales.value
  selectedLocale.value = locales[0]?.key ?? ''

  // Auto-submit if only one locale available
  if (locales.length === 1) {
    handleSubmit()
  }
}

const handleLocaleSelect = (localeKey: string) => {
  selectedLocale.value = localeKey
  handleSubmit()
}

const handleSubmit = async () => {
  if (!selectedRegion.value || !selectedLocale.value) return

  const regionOption = contextList.value?.find((option) => option.region === selectedRegion.value)
  const localeOption = regionOption?.locales.find((locale) => locale.key === selectedLocale.value)
  if (regionOption && localeOption) {
    await updateContext({ region: regionOption.region, locale: localeOption.key })
    const url = localeOption.url.replace('ct.demo-shop.com', '')
    navigateTo(url)
    emit('success')
  }
}
</script>

<template>
  <div class="my-4 flex flex-col gap-6">
    <!-- Region Selection -->
    <div class="flex flex-col gap-4">
      <Label class="text-base font-semibold">{{ $t('context.location.label') }}</Label>
      <ItemGroup class="grid grid-cols-3 gap-5">
        <Item
          v-for="(contextOption, index) in contextList"
          :key="index"
          as-child
          variant="outline"
          class="cursor-pointer border"
          :class="{
            'border-primary bg-inverted/5': selectedRegion === contextOption.region,
          }"
          @click="handleRegionSelect(contextOption.region)"
        >
          <ItemContent>
            <ItemMedia>
              <StoreRegionFlag :code="contextOption.region" size="lg" />
            </ItemMedia>
            <ItemTitle>
              {{ getRegionLabel(contextOption.region) }}
            </ItemTitle>
          </ItemContent>
        </Item>
      </ItemGroup>
    </div>

    <!-- Language Selection (only show if multiple locales available) -->
    <div v-if="selectedRegion && showLocaleSelector" class="flex flex-col gap-4">
      <Label class="text-base font-semibold">{{ $t('context.language.label') }}</Label>
      <ItemGroup class="grid grid-cols-2 gap-5">
        <Item
          v-for="(locale, index) in availableLocales"
          :key="index"
          as-child
          variant="outline"
          class="cursor-pointer border"
          :class="{
            'border-primary bg-inverted/5': selectedLocale === locale.key,
          }"
          @click="handleLocaleSelect(locale.key)"
        >
          <ItemContent>
            <ItemMedia>
              <StoreLocaleFlag :code="locale.key" size="lg" />
            </ItemMedia>
            <ItemTitle>
              {{ getLocaleLabel(locale.key) }}
            </ItemTitle>
          </ItemContent>
        </Item>
      </ItemGroup>
    </div>
  </div>
</template>
