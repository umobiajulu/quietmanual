<template>
  <!-- Backdrop -->
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[200] flex items-center justify-center p-4"
        @click.self="$emit('update:modelValue', false)"
      >
        <!-- Scrim -->
        <div class="absolute inset-0 bg-[#1a1a1a]/60 backdrop-blur-sm"></div>

        <!-- Modal panel -->
        <div class="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.22)] overflow-hidden">

          <!-- Top accent bar -->
          <div class="h-1 w-full" :class="highlighted ? 'bg-[#c76e02]' : 'bg-[#403110]'"></div>

          <!-- Header -->
          <div class="flex items-start justify-between p-6 pb-4">
            <div class="space-y-1 pr-8">
              <p class="text-[10px] font-bold tracking-widest uppercase text-[#a09070]">Get Instant ReadOnly Access</p>
              <h2 class="font-serif text-xl font-bold text-[#403110] leading-snug">{{ title }}</h2>
              <p class="text-sm text-[#6b6560] font-light">{{ price }} · One-time payment</p>
            </div>
            <button
              @click="$emit('update:modelValue', false)"
              class="flex-shrink-0 w-8 h-8 rounded-full bg-[#f5f3ef] flex items-center justify-center hover:bg-[#e8e4df] transition-colors"
            >
              <svg class="w-4 h-4 text-[#6b6560]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Divider -->
          <div class="mx-6 h-px bg-[#e8e4df]"></div>

          <!-- Region choice -->
          <div class="p-6 space-y-4">
            <!-- <p class="text-xs font-semibold text-[#6b6560] tracking-wide uppercase">Choose your region to buy</p> -->

            <!-- Selar — West Africa -->
            <a
              :href="selarLink"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center gap-4 w-full bg-[#403110] text-white rounded-xl px-5 py-4 hover:bg-[#4f3d14] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#403110]/30 transition-all duration-150"
            >
              <div class="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <!-- Map pin icon -->
                <svg class="w-5 h-5 text-[#c76e02]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div class="flex-1 text-left">
                <p class="font-semibold text-sm leading-none mb-1">Buy on Selar</p>
                <p class="text-white/60 text-xs">West Africa · Pay in Naira, Cedis &amp; more</p>
              </div>
              <svg class="w-4 h-4 text-white/40 group-hover:text-white/80 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>

            <!-- Gumroad — Rest of World -->
            <!-- <a
              :href="gumroadLink"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center gap-4 w-full bg-white border-2 border-[#e8e4df] text-[#403110] rounded-xl px-5 py-4 hover:border-[#403110]/40 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#403110]/8 transition-all duration-150"
            >
              <div class="w-10 h-10 rounded-lg bg-[#403110]/6 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-[#403110]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="flex-1 text-left">
                <p class="font-semibold text-sm leading-none mb-1">Buy on Gumroad</p>
                <p class="text-[#a09070] text-xs">Rest of the world · Pay with card or PayPal</p>
              </div>
              <svg class="w-4 h-4 text-[#a09070] group-hover:text-[#403110] group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a> -->
          </div>

          <!-- Footer note -->
          <div class="px-6 pb-6">
            <p class="text-center text-xs text-[#a09070]">
              Secure checkout · Instant delivery · No subscription
            </p>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  modelValue:  { type: Boolean, required: true },
  title:       { type: String,  required: true },
  price:       { type: String,  required: true },
  selarLink:   { type: String,  required: true },
  gumroadLink: { type: String,  required: true },
  highlighted: { type: Boolean, default: false },
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .relative {
  transform: scale(0.93) translateY(12px);
  opacity: 0;
}
.modal-leave-to .relative {
  transform: scale(0.96) translateY(8px);
  opacity: 0;
}
</style>