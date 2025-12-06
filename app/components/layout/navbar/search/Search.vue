<template>
  <NavigationMenuList>
    <NavigationMenuItem value="search">
      <NavigationMenuTrigger as-child>
        <Button
          variant="icon"
          size="xs"
          class="hover:bg-active/20 data-[state=open]:bg-active/20 size-10 rounded-full border-4 border-transparent p-0"
        >
          <IconSearch class="size-5" />
        </Button>
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <LayoutDrawerSearch />
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</template>
