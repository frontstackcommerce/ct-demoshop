import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Badge } from "./Badge.vue"

export const badgeVariants = cva(
  "h-6 gap-1 rounded-full border border-transparent px-4 py-1 text-xs font-semibold uppercase tracking-wider transition-all has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&>svg]:size-3! inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-colors overflow-hidden group/badge",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        subtle: "border-transparent bg-primary/20 text-primary",
        secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive: "bg-destructive/10 [a]:hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive dark:bg-destructive/20",
        outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      color: {
        primary: "",
        secondary: "",
        promo: "bg-promo text-promo-foreground",
        discount: "bg-discount text-discount-foreground",
        new: "bg-new text-new-foreground",
        price: "bg-price text-price-foreground",
        destructive: "bg-destructive text-white",
        positive: "bg-positive text-positive-foreground",
      },
      size: {
        md: "px-4 py-1.5 text-xs font-semibold uppercase tracking-wider",
        sm: "px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full",
        lg: "px-5 py-2 text-sm font-semibold uppercase tracking-wider",
      },
    },
    defaultVariants: {
      variant: "default",
      color: "primary",
      size: "md",
    },
  },
)
export type BadgeVariants = VariantProps<typeof badgeVariants>
