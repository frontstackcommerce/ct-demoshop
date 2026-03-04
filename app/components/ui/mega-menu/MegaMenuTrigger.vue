<script setup lang="ts">
import type { NavigationMenuTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { NavigationMenuTrigger, useForwardProps } from "reka-ui"
import { cn } from "@/lib/utils"
import { useMegaMenu } from "./useMegaMenu"

const props = defineProps<NavigationMenuTriggerProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
const forwardedProps = useForwardProps(delegatedProps)

const { updateTop } = useMegaMenu()
</script>

<template>
  <NavigationMenuTrigger
    data-slot="mega-menu-trigger"
    v-bind="forwardedProps"
    :class="cn('group inline-flex items-center justify-center text-sm font-medium transition-colors focus:outline-none', props.class)"
    @click="updateTop"
  >
    <slot />
  </NavigationMenuTrigger>
</template>
