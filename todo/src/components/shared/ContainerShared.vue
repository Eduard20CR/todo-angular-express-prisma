<script setup lang="ts">
defineProps({
   size: {
      type: String,
      default: 'xl',
      validator: (value: string) =>
         ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'].includes(value)
   }
})
</script>

<template>
   <div class="flex justify-center">
      <div
         class="w-full px-5"
         :class="{
            'max-w-sm': size == 'sm',
            'max-w-md': size == 'md',
            'max-w-lg': size == 'lg',
            'max-w-xl': size == 'xl',
            'max-w-2xl': size == '2xl',
            'max-w-3xl': size == '3xl',
            'max-w-4xl': size == '4xl',
            'max-w-5xl': size == '5xl',
            'max-w-6xl': size == '6xl',
            'max-w-7xl': size == '7xl'
         }"
      >
         <slot />
      </div>
   </div>
</template>
