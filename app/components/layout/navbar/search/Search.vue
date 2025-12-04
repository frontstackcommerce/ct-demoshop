<template>
  <NavigationMenuList>
    <NavigationMenuItem value="search">
      <NavigationMenuTrigger as-child>
        <Button
          variant="icon"
          size="xs"
          class="size-14 rounded-full border-4 border-transparent p-0 hover:bg-white/20 data-[state=open]:bg-white/20"
        >
          <IconSearch class="size-6" />
        </Button>
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <PageDrawerSearch />
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</template>
