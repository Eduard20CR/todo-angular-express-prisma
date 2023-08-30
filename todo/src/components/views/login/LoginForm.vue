<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const schema = toTypedSchema(
   z.object({
      email: z.string().nonempty().email(),
      password: z.string().nonempty().min(6)
   })
)
const { handleSubmit, errors } = useForm({
   validationSchema: schema
})

const { value: email } = useField('email')
const { value: password } = useField('password')

const onSubmit = handleSubmit((values) => {
   console.log(values)
})
</script>

<template>
   <form class="grid gap-3" @submit="onSubmit">
      <div class="grid">
         <label for="email">Email</label>
         <input
            class="bg-transparent border-b-2 border-primary"
            name="email"
            v-model="email"
            type="email"
         />
         <span>{{ errors.email }}</span>
      </div>
      <div class="grid">
         <label for="password">Password</label>
         <input
            class="bg-transparent border-b-2 border-primary"
            name="password"
            v-model="password"
            type="password"
         />
         <span>{{ errors.password }}</span>
      </div>

      <div class="mt-5">
         <button class="rounded px-4 py-2 border border-primary" type="submit">Enter</button>
      </div>
   </form>
</template>
