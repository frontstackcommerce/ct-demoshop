<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    collapsed?: boolean
    size?: 'sm' | 'md' | 'lg'
    inverted?: boolean
  }>(),
  {
    collapsed: false,
    size: 'md',
    inverted: false,
  }
)
const { context, getRegionLabel, getLocaleLabel } = useContext()

const sizeClass = computed(() => {
  return {
    button: props.size === 'sm' ? 'xs' : props.size === 'lg' ? 'lg' : 'default',
    flag: props.size === 'sm' ? 'sm' : props.size === 'lg' ? 'lg' : undefined,
    icon: props.size === 'sm' ? 'size-4' : props.size === 'lg' ? 'size-4' : 'size-4',
    gap: props.size === 'sm' ? 'gap-2.5' : props.size === 'lg' ? 'gap-5' : 'gap-5',
  } as const
})
</script>

<template>
  <Button
    v-if="context"
    :color="!inverted ? 'secondary' : 'neutral'"
    class="flex items-center"
    :class="[{ 'mx-auto': !collapsed }, sizeClass.gap]"
    :size="sizeClass.button"
  >
    <StoreRegionFlag v-if="context" :size="sizeClass.flag" :code="context.region" />
    <template v-if="!collapsed">
      {{ getRegionLabel(context.region) }}
      {{ $t('default.in-brackets', { text: getLocaleLabel(context.locale) }) }}
    </template>
    <IconChevronDown :class="sizeClass.icon" />
  </Button>
</template>
