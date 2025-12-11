<template>
  <header>
    <nav>
      <RouterLink :to="{ name: 'ArticleView' }">Articles</RouterLink> | 
      <RouterLink :to="{ name: 'SignUpView'}">SignUpView</RouterLink>

    </nav>
  </header>
  <RouterView />
</template>

<script setup>
  import { RouterView, RouterLink } from 'vue-router'

</script>

<style scoped>
</style>
