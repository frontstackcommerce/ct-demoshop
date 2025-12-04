<script setup lang="ts">
const { context, getRegionLabel, getLocaleLabel } = useContext()
</script>

<template>
  <Button v-if="context" color="inverted" class="mx-auto flex items-center gap-5" size="xl">
    <RegionFlag v-if="context" :code="context.region" />

    {{ getRegionLabel(context.region) }}
    {{ $t('default.in-brackets', { text: getLocaleLabel(context.locale) }) }}
    <IconChevronDown class="size-4" />
  </Button>
</template>
