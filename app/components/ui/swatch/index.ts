import { cva, type VariantProps } from 'class-variance-authority'

export { default as Swatch } from './Swatch.vue'

export const swatchVariants = cva(
  'inline-flex border border-border items-center justify-center font-medium ring-offset-background transition-colors hover:border-neutral hover:text-neutral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:border-inverted',
  {
    variants: {
      variant: {
        default: 'rounded-md',
        circle: 'rounded-full',
      },
      size: {
        default: 'size-14 md:size-12 text-sm',
        sm: 'size-12 md:size-9 text-sm',
        lg: 'size-16 md:size-16 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export type SwatchVariants = VariantProps<typeof swatchVariants>
