<script setup lang="ts"></script>

<template>
  <div class="relative mt-16 flex gap-5">
    <div class="flex-grow relative">
      <div class="square h-16 w-16 bg-primary absolute rounded"></div>
    </div>
    <div class="min-w-[25px] relative">
      <div class="star absolute text-white">
        <!-- prettier-ignore -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
      </div>
      <div class="w-1 h-16 right-5 bg-primary">
        <div
          class="border-t-[20px] border-t-transparent border-l-[25px] border-l-primary border-b-[20px] border-b-transparent"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.square {
  animation-name: GoalMobile;
  animation-duration: 3s;
  animation-fill-mode: both;
}
.star {
  animation-name: StartMobile;
  animation-duration: 0.7s;
  animation-fill-mode: both;
  animation-delay: 2.5s;
  left: -40%;
}
@media (min-width: 700px) {
  .square {
    animation-name: GoalWeb;
    animation-duration: 3s;
    animation-fill-mode: both;
  }
  .star {
    animation-name: StartWeb;
    animation-duration: 0.7s;
    animation-fill-mode: both;
    animation-delay: 2.5s;
  }
}

@keyframes GoalMobile {
  0% {
    left: 0;
    transform: translate(0);
  }
  100% {
    left: 100%;
    transform: translate(-100%);
  }
}
@keyframes GoalWeb {
  0% {
    left: 0;
    transform: translate(0);
  }
  100% {
    left: 100%;
    transform: translate(-100%);
  }
}
@keyframes StartMobile {
  0% {
    opacity: 0;
    transform: scale(0) translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(-30px);
  }
}
@keyframes StartWeb {
  0% {
    opacity: 0;
    transform: scale(0) translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(-30px);
  }
}
</style>
