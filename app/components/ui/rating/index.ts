import { cva, type VariantProps } from "class-variance-authority"

export { default as Rating } from "./Rating.vue"
export { default as RatingIcon } from "./RatingIcon.vue"
export { default as RatingMeta } from "./RatingMeta.vue"

export const ratingVariants = cva("shrink-0", {
  variants: {
    color: {
      yellow: "fill-yellow-400 stroke-yellow-400",
      primary: "fill-primary stroke-primary",
      inverted: "fill-inverted stroke-inverted",
      muted: "fill-muted stroke-muted",
    },
    size: {
      md: "h-10 w-10",
      sm: "h-6 w-6",
      lg: "h-12 w-12",
    },
  },
  defaultVariants: {
    color: "yellow",
    size: "md",
  },
})

export type RatingVariants = VariantProps<typeof ratingVariants>
