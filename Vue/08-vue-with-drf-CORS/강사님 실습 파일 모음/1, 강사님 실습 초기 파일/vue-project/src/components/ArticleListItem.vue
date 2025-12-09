<template>
  <div>
  </div>
</template>
<h5>{{ article.id }}</h5>
<a> {{ article.title }}</a>
<p> {{ article.content }}</p>
<script setup>

  defineProps({
    article: Object
  })
</script>
