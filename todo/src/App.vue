<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/global/Header.vue'
import Footer from './components/global/Footer.vue'
</script>

<template>
  <Header />
  <main class="min-h-[80vh] mt-10">
    <RouterView />
  </main>
  <Footer />
</template>
