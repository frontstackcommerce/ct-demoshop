<script setup lang="ts">
import type { NavigationMenuContentEmits, NavigationMenuContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import {
  NavigationMenuContent,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from "@/lib/utils"
import { useMegaMenu } from "./useMegaMenu"

const props = defineProps<NavigationMenuContentProps & {
  class?: HTMLAttributes["class"]
  top?: string
}>()
const emits = defineEmits<NavigationMenuContentEmits>()

const delegatedProps = reactiveOmit(props, "class", "top")
const forwarded = useForwardPropsEmits(delegatedProps, emits)

const { megaMenuTop } = useMegaMenu()
</script>

<template>
  <NavigationMenuContent
    data-slot="mega-menu-content"
    v-bind="forwarded"
    :class="cn(
      'fixed left-0 right-0 z-50 bg-background shadow-lg',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
      'data-[state=closed]:zoom-out-[0.98] data-[state=open]:zoom-in-[0.98]',
      'duration-200',
      props.class,
    )"
    :style="{ top: props.top ?? megaMenuTop }"
  >
    <slot />
  </NavigationMenuContent>
</template>
