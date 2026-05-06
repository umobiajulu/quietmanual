<template>
  <div class="font-sans bg-[#faf9f7] text-[#1a1a1a] overflow-x-hidden">

    <!-- NAVBAR -->
    <nav
      class="fixed top-0 left-0 right-0 z-50 border-b border-[#e8e4df] transition-shadow duration-300"
      :class="scrolled ? 'shadow-sm bg-[#faf9f7]/95 backdrop-blur-md' : 'bg-[#faf9f7]/80 backdrop-blur-sm'"
    >
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" class="font-serif text-xl font-bold text-[#403110] tracking-tight">
          Quiet<span class="text-[#c76e02]">Manual</span>
        </a>
        <ul class="hidden md:flex items-center gap-8 list-none">
          <li><a href="#products" class="text-sm font-medium text-[#6b6560] hover:text-[#403110] transition-colors">Products</a></li>
          <li><a href="#how-it-works" class="text-sm font-medium text-[#6b6560] hover:text-[#403110] transition-colors">How It Works</a></li>
          <li><a href="#about" class="text-sm font-medium text-[#6b6560] hover:text-[#403110] transition-colors">About</a></li>
        </ul>
        <a
          href="#products"
          class="text-sm font-semibold text-white bg-[#403110] px-5 py-2 rounded-md hover:-translate-y-0.5 hover:shadow-lg transition-all duration-150"
        >
          Get Free Guide
        </a>
      </div>
    </nav>

    <!-- HERO -->
    <section class="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <!-- Geometric background shapes -->
      <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div class="absolute top-20 right-[-80px] w-[480px] h-[480px] rounded-full border border-[#403110]/5"></div>
        <div class="absolute top-32 right-[-40px] w-[360px] h-[360px] rounded-full border border-[#403110]/5"></div>
        <div class="absolute bottom-20 left-[-60px] w-[320px] h-[320px] rounded-full border border-[#c76e02]/6"></div>
        <div class="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-[#c76e02]/20"></div>
        <div class="absolute top-1/2 right-1/3 w-1.5 h-1.5 rounded-full bg-[#403110]/15"></div>
        <div class="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-[#c76e02]/30"></div>
        <!-- Subtle grid lines -->
        <div class="absolute inset-0 opacity-[0.03]"
          style="background-image: linear-gradient(#403110 1px, transparent 1px), linear-gradient(90deg, #403110 1px, transparent 1px); background-size: 80px 80px;">
        </div>
      </div>

      <div class="relative max-w-6xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-16 items-center">
        <div class="space-y-8">
          <div class="inline-flex items-center gap-2 bg-[#403110]/6 text-[#403110] text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full">
            <span class="w-1.5 h-1.5 rounded-full bg-[#c76e02] inline-block"></span>
            Financial Education Guides
          </div>
          <h1 class="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#403110] leading-[1.1] tracking-tight">
            Build Financial Clarity After Graduation &amp;
            <em class="not-italic text-[#c76e02]">Learn Structured Investing</em>
          </h1>
          <p class="text-lg text-[#6b6560] leading-relaxed max-w-lg font-light">
            Simple, practical guides that help you move from confusion to financial direction and long-term investing discipline.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a
              href="#products"
              class="inline-flex items-center justify-center gap-2 bg-[#403110] text-white text-sm font-semibold px-7 py-3.5 rounded-md hover:-translate-y-0.5 hover:shadow-xl transition-all duration-150"
            >
              Get Free Guide
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
            <a
              href="#products"
              class="inline-flex items-center justify-center gap-2 border border-[#403110]/25 text-[#403110] text-sm font-semibold px-7 py-3.5 rounded-md hover:border-[#403110]/50 hover:bg-[#403110]/4 transition-all duration-150"
            >
              Explore Investing System
            </a>
          </div>
          <div class="flex items-center gap-6 pt-2">
            <div class="flex -space-x-2">
              <div v-for="i in 4" :key="i" class="w-8 h-8 rounded-full bg-gradient-to-br from-[#c76e02]/30 to-[#403110]/30 border-2 border-white"></div>
            </div>
            <p class="text-sm text-[#6b6560]">
              <span class="font-semibold text-[#403110]">500+</span> readers building clarity
            </p>
          </div>
        </div>

        <!-- Hero visual card -->
        <div class="hidden md:flex justify-center items-center">
          <div class="relative w-full max-w-sm">
            <div class="absolute -top-4 -left-4 w-full h-full rounded-2xl border border-[#c76e02]/20"></div>
            <div class="relative bg-white rounded-2xl p-8 shadow-[0_8px_40px_rgba(64,49,16,0.10)] border border-[#e8e4df]">
              <div class="space-y-5">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-[#403110]/8 flex items-center justify-center">
                    <svg class="w-5 h-5 text-[#403110]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                  </div>
                  <div>
                    <p class="font-serif font-semibold text-[#403110] text-sm">After Graduation</p>
                    <p class="text-xs text-[#c76e02] font-semibold">Free Guide</p>
                  </div>
                </div>
                <div class="space-y-2">
                  <div v-for="item in heroChecklist" :key="item" class="flex items-center gap-2.5 text-sm text-[#6b6560]">
                    <svg class="w-4 h-4 text-[#c76e02] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                    {{ item }}
                  </div>
                </div>
                <div class="pt-2 border-t border-[#e8e4df]">
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-[#6b6560]">PDF Guide · Instant Download</span>
                    <span class="text-xs font-bold text-[#c76e02] bg-[#c76e02]/8 px-2 py-1 rounded">FREE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- VALUE PROPOSITION -->
    <section class="py-20 bg-white border-t border-[#e8e4df]">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-14 space-y-3">
          <p class="text-xs font-semibold tracking-widest uppercase text-[#c76e02]">Why QuietManual</p>
          <h2 class="font-serif text-3xl md:text-4xl font-bold text-[#403110]">Three things you actually need</h2>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          <ValueCard
            v-for="card in valueCards"
            :key="card.title"
            :icon="card.icon"
            :title="card.title"
            :description="card.description"
          />
        </div>
      </div>
    </section>

    <!-- PRODUCTS -->
    <section id="products" class="py-24 bg-[#faf9f7]">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-16 space-y-3">
          <p class="text-xs font-semibold tracking-widest uppercase text-[#c76e02]">The Guides</p>
          <h2 class="font-serif text-3xl md:text-4xl font-bold text-[#403110]">Start where you are</h2>
          <p class="text-[#6b6560] max-w-lg mx-auto font-light">Three focused guides. One clear path. Begin free, then go deeper.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          <ProductCard
            v-for="product in products"
            :key="product.title"
            v-bind="product"
            @buy="openModal(product)"
          />
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section id="how-it-works" class="py-24 bg-white border-t border-[#e8e4df]">
      <div class="max-w-4xl mx-auto px-6">
        <div class="text-center mb-16 space-y-3">
          <p class="text-xs font-semibold tracking-widest uppercase text-[#c76e02]">The Process</p>
          <h2 class="font-serif text-3xl md:text-4xl font-bold text-[#403110]">Three steps, no noise</h2>
        </div>
        <div class="relative">
          <!-- Connecting line -->
          <div class="hidden md:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gradient-to-r from-[#403110]/10 via-[#c76e02]/30 to-[#403110]/10"></div>
          <div class="grid md:grid-cols-3 gap-10 md:gap-6">
            <div
              v-for="(step, index) in steps"
              :key="step.title"
              class="flex flex-col items-center text-center space-y-4"
            >
              <div class="relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-md border"
                :class="index === 2 ? 'bg-[#403110] border-[#403110] text-white' : index === 0 ? 'bg-white border-[#e8e4df] text-[#403110]' : 'bg-[#c76e02] border-[#c76e02] text-white'"
              >
                <span class="font-serif text-2xl font-bold">{{ index + 1 }}</span>
              </div>
              <div class="space-y-2">
                <h3 class="font-serif text-lg font-semibold text-[#403110]">{{ step.title }}</h3>
                <p class="text-sm text-[#6b6560] leading-relaxed font-light">{{ step.description }}</p>
              </div>
              <span v-if="step.badge" class="text-xs font-semibold px-3 py-1 rounded-full"
                :class="step.badge === 'Free' ? 'bg-[#403110]/8 text-[#403110]' : 'bg-[#c76e02]/10 text-[#c76e02]'"
              >
                {{ step.badge }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TRUST / POSITIONING -->
    <section id="about" class="py-24 bg-[#403110]">
      <div class="max-w-3xl mx-auto px-6 text-center space-y-10">
        <div class="space-y-2">
          <div class="w-12 h-px bg-[#c76e02] mx-auto"></div>
        </div>
        <blockquote class="font-serif text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-[1.3] tracking-tight">
          "This is not financial hype. It is structured financial education designed for long-term thinking."
        </blockquote>
        <div class="space-y-4">
          <p class="text-[#c5b89a] font-light text-lg leading-relaxed">
            Focus: clarity, discipline, and decision-making.
          </p>
          <p class="text-[#a09070] text-sm leading-relaxed max-w-xl mx-auto font-light">
            QuietManual does not promise shortcuts, overnight wealth, or market predictions. We offer structured thinking frameworks so you can make informed, calm financial decisions.
          </p>
        </div>
        <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <a
            href="#products"
            class="inline-flex items-center justify-center gap-2 bg-[#c76e02] text-white text-sm font-semibold px-7 py-3.5 rounded-md hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#c76e02]/20 transition-all duration-150"
          >
            Start with the Free Guide
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="bg-[#faf9f7] border-t border-[#e8e4df] py-12">
      <div class="max-w-6xl mx-auto px-6">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="space-y-1 text-center md:text-left">
            <a href="#" class="font-serif text-lg font-bold text-[#403110]">
              Quiet<span class="text-[#c76e02]">Manual</span>
            </a>
            <p class="text-xs text-[#6b6560] font-light">Structured financial education. No hype.</p>
          </div>
          <nav class="flex gap-8">
            <a href="#" class="text-sm text-[#6b6560] hover:text-[#403110] transition-colors">Home</a>
            <a href="#products" class="text-sm text-[#6b6560] hover:text-[#403110] transition-colors">Products</a>
            <a href="mailto:hello@quietmanual.com" class="text-sm text-[#6b6560] hover:text-[#403110] transition-colors">Contact</a>
          </nav>
          <p class="text-xs text-[#a09070]">© {{ currentYear }} QuietManual. All rights reserved.</p>
        </div>
      </div>
    </footer>

    <!-- PURCHASE MODAL -->
    <PurchaseModal
      v-if="modalProduct"
      v-model="modalOpen"
      :title="modalProduct.title"
      :price="modalProduct.price"
      :selar-link="modalProduct.selarLink"
      :gumroad-link="modalProduct.gumroadLink"
      :highlighted="modalProduct.highlighted"
    />

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ValueCard from './ValueCard.vue'
import ProductCard from './ProductCard.vue'
import PurchaseModal from './PurchaseModal.vue'

// ── Scroll-aware navbar ──────────────────────────────────────────────
const scrolled = ref(false)
const handleScroll = () => { scrolled.value = window.scrollY > 20 }
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

// ── Purchase modal ───────────────────────────────────────────────────
const modalOpen = ref(false)
const modalProduct = ref(null)

function openModal(product) {
  if (!product.selarLink && !product.gumroadLink) return
  modalProduct.value = product
  modalOpen.value = true
}

// ── Static data ──────────────────────────────────────────────────────
const currentYear = new Date().getFullYear()

const heroChecklist = [
  'Build a clear financial foundation',
  'Avoid common post-grad mistakes',
  'Start thinking long-term early',
]

const valueCards = [
  {
    icon: 'clarity',
    title: 'Clarity After Graduation',
    description: 'Navigate the financial decisions that hit right after school — income, expenses, direction — with a structured framework, not guesswork.',
  },
  {
    icon: 'investing',
    title: 'Beginner Investing Knowledge',
    description: 'Understand how markets work, why most beginners lose money, and how to build a thinking system before you invest a single naira.',
  },
  {
    icon: 'wealth',
    title: 'Structured Wealth Thinking',
    description: 'Develop the mental models and disciplined habits that separate long-term wealth builders from those chasing trends.',
  },
]

const products = [
  {
    title: 'After Graduation',
    tag: 'Free Guide',
    tagColor: 'primary',
    description: 'A structured guide to help you understand what to do after graduation, avoid financial confusion, and build a clear personal money direction.',
    features: [
      'Financial foundations post-school',
      'Avoiding common costly mistakes',
      'Building a personal money direction',
    ],
    price: null,
    priceNote: 'Completely Free',
    buttonText: 'Download Free',
    buttonStyle: 'outline',
    highlighted: false,
    ribbon: 'FREE',
    image: '/qm1.png',
    freeLink: 'https://your-free-guide-link.com', // ← replace with actual download link
    selarLink: null,
    gumroadLink: null,
  },
  {
    title: 'Introduction to Investing',
    tag: 'Beginner Guide',
    tagColor: 'secondary',
    description: 'A calm, structured introduction to safe, long-term investing — built for people who want to grow wealth without gambling it away.',
    features: [
      'Safe investing principles & mindset',
      'The basics of compounding explained',
      'Bonds, T-Bills & how they work',
      'Index funds & passive investing',
    ],
    price: '$9.99',
    priceNote: 'One-time payment · Instant PDF',
    buttonText: 'Get Instant Access',
    buttonStyle: 'filled',
    highlighted: true,
    ribbon: 'MOST POPULAR',
    image: '/qm2.png',
    freeLink: null,
    selarLink: 'https://selar.co/your-intro-investing-link',       // ← replace
    gumroadLink: 'https://your-store.gumroad.com/l/intro-investing', // ← replace
  },
  {
    title: 'Mastering the Stock Market',
    tag: 'Premium Guide',
    tagColor: 'primary',
    description: 'The advanced guide for those ready to go deeper into stocks — covering how to read companies, build a portfolio, and invest with discipline.',
    features: [
      'How to research & evaluate stocks',
      'Reading financials with confidence',
      'Portfolio construction & risk control',
      'Long-term stock investing system',
    ],
    price: '$199.99',
    priceNote: 'One-time payment · Instant PDF',
    buttonText: 'Get Instant Access',
    buttonStyle: 'outline',
    highlighted: false,
    ribbon: 'PREMIUM',
    image: '/qm3.png',
    freeLink: null,
    selarLink: 'https://selar.co/your-mastering-stocks-link',          // ← replace
    gumroadLink: 'https://your-store.gumroad.com/l/mastering-stocks',  // ← replace
  },
]

const steps = [
  {
    title: 'Start With Clarity',
    description: 'Download the free After Graduation guide and build your financial foundation before anything else.',
    badge: 'Free',
  },
  {
    title: 'Learn Investing Basics',
    description: 'Understand how markets work, common pitfalls, and how to think like a long-term investor.',
    badge: 'Paid Guide',
  },
  {
    title: 'Apply a Structured System',
    description: 'Use the investing guide as your reference system — a calm, disciplined approach to growing wealth.',
    badge: 'Paid Guide',
  },
]
</script>