<script setup lang="ts">
const route = useRoute()
const slug = computed(() => (route.params.slug as string) || '')
const { locale } = useI18n()
const client = useFronticClient()

const { data: campaign } = await useAsyncData(`campaign-${slug.value}`, () =>
  queryCollection(`campaigns_${locale.value}` as any)
    .where('slug', '=', slug.value)
    .first(),
)

if (!campaign.value) {
  throw createError({ statusCode: 404, message: 'Campaign not found' })
}

const { data: products } = await useAsyncData(`campaign-products-${slug.value}`, async () => {
  const q = campaign.value!.productQuery as any
  const response = await client.listing(q.resource, {}, {
    query: {
      ...(q.filter && { filter: q.filter }),
      ...(q.sort && { sort: q.sort }),
      ...(q.limit && { limit: q.limit }),
      ...(q.search && { search: q.search }),
    },
  })
  return response.items || []
})

const premiumQuery = (campaign.value as any).premiumQuery
const { data: premiumProducts } = premiumQuery
  ? await useAsyncData(`campaign-premium-${slug.value}`, async () => {
      const response = await client.listing(premiumQuery.resource, {}, {
        query: {
          ...(premiumQuery.filter && { filter: premiumQuery.filter }),
          ...(premiumQuery.sort && { sort: premiumQuery.sort }),
          ...(premiumQuery.limit && { limit: premiumQuery.limit }),
        },
      })
      return response.items || []
    })
  : { data: ref([]) }

useHead({ title: campaign.value.title })
</script>

<template>
  <div v-if="campaign" class="min-h-screen">
    <CampaignKitchen
      v-if="campaign.template === 'kitchen'"
      :campaign="campaign"
      :products="products || []"
    />
    <CampaignBedroom
      v-else-if="campaign.template === 'bedroom'"
      :campaign="campaign"
      :products="products || []"
      :premium-products="premiumProducts || []"
    />
  </div>
</template>
