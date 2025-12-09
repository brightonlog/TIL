<template>
  <div>
    <h1> Erin의 게시판 </h1>

    <RouterLink :to="{ name:'CreateView'}">
      [CREATE]
    </RouterLink>
<!-- 전체 게시글 목록 -->
    <ArticleList/>
  </div>
</template>

<script setup>

  import ArticleList from '@/components/ArticleList.vue';
  // 처음 화면 들어왔을 때 실행
  import { onMounted } from 'vue';
  // 중앙 저장소
  import { useArticleStore } from '@/stores/articles';

  const store = useArticleStore()

  // 화면 들어오자마자 전체 게시글 조회하겠다
  onMounted(() => {
    store.getArticles()
  })

</script>

<style>

</style>
