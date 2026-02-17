<script setup lang="ts">
import client from '../../../.frontstack/generated-client'

// Fetch bed products by searching for bed-related terms
const { data: allProducts } = await useAsyncData('bedroom-products', async () => {
  const response = await client.listing('ProductSearch', {}, {
    query: {
      search: 'bed',
      sort: {
        field: 'price.amount',
        order: 'desc'
      },
      limit: 24
    }
  })
  return response.items || []
})

// Also fetch high-end furniture for the bedroom context
const { data: premiumProducts } = await useAsyncData('premium-bedroom', async () => {
  const response = await client.listing('ProductSearch', {}, {
    query: {
      filter: [
        {
          type: 'range',
          field: 'price.amount',
          from: 50000 // Products over €500
        }
      ],
      sort: {
        field: 'price.amount',
        order: 'desc'
      },
      limit: 12
    }
  })
  return response.items || []
})

const isLoaded = ref(false)
const activeTestimonial = ref(0)
const scrollProgress = ref(0)

onMounted(() => {
  requestAnimationFrame(() => {
    isLoaded.value = true
  })
  
  // Testimonial auto-rotation
  setInterval(() => {
    activeTestimonial.value = (activeTestimonial.value + 1) % testimonials.length
  }, 6000)
  
  // Scroll progress for parallax effects
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      scrollProgress.value = window.scrollY
    })
  }
})

// Split products for different sections
const heroProduct = computed(() => allProducts.value?.[0] || premiumProducts.value?.[0])
const featuredBeds = computed(() => {
  const beds = allProducts.value?.slice(0, 6) || []
  return beds.length ? beds : premiumProducts.value?.slice(0, 6) || []
})
const showcaseProducts = computed(() => premiumProducts.value?.slice(0, 8) || [])

const testimonials = [
  {
    quote: "The moment I lay down, I knew this was different. It's not just a bed—it's where I rediscover myself each morning.",
    author: "Sophie M.",
    location: "Munich",
    rating: 5
  },
  {
    quote: "After years of restless nights, I finally understand what restorative sleep feels like. Worth every cent.",
    author: "Thomas K.",
    location: "Vienna", 
    rating: 5
  },
  {
    quote: "My bedroom has become my sanctuary. The craftsmanship is extraordinary—you can feel the quality.",
    author: "Elena R.",
    location: "Zurich",
    rating: 5
  }
]

const sleepBenefits = [
  { icon: 'moon', title: 'Deep Sleep', description: 'Engineered for optimal REM cycles and restorative rest' },
  { icon: 'heart', title: 'Spinal Alignment', description: 'Ergonomic support that adapts to your body\'s natural curves' },
  { icon: 'sun', title: 'Wake Refreshed', description: 'Temperature-regulating materials for uninterrupted sleep' },
  { icon: 'shield', title: '10-Year Warranty', description: 'Our promise of lasting quality and craftsmanship' }
]
</script>

