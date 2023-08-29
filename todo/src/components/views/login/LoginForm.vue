<script setup lang="ts">
const handleForm = () => {}
</script>

<template>
  <form class="grid gap-5" @submit.prevent="handleForm">
    <div class="grid gap-2">
      <label for="email">Email</label>
      <input
        id="email"
        class="bg-transparent border-b-2 border-primary"
        type="email"
        name="email"
        required
      />
    </div>
    <div class="grid gap-2">
      <label for="password">Password</label>
      <input
        id="password"
        class="bg-transparent border-b-2 border-primary"
        type="password"
        name="password"
        minlength="6"
        required
      />
    </div>
    <div class="grid gap-2">
      <label for="password-confirm">Confirm Password</label>
      <input
        id="password-confirm"
        class="bg-transparent border-b-2 border-primary"
        type="password"
        name="password-confirm"
        minlength="6"
        required
      />
    </div>
    <div>
      <button class="rounded px-4 py-2 border border-primary" type="submit">Enter</button>
    </div>
  </form>
</template>
