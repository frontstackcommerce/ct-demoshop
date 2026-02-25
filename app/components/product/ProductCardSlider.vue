<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    products: ProductCard[]
    slidesToScroll?: number
    slidesToShow?: number
    title?: string
  }>(),
  {
    slidesToScroll: 1, // The number of slides to scroll
    slidesToShow: 2.5, // The number of slides to show
    title: undefined,
  },
)

const { closeMenu } = useMenuState()
</script>

<template>
  <div class="flex flex-col gap-5">
    <h2 v-if="title" class="px-4 text-2xl font-medium lg:px-0">{{ title }}</h2>

    <Carousel
      v-if="products.length > 0"
      v-slot="{ canScrollNext, canScrollPrev }"
      class="relative"
      :opts="{
        align: 'start',
        slidesToScroll: props.slidesToScroll,
        duration: 10,
        dragFree: true,
      }"
    >
      <CarouselContent>
        <CarouselItem v-for="product of products" :key="product.key" class="basis-3/4 lg:basis-1/5">
          <div class="h-full w-auto">
            <ProductCard :product="product" @click="closeMenu" />
          </div>
        </CarouselItem>
      </CarouselContent>

      <CarouselProgress v-show="canScrollNext || canScrollPrev" :visible-slides="slidesToShow" />
    </Carousel>
    <Skeleton v-else class="bg-shade-100 aspect-[0.9] w-full md:aspect-square" />
  </div>
</template>
