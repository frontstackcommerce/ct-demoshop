import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// Supported locales
const LOCALES = ['en', 'de'] as const

// Helper to create localized collections for both en and de
function localizedCollection(baseName: string, sourceFile: string, schema: ReturnType<typeof z.object>) {
  return Object.fromEntries(
    LOCALES.map((locale) => [
      `${baseName}_${locale}`,
      defineCollection({
        type: 'data',
        source: `${locale}/${sourceFile}`,
        schema,
      }),
    ]),
  )
}

// Reusable schemas
const navLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
  external: z.boolean().optional(),
})

// Schema definitions
const navigationSchema = z.object({
  header: z.object({
    navLinks: z.array(navLinkSchema),
    ctaLabel: z.string(),
    ctaHref: z.string(),
  }),
  footer: z.object({
    navLinks: z.array(navLinkSchema),
    legalLinks: z.array(navLinkSchema),
    newsletter: z.object({
      headline: z.string(),
      description: z.string(),
      buttonLabel: z.string(),
      buttonHref: z.string(),
    }),
  }),
})

const landingSchema = z.object({
  hero: z.object({
    badge: z.object({
      text: z.string(),
      href: z.string(),
    }),
    headline: z.string(),
    subheadline: z.string(),
    primaryCta: z.object({
      label: z.string(),
      href: z.string(),
    }),
    secondaryCta: z.object({
      label: z.string(),
    }),
  }),
  readyToStart: z.object({
    headline: z.string(),
    description: z.string(),
    quickStart: z.object({
      title: z.string(),
      description: z.string(),
      features: z.array(z.string()),
      ctaLabel: z.string(),
      ctaHref: z.string(),
    }),
    connectData: z.object({
      title: z.string(),
      description: z.string(),
      features: z.array(z.string()),
      ctaLabel: z.string(),
      ctaHref: z.string(),
    }),
  }),
  stories: z.object({
    headline: z.string(),
    subheadline: z.string(),
  }),
})

const faqSchema = z.object({
  title: z.object({
    line1: z.string(),
    line2: z.string(),
  }),
  items: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    }),
  ),
})

export default defineContentConfig({
  collections: {
    // Localized collections (en + de)
    ...localizedCollection('navigation', 'navigation.yml', navigationSchema),
    ...localizedCollection('landing', 'landing.yml', landingSchema),
    ...localizedCollection('faq', 'faq.yml', faqSchema),
  },
})
