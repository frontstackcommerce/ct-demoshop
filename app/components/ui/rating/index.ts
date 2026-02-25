import { cva, type VariantProps } from 'class-variance-authority'

export { default as Rating } from './Rating.vue'
export { default as RatingIcon } from './RatingIcon.vue'
export { default as RatingMeta } from './RatingMeta.vue'

export const ratingVariants = cva('shrink-0 ', {
  variants: {
    color: {
      default: 'fill-yellow-400 stroke-yellow-400',
      primary: 'fill-primary stroke-primary',
      inverted: 'fill-inverted stroke-inverted',
      muted: 'fill-muted stroke-muted',
    },
    size: {
      default: 'w-8 h-8',
      sm: 'w-5 h-5',
      lg: 'w-10 h-10',
    },
  },
  defaultVariants: {
    color: 'default',
    size: 'default',
  },
})

export type RatingVariants = VariantProps<typeof ratingVariants>
