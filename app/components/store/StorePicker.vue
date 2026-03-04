<script setup lang="ts">
import { Globe } from 'lucide-vue-next'

defineProps<{
  inverted?: boolean
  collapsed?: boolean
}>()

const { contexts, context, update } = useContext()
const isOpen = ref(false)

function selectLocale(region: string, locale: string) {
  update({ region, locale })
  isOpen.value = false
}
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <button
        class="flex items-center gap-2 text-xs transition-colors"
        :class="
          inverted
            ? 'text-background/80 hover:text-background'
            : 'text-muted-foreground hover:text-foreground'
        "
      >
        <Globe class="size-4" />
        <span v-if="!collapsed">
          {{ context?.locale || 'EN' }}
        </span>
      </button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{{ $t('context.title') }}</DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div v-for="ctx in contexts" :key="ctx.region">
          <button
            v-for="loc in ctx.locales"
            :key="loc.key"
            class="mb-2 w-full rounded-md border p-4 text-left text-sm transition-colors hover:bg-shade"
            :class="
              context?.region === ctx.region && context?.locale === loc.key
                ? 'border-primary bg-shade'
                : 'border-border'
            "
            @click="selectLocale(ctx.region, loc.key)"
          >
            <div class="font-medium">{{ ctx.region.toUpperCase() }}</div>
            <div class="text-muted-foreground">{{ loc.key }}</div>
          </button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
