<script setup lang="ts">
import type { NavigationMenuRootEmits, NavigationMenuRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import {
  NavigationMenuRoot,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from "@/lib/utils"
import { useProvideMegaMenu } from "./useMegaMenu"

const props = defineProps<NavigationMenuRootProps & {
  class?: HTMLAttributes["class"]
}>()
const emits = defineEmits<NavigationMenuRootEmits>()

const delegatedProps = reactiveOmit(props, "class")
const forwarded = useForwardPropsEmits(delegatedProps, emits)

const { rootRef } = useProvideMegaMenu()
</script>

<template>
  <NavigationMenuRoot
    ref="rootRef"
    v-slot="slotProps"
    data-slot="mega-menu"
    v-bind="forwarded"
    :class="cn('static flex items-center', props.class)"
  >
    <slot v-bind="slotProps" />
  </NavigationMenuRoot>
</template>
