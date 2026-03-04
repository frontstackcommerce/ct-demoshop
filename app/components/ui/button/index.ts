import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Button } from "./Button.vue"

export const buttonVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-full border border-transparent bg-clip-padding text-sm font-semibold uppercase tracking-wider focus-visible:ring-[3px] aria-invalid:ring-[3px] [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        subtle: "border border-primary/40 bg-primary/10 text-primary hover:border-primary",
        outline: "border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground shadow-xs",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost: "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground",
        destructive: "bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30",
        link: "text-primary underline-offset-4 hover:underline",
        form: "text-neutral-foreground border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:outline-none active:ring-2 active:ring-ring active:ring-offset-2 rounded-full",
      },
      color: {
        primary: "",
        secondary: "",
        inverted: "bg-inverted text-inverted-foreground hover:bg-inverted/90",
        buy: "bg-buy text-buy-foreground hover:bg-buy/90",
        checkout: "bg-checkout text-checkout-foreground hover:bg-checkout/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        positive: "bg-positive text-positive-foreground hover:bg-positive/90",
      },
      size: {
        "default": "h-12 gap-2 px-8 in-data-[slot=button-group]:rounded-full has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
        "xs": "h-8 gap-1 rounded-full px-3 text-xs in-data-[slot=button-group]:rounded-full has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        "sm": "h-10 gap-1.5 rounded-full px-6 in-data-[slot=button-group]:rounded-full has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        "lg": "h-14 gap-2 px-10 has-data-[icon=inline-end]:pr-6 has-data-[icon=inline-start]:pl-6",
        "icon": "size-12",
        "icon-xs": "size-8 rounded-full in-data-[slot=button-group]:rounded-full [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-10 rounded-full in-data-[slot=button-group]:rounded-full",
        "icon-lg": "size-14",
      },
    },
    defaultVariants: {
      variant: "default",
      color: "primary",
      size: "default",
    },
  },
)
export type ButtonVariants = VariantProps<typeof buttonVariants>
