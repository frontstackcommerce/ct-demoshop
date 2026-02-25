export { default as Accordion } from "./Accordion.vue"
export { default as AccordionContent } from "./AccordionContent.vue"
export { default as AccordionItem } from "./AccordionItem.vue"
export { default as AccordionTrigger } from "./AccordionTrigger.vue"
import { type VariantProps, cva } from "class-variance-authority"

export const accordionVariants = cva("", {
  variants: {
    variant: {
      default: "border-b border-border",
      boxed: "rounded-md bg-shade-100 px-3 text-foreground",
      bordered: "rounded-md border border-border px-3",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type AccordionVariants = VariantProps<typeof accordionVariants>
