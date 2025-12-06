import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap edges text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50',
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
        buy: 'shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300',
        checkout: '',
        destructive: '',
        positive: '',
      },
      size: {
        default: 'h-10 px-4 py-2 md:text-sm text-base',
        xs: 'h-7  px-2 text-xs',
        sm: 'h-9  px-3 text-sm',
        lg: 'h-11 px-8',
        xl: 'h-12 px-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      color: 'default',
      size: 'default',
    },
    compoundVariants: [
      {
        color: 'default',
        variant: 'icon',
        class: 'p-2',
      },
      {
        color: 'default',
        variant: 'default',
        class: 'bg-neutral text-neutral-foreground hover:bg-neutral/80',
      },
      {
        color: 'default',
        variant: 'subtle',
        class: 'bg-neutral/40 border border-neutral/40 text-neutral hover:border-neutral',
      },
      {
        color: 'default',
        variant: 'outline',
        class: 'text-neutral border border-neutral hover:bg-neutral hover:text-neutral-foreground',
      },
      {
        color: 'default',
        variant: 'ghost',
        class: 'text-neutral hover:bg-neutral hover:text-neutral-foreground',
      },
      {
        color: 'default',
        variant: 'link',
        class: 'text-neutral underline-offset-4 hover:underline',
      },
      {
        color: 'default',
        variant: 'form',
        class:
          'text-neutral border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:outline-none active:ring-2 active:ring-ring active:ring-offset-2 rounded-md ',
      },
      {
        color: 'default',
        variant: 'icon',
        class: 'p-2',
      },
      {
        color: 'inverted',
        variant: 'default',
        class: 'bg-neutral-foreground text-neutral hover:bg-neutral-foreground/80',
      },
      {
        color: 'inverted',
        variant: 'subtle',
        class:
          'bg-neutral-foreground/40 border border-neutral-foreground/40 text-neutral-foreground hover:border-neutral-foreground',
      },
      {
        color: 'inverted',
        variant: 'outline',
        class:
          'text-neutral-foreground border border-neutral-foreground hover:bg-neutral-foreground hover:text-neutral',
      },
      {
        color: 'inverted',
        variant: 'ghost',
        class: 'text-neutral-foreground hover:bg-neutral-foreground hover:text-neutral',
      },
      {
        color: 'inverted',
        variant: 'link',
        class: 'text-neutral-foreground underline-offset-4 hover:underline',
      },
      {
        color: 'primary',
        variant: 'icon',
        class: 'p-2',
      },
      {
        color: 'primary',
        variant: 'default',
        class: 'bg-primary text-primary-foreground hover:bg-primary/80',
      },
      {
        color: 'primary',
        variant: 'subtle',
        class:
          'bg-primary/40 border border-primary/40 text-primary-foreground/40 hover:border-primary',
      },
      {
        color: 'primary',
        variant: 'outline',
        class: 'text-primary border border-primary hover:bg-primary hover:text-primary-foreground',
      },
      {
        color: 'primary',
        variant: 'ghost',
        class: 'text-primary hover:bg-primary hover:text-primary-foreground',
      },
      {
        color: 'primary',
        variant: 'link',
        class: 'text-primary underline-offset-4 hover:underline',
      },
      {
        color: 'secondary',
        variant: 'icon',
        class: 'p-2',
      },
      {
        color: 'secondary',
        variant: 'default',
        class: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
      {
        color: 'secondary',
        variant: 'subtle',
        class:
          'bg-secondary/40 border border-secondary/40 text-secondary-foreground/40 hover:border-secondary',
      },
      {
        color: 'secondary',
        variant: 'outline',
        class:
          'text-secondary border border-secondary hover:bg-secondary hover:text-secondary-foreground',
      },
      {
        color: 'secondary',
        variant: 'ghost',
        class: 'text-secondary hover:bg-secondary hover:text-secondary-foreground',
      },
      {
        color: 'secondary',
        variant: 'link',
        class: 'text-secondary underline-offset-4 hover:underline',
      },
      {
        color: 'buy',
        variant: 'icon',
        class: 'p-2',
      },
      {
        color: 'buy',
        variant: 'default',
        class: 'bg-buy text-buy-foreground hover:bg-buy/80 py-8 ',
      },
      {
        color: 'buy',
        variant: 'subtle',
        class: 'bg-buy/40 border border-buy/40 text-buy-foreground/40 hover:border-buy py-8 ',
      },
      {
        color: 'buy',
        variant: 'outline',
        class: 'text-buy border border-buy hover:bg-buy hover:text-buy-foreground py-8 ',
      },
      {
        color: 'buy',
        variant: 'ghost',
        class: 'text-buy hover:bg-buy hover:text-buy-foreground py-8 ',
      },
      {
        color: 'buy',
        variant: 'link',
        class: 'text-buy underline-offset-4 hover:underline',
      },
      {
        color: 'checkout',
        variant: 'icon',
        class: 'p-2',
      },
      {
        color: 'checkout',
        variant: 'default',
        class: 'bg-checkout text-checkout-foreground hover:bg-checkout/80',
      },
      {
        color: 'checkout',
        variant: 'subtle',
        class:
          'bg-checkout/40 border border-checkout/40 text-checkout-foreground/40 hover:border-checkout',
      },
      {
        color: 'checkout',
        variant: 'outline',
        class:
          'text-checkout border border-checkout hover:bg-checkout hover:text-checkout-foreground',
      },
      {
        color: 'checkout',
        variant: 'ghost',
        class: 'text-checkout hover:bg-checkout hover:text-checkout-foreground',
      },
      {
        color: 'checkout',
        variant: 'link',
        class: 'text-checkout underline-offset-4 hover:underline',
      },
      {
        color: 'destructive',
        variant: 'icon',
        class: 'p-2',
      },
      {
        color: 'destructive',
        variant: 'default',
        class: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
      },
      {
        color: 'destructive',
        variant: 'subtle',
        class:
          'bg-destructive/40 border border-destructive/40 text-destructive-foreground/40 hover:border-destructive',
      },
      {
        color: 'destructive',
        variant: 'outline',
        class:
          'text-destructive border border-destructive hover:bg-destructive hover:text-destructive-foreground',
      },
      {
        color: 'destructive',
        variant: 'ghost',
        class: 'text-destructive hover:bg-destructive hover:text-destructive-foreground',
      },
      {
        color: 'destructive',
        variant: 'link',
        class: 'text-destructive underline-offset-4 hover:underline',
      },
      {
        color: 'positive',
        variant: 'icon',
        class: 'p-2',
      },
      {
        color: 'positive',
        variant: 'default',
        class: 'bg-positive text-positive-foreground hover:bg-positive/80',
      },
      {
        color: 'positive',
        variant: 'subtle',
        class:
          'bg-positive/40 border border-positive/40 text-positive-foreground/40 hover:border-positive',
      },
      {
        color: 'positive',
        variant: 'outline',
        class:
          'text-positive border border-positive hover:bg-positive hover:text-positive-foreground',
      },
      {
        color: 'positive',
        variant: 'ghost',
        class: 'text-positive hover:bg-positive hover:text-positive-foreground',
      },
      {
        color: 'positive',
        variant: 'link',
        class: 'text-positive underline-offset-4 hover:underline',
      },
    ],
  }
)
export type ButtonVariants = VariantProps<typeof buttonVariants>
