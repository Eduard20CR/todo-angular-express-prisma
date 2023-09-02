<script setup lang="ts">
import Container from '@/components/shared/ContainerShared.vue'
import HeaderTodos from '@/components/views/todos/HeaderTodos.vue'
import ListGroups from '@/components/views/todos/ListGroups.vue'
import { RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'

const res = ref(null)
let finish = ref(false)
onMounted(async () => {
   try {
      const test = await axios.get('https://jsonplaceholder.typicode.com/todos')
      res.value = test.data
   } catch (error) {
      console.log(error)
   } finally {
      finish.value = true
   }
})
</script>

<template>
   <Container :size="'5xl'">
      <HeaderTodos />
      <div class="grid grid-cols-2">
         <div>
            <ListGroups v-if="finish" />
            <LoadingSpinner v-else />
         </div>
         <div>
            <RouterView />
         </div>
      </div>
   </Container>
</template>
