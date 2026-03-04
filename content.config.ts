import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// Supported locales
const LOCALES = ['en', 'de'] as const

// Helper to create localized collections for both en and de
function localizedCollection(
  baseName: string,
  sourceFile: string,
  schema: ReturnType<typeof z.object>,
) {
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

const navLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
})

const navGroupSchema = z.object({
  title: z.string(),
  links: z.array(navLinkSchema),
})

const navigationSchema = z.object({
  header: z.object({
    teaser: z.string(),
  }),
  about: navGroupSchema,
  footer: z.object({
    groups: z.array(navGroupSchema),
    legalLinks: z.array(navLinkSchema),
    newsletter: z.object({
      title: z.string(),
      description: z.string(),
      placeholder: z.string(),
      accept: z.string(),
      divider: z.string(),
    }),
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

const productQuerySchema = z.object({
  resource: z.string(),
  search: z.string().optional(),
  filter: z.array(z.record(z.any())).optional(),
  sort: z.object({ field: z.string(), order: z.string() }).optional(),
  limit: z.number().optional(),
})

const campaignSchema = z.object({
  slug: z.string(),
  template: z.enum(['kitchen', 'bedroom']),
  title: z.string(),
  productQuery: productQuerySchema,
  premiumQuery: productQuerySchema.optional(),
  data: z.record(z.any()).optional(),
})

// Helper to create localized campaign collections
function localizedCampaigns(baseName: string, sourcePattern: string, schema: ReturnType<typeof z.object>) {
  return Object.fromEntries(
    LOCALES.map((locale) => [
      `${baseName}_${locale}`,
      defineCollection({
        type: 'data',
        source: `${locale}/${sourcePattern}`,
        schema,
      }),
    ]),
  )
}

// Helper to create localized page collections (markdown)
function localizedPages(baseName: string, sourcePattern: string) {
  return Object.fromEntries(
    LOCALES.map((locale) => [
      `${baseName}_${locale}`,
      defineCollection({
        type: 'page',
        source: `${locale}/${sourcePattern}`,
      }),
    ]),
  )
}

export default defineContentConfig({
  collections: {
    // Localized data collections (en + de)
    ...localizedCollection('navigation', 'navigation.yml', navigationSchema),
    ...localizedCollection('faq', 'faq.yml', faqSchema),

    // Localized campaign collections
    ...localizedCampaigns('campaigns', 'campaigns/*.yml', campaignSchema),

    // Localized page collections (markdown)
    ...localizedPages('pages', '*.md'),
  },
})
