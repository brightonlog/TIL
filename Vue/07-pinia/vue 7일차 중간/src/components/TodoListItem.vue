<template>

  <div>
    <span>
      {{ todo.text }}
    </span>
  </div>

</template>

<script setup>

  import { useCounterStore } from '@/stores/counter';

  const store = useCounterStore()

  defineProps({
    todo: Object
  })

</script>


<style scoped>

</style>
