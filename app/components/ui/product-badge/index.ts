import { cva, type VariantProps } from 'class-variance-authority'

export { default as ProductBadge } from './ProductBadge.vue'

export const productBadgeVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors',
  {
    variants: {
      type: {
        sale: '',
        new: '',
        discount: '',
      },
      variant: {
        default: 'border-transparent',
        subtle: 'border-transparent',
        outline: 'border',
      },
      size: {
        sm: 'rounded-sm px-1.5 py-0.5 text-[10px] leading-tight',
        default: 'rounded-md px-2.5 py-1 text-xs',
        lg: 'rounded-md px-3 py-1.5 text-sm',
      },
    },
    compoundVariants: [
      // Sale — solid background
      { type: 'sale', variant: 'default', class: 'bg-sale text-sale-foreground' },
      // Sale — transparent tint
      { type: 'sale', variant: 'subtle', class: 'bg-sale/20 text-sale' },
      // Sale — border only
      { type: 'sale', variant: 'outline', class: 'border-sale text-sale' },

      // New — solid background
      { type: 'new', variant: 'default', class: 'bg-new text-new-foreground' },
      // New — transparent tint
      { type: 'new', variant: 'subtle', class: 'bg-new/20 text-new' },
      // New — border only
      { type: 'new', variant: 'outline', class: 'border-new text-new' },

      // Discount — solid background
      { type: 'discount', variant: 'default', class: 'bg-discount text-discount-foreground' },
      // Discount — transparent tint
      { type: 'discount', variant: 'subtle', class: 'bg-discount/20 text-discount' },
      // Discount — border only
      { type: 'discount', variant: 'outline', class: 'border-discount text-discount' },
    ],
    defaultVariants: {
      type: 'sale',
      variant: 'default',
      size: 'default',
    },
  },
)

export type ProductBadgeVariants = VariantProps<typeof productBadgeVariants>
