<script setup lang="ts">
import { Heart } from 'lucide-vue-next'

const { favorites } = useFavorites()
</script>

<template>
  <NavigationMenuList>
    <NavigationMenuItem value="favorites">
      <NavigationMenuTrigger as-child>
        <Button variant="icon" size="xs" class="size-14 rounded-full border-4 border-transparent p-0 hover:bg-white/20 data-[state=open]:bg-white/20">
          <Heart class="size-6" />

          <ClientOnly>
            <div v-if="favorites.length > 0" class="bg-background absolute top-1 right-1 flex size-5 items-center justify-center rounded-full text-xs opacity-90">
              <span class="text-foreground">{{ favorites.length }}</span>
            </div>
          </ClientOnly>
        </Button>
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <LazyPageNavbarFavoritesList />
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</template>
