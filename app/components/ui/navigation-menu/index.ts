import { cva } from 'class-variance-authority'

export { default as NavigationMenu } from './NavigationMenu.vue'
export { default as NavigationMenuContent } from './NavigationMenuContent.vue'
export { default as NavigationMenuIndicator } from './NavigationMenuIndicator.vue'
export { default as NavigationMenuItem } from './NavigationMenuItem.vue'
export { default as NavigationMenuLink } from './NavigationMenuLink.vue'
export { default as NavigationMenuList } from './NavigationMenuList.vue'
export { default as NavigationMenuTrigger } from './NavigationMenuTrigger.vue'
export { default as NavigationMenuViewport } from './NavigationMenuViewport.vue'

export const navigationMenuTriggerStyle = cva(
  'group inline-flex  w-max items-center justify-center  px-2 h-10 font-light transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:underline data-[state=open]:underline-offset-8 hover:underline hover:underline-offset-8'
)
