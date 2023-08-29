<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import Container from './../shared/Container.vue'

const router = useRouter()
const route = useRoute()

router.afterEach((to, from) => {})
</script>

<template>
  <header class="border-b-2 border-primary py-1 px-10 uppercase">
    <Container>
      <nav class="flex gap-3 justify-center">
        <RouterLink class="min-w-[5rem] text-center px-2 py-3" to="/">Home</RouterLink>
        <RouterLink class="min-w-[5rem] text-center px-2 py-3" to="/login">Login</RouterLink>
        <RouterLink class="min-w-[5rem] text-center px-2 py-3" to="/sign-up">Sign Up</RouterLink>
      </nav>
    </Container>
  </header>
</template>

<style scoped>
.router-link-active {
  @apply font-bold underline;
}
</style>
