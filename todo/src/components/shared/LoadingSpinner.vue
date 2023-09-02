<template>
   <span class="loader border-white border-b-primary"></span>
</template>

<style scoped>
.loader {
   width: 48px;
   height: 48px;
   border-radius: 50%;
   border-width: 5px;
   border-style: solid;
   display: inline-block;
   box-sizing: border-box;
   animation: rotation 1s linear infinite;
}

@keyframes rotation {
   0% {
      transform: rotate(0deg);
   }
   100% {
      transform: rotate(360deg);
   }
}
</style>
