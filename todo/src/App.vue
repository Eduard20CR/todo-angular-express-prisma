<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/global/HeaderGlobal.vue'
import Footer from './components/global/FooterGlobal.vue'
</script>

<template>
   <Header />
   <main class="min-h-[80vh] mt-10">
      <RouterView />
   </main>
   <Footer />
</template>
