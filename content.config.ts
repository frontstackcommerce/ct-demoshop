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

const homeSchema = z.object({
  hero: z.object({
    label: z.string(),
    title: z.string(),
    description: z.string(),
    buttonText: z.string(),
    buttonLink: z.string(),
    imageAlt: z.string(),
    image: z.string(),
    scrollLabel: z.string(),
  }),
  promo: z.object({
    label: z.string(),
    title: z.string(),
    titleHighlight: z.string(),
    priceLabel: z.string(),
    priceAmount: z.string(),
    description: z.string(),
    startingAtLabel: z.string(),
    startingAtPrice: z.string(),
    link: z.string(),
    images: z.object({
      main: z.string(),
      secondary1: z.string(),
      secondary2: z.string(),
    }),
  }),
  quote: z.string(),
  categories: z.object({
    label: z.string(),
    title: z.string(),
    fallbackImages: z.array(z.string()),
  }),
  bedroom: z.object({
    titleLine1: z.string(),
    titleHighlight: z.string(),
    titleLine3: z.string(),
    description: z.string(),
    link: z.string(),
    image: z.string(),
    imageAlt: z.string(),
  }),
  featured: z.object({
    label: z.string(),
    title: z.string(),
    description: z.string(),
    items: z.array(
      z.object({
        image: z.string(),
        title: z.string(),
        subtitle: z.string(),
        link: z.string(),
      }),
    ),
  }),
  values: z.object({
    label: z.string(),
    title: z.string(),
    items: z.array(
      z.object({
        icon: z.string(),
        title: z.string(),
        description: z.string(),
      }),
    ),
  }),
  newArrivals: z.object({
    label: z.string(),
    title: z.string(),
    description: z.string(),
    buttonText: z.string(),
    buttonLink: z.string(),
  }),
})

const brandsSchema = z.object({
  hero: z.object({
    label: z.string(),
    title: z.string(),
    description: z.string(),
  }),
  featured: z.object({
    label: z.string(),
    description: z.string(),
  }),
  highlighted: z.object({
    label: z.string(),
    title: z.string(),
    cardDescription: z.string(),
  }),
  philosophy: z.object({
    label: z.string(),
    quote: z.string(),
    highlight: z.string(),
    description: z.string(),
  }),
  directory: z.object({
    label: z.string(),
    title: z.string(),
    description: z.string(),
  }),
  cta: z.object({
    title: z.string(),
    description: z.string(),
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
    ...localizedCollection('home', 'home.yml', homeSchema),
    ...localizedCollection('brands', 'brands.yml', brandsSchema),
    ...localizedCollection('faq', 'faq.yml', faqSchema),

    // Localized page collections (markdown)
    ...localizedPages('pages', '*.md'),
  },
})
