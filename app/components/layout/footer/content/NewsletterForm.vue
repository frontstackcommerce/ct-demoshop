<script setup lang="ts">
const { data: nav } = useNavContent()

const newsletter = computed(() => nav.value?.footer?.newsletter)
const legalLinks = computed(() => nav.value?.footer?.legalLinks ?? [])
</script>

<template>
  <div class="font-display">{{ newsletter?.title }}</div>
  <div class="mt-4 flex flex-col gap-4 text-sm">
    <div class="pr-10">{{ newsletter?.description }}</div>

    <div class="max-w-64">
      <Input type="email" :placeholder="newsletter?.placeholder" />
    </div>
    <div class="flex items-center gap-2">
      <div class="flex items-center space-x-2">
        <Checkbox id="accept" />
        <label
          for="accept"
          class="text-xs leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {{ newsletter?.accept }}
          <NuxtLinkLocale
            v-if="legalLinks[0]"
            :to="legalLinks[0].href"
            class="text-inverted-foreground underline underline-offset-4"
            >{{ legalLinks[0].label }}</NuxtLinkLocale
          >
          {{ newsletter?.divider }}
          <NuxtLinkLocale
            v-if="legalLinks[1]"
            :to="legalLinks[1].href"
            class="text-inverted-foreground underline underline-offset-4"
            >{{ legalLinks[1].label }}</NuxtLinkLocale
          >
        </label>
      </div>
    </div>
  </div>
</template>
