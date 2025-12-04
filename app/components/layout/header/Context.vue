<script setup lang="ts">
import 'flag-icons/css/flag-icons.min.css'

const { context, contextList, updateContext, getRegionLabel, getLocaleLabel } = useContext()
const identifierSeparator = ':::'

const selectLocale = async (value: string) => {
  const [selectedRegion, selectedLocale] = value.split(identifierSeparator)
  if (!contextList.value) {
    return
  }

  contextList.value.forEach(async (contextOption) => {
    if (contextOption.region === selectedRegion) {
      contextOption.locales.forEach(async (localeOption) => {
        if (localeOption.key === selectedLocale) {
          if (
            context.value?.region !== contextOption.region ||
            context.value?.locale !== localeOption.key
          ) {
            // No-op if current context configuration was selected
            await updateContext({ region: contextOption.region, locale: localeOption.key })
            const url = localeOption.url
            navigateTo(url)
          }
        }
      })
    }
  })
}

const contextLabel = computed(() => {
  const currency = contextList.value?.find(
    (contextOption) => contextOption.region === context.value?.region
  )?.currency
  return getRegionLabel(context.value?.region ?? 'de') + ' (' + currency + ')'
})
</script>

<template>
  <Select
    class="flex items-center px-4"
    :model-value="context?.region + identifierSeparator + context?.locale"
    @update:model-value="selectLocale"
  >
    <SelectTrigger
      class="ring-offset-background h-6 w-50 border-none bg-transparent dark:bg-transparent"
    >
      <div class="flex items-center gap-2.5">
        <RegionFlag v-if="context" :code="context.region" size="sm" />
        {{ contextLabel }}
      </div>
    </SelectTrigger>
    <SelectContent>
      <SelectGroup v-for="(contextOption, index) in contextList" :key="index">
        <SelectLabel class="pl-2">
          <div class="flex items-center gap-2.5">
            {{ getRegionLabel(contextOption.region) }}
          </div>
        </SelectLabel>
        <SelectItem
          v-for="(locale, _index) in contextOption.locales"
          :key="_index"
          :value="contextOption.region + identifierSeparator + locale.key"
        >
          {{ getLocaleLabel(locale.key) }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
