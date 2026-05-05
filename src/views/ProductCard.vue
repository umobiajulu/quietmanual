<template>
  <div
    class="relative flex flex-col bg-white rounded-2xl border transition-all duration-300 overflow-hidden group"
    :class="[
      highlighted
        ? 'border-[#c76e02]/50 shadow-[0_8px_40px_rgba(199,110,2,0.12)] hover:shadow-[0_20px_60px_rgba(199,110,2,0.20)]'
        : 'border-[#e8e4df] shadow-sm hover:shadow-[0_12px_40px_rgba(64,49,16,0.10)] hover:border-[#403110]/25'
    ]"
  >

    <!-- Ribbon badge -->
    <div
      v-if="ribbon"
      class="absolute top-4 right-0 z-20 text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-l-full shadow-md"
      :class="ribbon === 'FREE'
        ? 'bg-[#403110] text-white'
        : ribbon === 'MOST POPULAR'
          ? 'bg-[#c76e02] text-white'
          : 'bg-[#1a1a1a] text-[#c76e02]'"
    >
      {{ ribbon }}
    </div>

    <!-- ── BOOK IMAGE SECTION ── -->
    <div
      class="relative w-full overflow-hidden flex items-end justify-center pb-0"
      :class="highlighted ? 'bg-gradient-to-b from-[#fdf3e7] to-[#fcecd6]' : 'bg-gradient-to-b from-[#f5f3ef] to-[#ede9e2]'"
      style="min-height: 220px;"
    >
      <!-- Subtle radial glow behind book -->
      <div
        class="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24 rounded-full blur-2xl opacity-40"
        :class="highlighted ? 'bg-[#c76e02]/30' : 'bg-[#403110]/15'"
      ></div>

      <!-- Book image with hover float effect -->
      <img
        :src="image"
        :alt="title + ' book cover'"
        class="relative z-10 w-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.22)] transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:drop-shadow-[0_24px_40px_rgba(0,0,0,0.30)]"
        style="width: 100%;"
      />
    </div>

    <!-- ── CARD BODY ── -->
    <div class="flex flex-col flex-1 p-6 space-y-5">

      <!-- Tag + Title + Description -->
      <div class="space-y-2">
        <span
          class="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
          :class="tagColor === 'secondary'
            ? 'bg-[#c76e02]/10 text-[#c76e02]'
            : 'bg-[#403110]/8 text-[#403110]'"
        >
          {{ tag }}
        </span>
        <h3 class="font-serif text-lg font-bold text-[#403110] leading-snug">
          {{ title }}
        </h3>
        <p class="text-sm text-[#6b6560] leading-relaxed font-light">
          {{ description }}
        </p>
      </div>

      <!-- Features -->
      <ul class="space-y-2">
        <li
          v-for="feature in features"
          :key="feature"
          class="flex items-start gap-2 text-sm text-[#6b6560]"
        >
          <svg
            class="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
            :class="highlighted ? 'text-[#c76e02]' : 'text-[#403110]'"
            fill="currentColor" viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          {{ feature }}
        </li>
      </ul>

      <!-- Spacer -->
      <div class="flex-1"></div>

      <!-- Pricing + CTA -->
      <div class="pt-4 border-t border-[#e8e4df] space-y-3">
        <div class="flex items-baseline justify-between">
          <span class="font-serif text-2xl font-bold text-[#403110]">
            {{ price ?? 'Free' }}
          </span>
          <p class="text-xs text-[#a09070] text-right leading-tight max-w-[120px]">{{ priceNote }}</p>
        </div>

        <button
          class="w-full py-3 rounded-md text-sm font-semibold tracking-wide transition-all duration-150 active:scale-95"
          :class="buttonStyle === 'filled'
            ? 'bg-[#c76e02] text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#c76e02]/30'
            : 'border-2 border-[#403110] text-[#403110] hover:bg-[#403110] hover:text-white hover:-translate-y-0.5 hover:shadow-md'"
        >
          {{ buttonText }}
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
defineProps({
  title:       { type: String,  required: true },
  tag:         { type: String,  required: true },
  tagColor:    { type: String,  default: 'primary' },
  description: { type: String,  required: true },
  features:    { type: Array,   default: () => [] },
  price:       { type: String,  default: null },
  priceNote:   { type: String,  default: '' },
  buttonText:  { type: String,  required: true },
  buttonStyle: { type: String,  default: 'outline' },
  highlighted: { type: Boolean, default: false },
  ribbon:      { type: String,  default: null },
  image:       { type: String,  required: true },
})
</script>