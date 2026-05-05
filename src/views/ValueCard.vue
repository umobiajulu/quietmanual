<template>
  <div
    class="group relative bg-white border border-[#e8e4df] rounded-2xl p-8 space-y-5 cursor-default
           hover:border-[#403110]/30 hover:shadow-[0_8px_32px_rgba(64,49,16,0.08)]
           transition-all duration-300"
  >
    <!-- Top accent line on hover -->
    <div class="absolute top-0 left-8 right-8 h-0.5 bg-[#c76e02] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

    <!-- Icon -->
    <div class="w-12 h-12 rounded-xl bg-[#403110]/6 flex items-center justify-center group-hover:bg-[#403110]/10 transition-colors duration-300">
      <!-- Clarity icon -->
      <svg v-if="icon === 'clarity'" class="w-6 h-6 text-[#403110]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
      </svg>
      <!-- Investing icon -->
      <svg v-else-if="icon === 'investing'" class="w-6 h-6 text-[#403110]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
      </svg>
      <!-- Wealth icon -->
      <svg v-else class="w-6 h-6 text-[#403110]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
      </svg>
    </div>

    <div class="space-y-2">
      <h3 class="font-serif text-lg font-semibold text-[#403110] group-hover:text-[#403110] transition-colors">
        {{ title }}
      </h3>
      <p class="text-sm text-[#6b6560] leading-relaxed font-light">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
})
</script>