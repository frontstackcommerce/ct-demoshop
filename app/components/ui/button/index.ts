import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        subtle: '',
        outline: '',
        ghost: '',
        link: '',
        form: '',
        icon: '',
      },
      color: {
        default: '',
        inverted: '',
        primary: '',
        secondary: '',
        neutral: '',
        buy: '',
        checkout: '',
        destructive: '',
        positive: '',
      },
      size: {
        default: 'h-10 px-5 py-2 text-sm',
        xs: 'h-7 px-3 text-xs',
        sm: 'h-9 px-4 text-sm',
        lg: 'h-12 px-8 text-sm',
        xl: 'h-14 px-10 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      color: 'default',
      size: 'default',
    },
    compoundVariants: [
      // Default color variants
      {
        color: 'default',
        variant: 'icon',
        class: 'p-2',
      },
      {
        color: 'default',
        variant: 'default',
        class: 'bg-foreground text-background hover:bg-foreground/90',
      },
      {
        color: 'default',
        variant: 'subtle',
        class: 'bg-shade text-foreground hover:bg-shade-200',
      },
      {
        color: 'default',
        variant: 'outline',
        class: 'border border-border text-foreground hover:bg-shade hover:border-foreground/20',
      },
      {
        color: 'default',
        variant: 'ghost',
        class: 'text-foreground hover:bg-shade',
      },
      {
        color: 'default',
        variant: 'link',
        class: 'text-foreground underline-offset-4 hover:underline px-0',
      },
      {
        color: 'default',
        variant: 'form',
        class: 'text-foreground border border-border focus-visible:ring-2 focus-visible:ring-ring',
      },
      
      // Inverted color variants
      {
        color: 'inverted',
        variant: 'default',
        class: 'bg-background text-foreground hover:bg-background/90',
      },
      {
        color: 'inverted',
        variant: 'outline',
        class: 'border border-background/30 text-background hover:bg-background hover:text-foreground',
      },
      {
        color: 'inverted',
        variant: 'ghost',
        class: 'text-background hover:bg-background/10',
      },
      {
        color: 'inverted',
        variant: 'link',
        class: 'text-background underline-offset-4 hover:underline px-0',
      },
      
      // Primary color variants
      {
        color: 'primary',
        variant: 'default',
        class: 'bg-primary text-primary-foreground hover:bg-primary/90',
      },
      {
        color: 'primary',
        variant: 'outline',
        class: 'border border-primary text-primary hover:bg-primary hover:text-primary-foreground',
      },
      {
        color: 'primary',
        variant: 'ghost',
        class: 'text-primary hover:bg-primary/10',
      },
      {
        color: 'primary',
        variant: 'link',
        class: 'text-primary underline-offset-4 hover:underline px-0',
      },
      
      // Secondary color variants
      {
        color: 'secondary',
        variant: 'default',
        class: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
      {
        color: 'secondary',
        variant: 'outline',
        class: 'border border-secondary text-secondary-foreground hover:bg-secondary',
      },
      {
        color: 'secondary',
        variant: 'ghost',
        class: 'text-secondary-foreground hover:bg-secondary',
      },
      
      // Buy color variants - Special treatment for add to cart
      {
        color: 'buy',
        variant: 'default',
        class: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md',
      },
      {
        color: 'buy',
        variant: 'outline',
        class: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',
      },
      
      // Checkout color variants
      {
        color: 'checkout',
        variant: 'default',
        class: 'bg-foreground text-background hover:bg-foreground/90',
      },
      
      // Destructive color variants
      {
        color: 'destructive',
        variant: 'default',
        class: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },
      {
        color: 'destructive',
        variant: 'outline',
        class: 'border border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground',
      },
      {
        color: 'destructive',
        variant: 'ghost',
        class: 'text-destructive hover:bg-destructive/10',
      },
      
      // Positive color variants
      {
        color: 'positive',
        variant: 'default',
        class: 'bg-positive text-positive-foreground hover:bg-positive/90',
      },
      {
        color: 'positive',
        variant: 'outline',
        class: 'border border-positive text-positive hover:bg-positive hover:text-positive-foreground',
      },
    ],
  }
)
export type ButtonVariants = VariantProps<typeof buttonVariants>
