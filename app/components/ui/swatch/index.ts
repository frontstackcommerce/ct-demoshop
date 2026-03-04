import { cva, type VariantProps } from "class-variance-authority"

export { default as Swatch } from "./Swatch.vue"

export const swatchVariants = cva(
  "border border-border ring-offset-background hover:border-neutral hover:text-neutral-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=on]:border-inverted inline-flex items-center justify-center font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "rounded-sm",
        circle: "rounded-full",
      },
      size: {
        md: "size-16 md:size-14 text-sm font-semibold",
        sm: "size-14 md:size-10 text-sm font-semibold",
        lg: "size-20 md:size-18 text-lg font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
)

export type SwatchVariants = VariantProps<typeof swatchVariants>