<template>
  <div class="min-h-screen bg-background overflow-hidden">
    
    <!-- Immersive Hero - Full Viewport with Video-like Feel -->
    <section class="relative h-[100svh] min-h-[700px] overflow-hidden">
      <!-- Layered Background for Depth -->
      <div class="absolute inset-0 bg-warm-950">
        <!-- Primary Image -->
        <div 
          class="absolute inset-0 transition-transform duration-1000"
          :style="{ transform: `scale(${1.1 - scrollProgress * 0.0001})` }"
        >
          <NuxtImg
            src="https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Opal_King_Bed-1.1.jpeg"
            alt="Luxury bedroom sanctuary"
            class="w-full h-full object-cover opacity-70"
          />
        </div>
        <!-- Gradient Overlays for Cinematic Feel -->
        <div class="absolute inset-0 bg-gradient-to-b from-warm-950/80 via-warm-950/30 to-warm-950" />
        <div class="absolute inset-0 bg-gradient-to-r from-warm-950/60 via-transparent to-warm-950/60" />
        <!-- Vignette Effect -->
        <div class="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.5)]" />
      </div>

      <!-- Hero Content - Dramatic Typography -->
      <div class="relative h-full flex flex-col justify-center items-center text-center px-6">
        <div class="max-w-4xl">
          <!-- Floating Badge -->
          <div 
            class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-2 mb-8 transition-all duration-1000"
            :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'"
          >
            <span class="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span class="text-white/80 text-xs tracking-[0.25em] uppercase">The Art of Rest</span>
          </div>

          <!-- Main Headline - Split for Drama -->
          <h1 class="relative">
            <span 
              class="block font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-light leading-[0.9] transition-all duration-1000 delay-100"
              :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            >
              Your
            </span>
            <span 
              class="block font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-primary font-light italic leading-[0.9] transition-all duration-1000 delay-200"
              :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            >
              Sanctuary
            </span>
            <span 
              class="block font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-light leading-[0.9] transition-all duration-1000 delay-300"
              :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            >
              Awaits
            </span>
          </h1>

          <!-- Subheadline -->
          <p 
            class="mt-8 text-white/60 text-lg sm:text-xl lg:text-2xl font-light max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-400"
            :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
          >
            Where extraordinary craftsmanship meets the science of perfect sleep. 
            Discover beds that transform nights into journeys.
          </p>

          <!-- CTA Group -->
          <div 
            class="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-500"
            :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
          >
            <a 
              href="#collection" 
              class="group inline-flex items-center gap-3 bg-white text-warm-950 px-10 py-5 text-sm tracking-[0.15em] uppercase hover:bg-primary hover:text-white transition-all duration-500"
            >
              <span>Explore Collection</span>
              <IconArrowDown class="size-4 transition-transform group-hover:translate-y-1" />
            </a>
            <a 
              href="#story" 
              class="inline-flex items-center gap-3 text-white/70 hover:text-white text-sm tracking-[0.15em] uppercase transition-colors"
            >
              <span>Our Philosophy</span>
              <IconArrowRight class="size-4" />
            </a>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator - Animated -->
      <div 
        class="absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-700"
        :class="isLoaded ? 'opacity-100' : 'opacity-0'"
      >
        <div class="flex flex-col items-center">
          <div class="w-px h-16 bg-gradient-to-b from-transparent via-white/40 to-transparent relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-4 bg-white/60 animate-[scrollDown_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>

      <!-- Side Stats - Desktop Only -->
      <div 
        class="hidden lg:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col gap-8 transition-all duration-1000 delay-600"
        :class="isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'"
      >
        <div class="text-right">
          <p class="text-4xl font-serif text-white">98%</p>
          <p class="text-xs text-white/50 tracking-wider uppercase">Sleep Better</p>
        </div>
        <div class="w-px h-12 bg-white/20 self-end" />
        <div class="text-right">
          <p class="text-4xl font-serif text-white">10yr</p>
          <p class="text-xs text-white/50 tracking-wider uppercase">Warranty</p>
        </div>
        <div class="w-px h-12 bg-white/20 self-end" />
        <div class="text-right">
          <p class="text-4xl font-serif text-white">100</p>
          <p class="text-xs text-white/50 tracking-wider uppercase">Night Trial</p>
        </div>
      </div>
    </section>

    <!-- Trust Bar - Social Proof -->
    <section class="bg-warm-950 border-y border-white/10 py-6 overflow-hidden">
      <div class="mx-auto max-w-7xl px-6">
        <div class="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-white/40 text-sm">
          <span class="flex items-center gap-2">
            <IconStar class="size-4 fill-primary text-primary" />
            <IconStar class="size-4 fill-primary text-primary" />
            <IconStar class="size-4 fill-primary text-primary" />
            <IconStar class="size-4 fill-primary text-primary" />
            <IconStar class="size-4 fill-primary text-primary" />
            <span class="ml-2">4.9/5 from 2,847 reviews</span>
          </span>
          <span class="hidden sm:inline">•</span>
          <span>Free White Glove Delivery</span>
          <span class="hidden sm:inline">•</span>
          <span>100-Night Sleep Trial</span>
          <span class="hidden sm:inline">•</span>
          <span>Handcrafted in Europe</span>
        </div>
      </div>
    </section>

    <!-- Philosophy Section - Editorial Storytelling -->
    <section id="story" class="py-24 lg:py-40 bg-background">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <!-- Left: Image Composition -->
          <div class="relative">
            <div class="relative aspect-[4/5]">
              <NuxtImg
                src="https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Walnut_Counter_Stool-1.2.jpeg"
                alt="Bedroom detail"
                class="w-full h-full object-cover"
              />
            </div>
            <!-- Floating Accent Image -->
            <div class="absolute -bottom-8 -right-8 lg:-right-16 w-1/2 aspect-square shadow-2xl">
              <NuxtImg
                src="https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Minimalist_Modern_Bedroom-1.1.jpeg"
                alt="Bedroom ambiance"
                class="w-full h-full object-cover"
              />
            </div>
            <!-- Decorative Element -->
            <div class="absolute -top-4 -left-4 w-24 h-24 border border-primary/30" />
          </div>

          <!-- Right: Content -->
          <div class="lg:pl-8">
            <span class="text-primary text-xs tracking-[0.3em] uppercase font-medium">Our Philosophy</span>
            <h2 class="mt-6 font-serif text-4xl lg:text-5xl xl:text-6xl leading-[1.1]">
              Sleep is not a luxury.<br>
              <span class="text-primary italic">It's a necessity.</span>
            </h2>
            <div class="mt-8 space-y-6 text-muted-foreground text-lg font-light leading-relaxed">
              <p>
                In a world that never stops, your bedroom should be a refuge—a place where 
                time slows and restoration begins. We've spent decades perfecting the art of rest.
              </p>
              <p>
                Every bed we create is a collaboration between master craftsmen and sleep scientists, 
                using only the finest natural materials sourced from sustainable suppliers across Europe.
              </p>
            </div>
            
            <!-- Signature/Quote -->
            <div class="mt-12 pt-8 border-t border-border">
              <p class="font-serif italic text-xl text-foreground/80">
                "The best sleep of your life shouldn't be a dream."
              </p>
              <p class="mt-3 text-sm text-muted-foreground">— Our Founding Promise</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section - Icon Grid -->
    <section class="py-20 bg-warm-100">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div v-for="(benefit, index) in sleepBenefits" :key="index" class="text-center lg:text-left">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-background border border-border mb-6">
              <IconMoon v-if="benefit.icon === 'moon'" class="size-7 text-primary" />
              <IconHeart v-if="benefit.icon === 'heart'" class="size-7 text-primary" />
              <IconSun v-if="benefit.icon === 'sun'" class="size-7 text-primary" />
              <IconShield v-if="benefit.icon === 'shield'" class="size-7 text-primary" />
            </div>
            <h3 class="font-serif text-xl mb-2">{{ benefit.title }}</h3>
            <p class="text-muted-foreground text-sm font-light leading-relaxed">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Collection - Dramatic Product Grid -->
    <section id="collection" class="py-24 lg:py-32 bg-background">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <!-- Section Header -->
        <div class="max-w-3xl mb-16 lg:mb-24">
          <span class="text-primary text-xs tracking-[0.3em] uppercase font-medium">The Collection</span>
          <h2 class="mt-4 font-serif text-4xl lg:text-5xl">
            Masterpieces of Rest
          </h2>
          <p class="mt-6 text-muted-foreground text-lg font-light">
            Each piece in our collection represents the pinnacle of sleep engineering—
            where timeless design meets uncompromising comfort.
          </p>
        </div>

        <!-- Hero Product - Full Width -->
        <div v-if="heroProduct" class="mb-12">
          <NuxtLink :to="heroProduct.link?.path" class="group block relative">
            <div class="grid lg:grid-cols-5 gap-8 lg:gap-0">
              <!-- Image - Takes 3 columns -->
              <div class="lg:col-span-3 relative aspect-[4/3] lg:aspect-auto lg:h-[600px] overflow-hidden bg-warm-100">
                <NuxtImg
                  :src="heroProduct.variants?.[0]?.images?.[0]?.src"
                  :alt="heroProduct.name"
                  class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <!-- Bestseller Badge -->
                <div class="absolute top-6 left-6 bg-primary text-primary-foreground px-4 py-2 text-xs tracking-wider uppercase">
                  Bestseller
                </div>
              </div>
              
              <!-- Content - Takes 2 columns -->
              <div class="lg:col-span-2 lg:bg-warm-950 lg:text-white flex flex-col justify-center p-8 lg:p-12 xl:p-16">
                <span class="text-primary text-xs tracking-[0.2em] uppercase mb-4">Signature Collection</span>
                <h3 class="font-serif text-3xl lg:text-4xl xl:text-5xl mb-4 lg:text-white">{{ heroProduct.name }}</h3>
                <p class="lg:text-white/70 text-muted-foreground font-light mb-6 leading-relaxed">
                  The crown jewel of our collection. Handcrafted with premium European oak and 
                  upholstered in the finest organic cotton. A bed that becomes an heirloom.
                </p>
                <div class="flex items-baseline gap-4 mb-8">
                  <span class="text-3xl lg:text-4xl font-serif lg:text-white">{{ formatPrice(heroProduct.price) }}</span>
                  <span class="text-sm lg:text-white/50 text-muted-foreground">Free delivery & setup</span>
                </div>
                <div class="flex flex-wrap gap-4">
                  <span class="inline-flex items-center gap-3 bg-white text-warm-950 px-8 py-4 text-sm tracking-wider uppercase group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    View Details
                    <IconArrowRight class="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Product Grid - Asymmetric -->
        <div class="grid grid-cols-12 gap-4 lg:gap-6">
          <template v-for="(product, index) in showcaseProducts.slice(0, 6)" :key="product.key">
            <!-- Larger items for first two -->
            <div 
              :class="[
                index < 2 ? 'col-span-12 sm:col-span-6' : 'col-span-6 lg:col-span-4',
                index === 1 ? 'lg:mt-12' : ''
              ]"
            >
              <NuxtLink :to="product.link?.path" class="group block">
                <div class="relative overflow-hidden bg-warm-100 mb-5" :class="index < 2 ? 'aspect-[4/5]' : 'aspect-square'">
                  <NuxtImg
                    :src="product.variants?.[0]?.images?.[0]?.src"
                    :alt="product.name"
                    class="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <!-- Hover Overlay -->
                  <div class="absolute inset-0 bg-warm-950/0 group-hover:bg-warm-950/20 transition-colors duration-500" />
                  <!-- Quick View Button -->
                  <div class="absolute inset-x-6 bottom-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <span class="block w-full bg-white/95 backdrop-blur-sm py-3 text-center text-sm font-medium tracking-wider uppercase">
                      Quick View
                    </span>
                  </div>
                </div>
                <div>
                  <h3 class="font-serif text-xl group-hover:text-primary transition-colors">{{ product.name }}</h3>
                  <p class="mt-1 text-lg font-medium">{{ formatPrice(product.price) }}</p>
                </div>
              </NuxtLink>
            </div>
          </template>
        </div>

        <!-- View All CTA -->
        <div class="mt-16 text-center">
          <NuxtLink 
            to="/bedroom"
            class="inline-flex items-center gap-3 border-2 border-foreground text-foreground px-10 py-5 text-sm tracking-[0.15em] uppercase hover:bg-foreground hover:text-background transition-all duration-300"
          >
            View Complete Collection
            <IconArrowRight class="size-4" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Testimonials - Cinematic Carousel -->
    <section class="relative py-32 lg:py-40 bg-warm-950 overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 40px 40px;" />
      </div>
      
      <div class="relative mx-auto max-w-5xl px-6 lg:px-12 text-center">
        <span class="text-primary text-xs tracking-[0.3em] uppercase font-medium">Testimonials</span>
        <h2 class="mt-4 font-serif text-3xl lg:text-4xl text-white mb-16">Stories of Transformation</h2>
        
        <!-- Testimonial Cards -->
        <div class="relative h-[300px]">
          <TransitionGroup name="testimonial">
            <div 
              v-for="(testimonial, index) in testimonials"
              v-show="activeTestimonial === index"
              :key="index"
              class="absolute inset-0 flex flex-col items-center justify-center"
            >
              <!-- Stars -->
              <div class="flex gap-1 mb-8">
                <IconStar v-for="n in testimonial.rating" :key="n" class="size-5 fill-primary text-primary" />
              </div>
              
              <!-- Quote -->
              <blockquote class="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-light leading-relaxed italic max-w-3xl">
                "{{ testimonial.quote }}"
              </blockquote>
              
              <!-- Author -->
              <div class="mt-10">
                <p class="text-white font-medium">{{ testimonial.author }}</p>
                <p class="text-white/50 text-sm">{{ testimonial.location }}</p>
              </div>
            </div>
          </TransitionGroup>
        </div>
        
        <!-- Navigation Dots -->
        <div class="flex justify-center gap-3 mt-12">
          <button
            v-for="(_, index) in testimonials"
            :key="index"
            @click="activeTestimonial = index"
            class="w-2 h-2 rounded-full transition-all duration-300"
            :class="activeTestimonial === index ? 'bg-primary w-8' : 'bg-white/30 hover:bg-white/50'"
          />
        </div>
      </div>
    </section>

    <!-- Craftsmanship Section -->
    <section class="py-24 lg:py-32 bg-background">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span class="text-primary text-xs tracking-[0.3em] uppercase font-medium">Craftsmanship</span>
            <h2 class="mt-4 font-serif text-4xl lg:text-5xl">
              Made by Hands<br>That Care
            </h2>
            <p class="mt-6 text-muted-foreground text-lg font-light leading-relaxed">
              Every bed begins its journey in our atelier, where master craftsmen with decades of 
              experience shape raw materials into works of art. No shortcuts. No compromises.
            </p>
            
            <div class="mt-12 grid grid-cols-2 gap-8">
              <div>
                <p class="text-4xl font-serif text-primary">47</p>
                <p class="text-sm text-muted-foreground mt-1">Hours of handcraft per bed</p>
              </div>
              <div>
                <p class="text-4xl font-serif text-primary">3rd</p>
                <p class="text-sm text-muted-foreground mt-1">Generation craftsmen</p>
              </div>
              <div>
                <p class="text-4xl font-serif text-primary">100%</p>
                <p class="text-sm text-muted-foreground mt-1">Sustainable materials</p>
              </div>
              <div>
                <p class="text-4xl font-serif text-primary">0</p>
                <p class="text-sm text-muted-foreground mt-1">Compromises on quality</p>
              </div>
            </div>
          </div>
          
          <!-- Image Grid -->
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-4">
              <div class="aspect-[3/4] bg-warm-100 overflow-hidden">
                <NuxtImg
                  src="https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Modern_Upholstered_Bed-1.1.jpeg"
                  alt="Craftsmanship detail"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="aspect-square bg-warm-100 overflow-hidden">
                <NuxtImg
                  src="https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Twin_Upholstered_Bed-1.1.jpeg"
                  alt="Material detail"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
            <div class="space-y-4 pt-8">
              <div class="aspect-square bg-warm-100 overflow-hidden">
                <NuxtImg
                  src="https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Queen_Upholstered_Bed-1.1.jpeg"
                  alt="Workshop"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="aspect-[3/4] bg-warm-100 overflow-hidden">
                <NuxtImg
                  src="https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Opal_Queen_Bed-1.1.jpeg"
                  alt="Finished product"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sleep Consultation CTA -->
    <section class="relative py-24 lg:py-32 overflow-hidden">
      <div class="absolute inset-0">
        <NuxtImg
          src="https://storage.googleapis.com/merchant-center-europe/sample-data/b2c-lifestyle/Minimalist_Modern_Bedroom-1.1.jpeg"
          alt="Bedroom"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-warm-950/80" />
      </div>
      
      <div class="relative mx-auto max-w-4xl px-6 lg:px-12 text-center text-white">
        <span class="text-primary text-xs tracking-[0.3em] uppercase font-medium">Personalized Service</span>
        <h2 class="mt-4 font-serif text-4xl lg:text-5xl xl:text-6xl">
          Not Sure Where to Start?
        </h2>
        <p class="mt-6 text-white/70 text-lg lg:text-xl font-light max-w-2xl mx-auto">
          Book a complimentary sleep consultation with our experts. We'll help you find 
          the perfect bed for your sleep style, preferences, and space.
        </p>
        <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#consultation"
            class="inline-flex items-center gap-3 bg-white text-warm-950 px-10 py-5 text-sm tracking-[0.15em] uppercase hover:bg-primary hover:text-white transition-all duration-300"
          >
            Book Free Consultation
          </a>
          <a 
            href="tel:+4912345678"
            class="inline-flex items-center gap-3 text-white/70 hover:text-white text-sm tracking-[0.15em] uppercase transition-colors"
          >
            <IconPhone class="size-4" />
            Or Call Us
          </a>
        </div>
      </div>
    </section>

    <!-- Final Trust Section -->
    <section class="py-16 bg-warm-100">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div class="flex flex-col items-center">
            <IconTruck class="size-8 text-primary mb-4" />
            <h3 class="font-medium mb-1">White Glove Delivery</h3>
            <p class="text-sm text-muted-foreground">Free setup in your bedroom</p>
          </div>
          <div class="flex flex-col items-center">
            <IconRefreshCw class="size-8 text-primary mb-4" />
            <h3 class="font-medium mb-1">100-Night Trial</h3>
            <p class="text-sm text-muted-foreground">Risk-free sleep guarantee</p>
          </div>
          <div class="flex flex-col items-center">
            <IconShield class="size-8 text-primary mb-4" />
            <h3 class="font-medium mb-1">10-Year Warranty</h3>
            <p class="text-sm text-muted-foreground">Comprehensive coverage</p>
          </div>
          <div class="flex flex-col items-center">
            <IconLeaf class="size-8 text-primary mb-4" />
            <h3 class="font-medium mb-1">Sustainable Materials</h3>
            <p class="text-sm text-muted-foreground">Eco-conscious crafting</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes scrollDown {
  0%, 100% {
    transform: translateY(-100%);
  }
  50% {
    transform: translateY(400%);
  }
}

.testimonial-enter-active,
.testimonial-leave-active {
  transition: all 0.8s ease;
}

.testimonial-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.testimonial-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
