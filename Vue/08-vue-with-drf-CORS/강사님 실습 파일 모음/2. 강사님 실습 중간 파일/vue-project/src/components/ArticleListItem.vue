<template>
  <div>
  </div>
</template>
<h5>{{ article.id }}</h5>
<a> {{ article.title }}</a>
<p> {{ article.content }}</p>

<!-- 상세 페이지 버튼 -->
<RouterLink :to="{name : 'DetailView'}, params; {id: article.id}">


</RouterLink>


<script setup>

  defineProps({
    article: Object
  })


  import { RouterLink } from 'vue-router';
</script>
