<template>
  <div>
  </div>
</template>

<script setup>
  import axios from 'axios';
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useArticleStore } from '@/stores/articles';

  const store = useArticleStore()
  const route = useRoute()

  // 단일 게시글 null 값으로 초기화
  const article = ref(null)

  onMounted(() => {
    axios({
      method:'get',
      url: `${store.API_URL}/api/v1/article/${route.params.id}/`
    })
    .then((res)=>{
      article.value = res.data
    })
    .catch(err => console.log(err))
  })

</script>

<style>

</style>
