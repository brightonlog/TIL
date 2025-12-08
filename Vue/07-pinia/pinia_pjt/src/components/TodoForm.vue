<template>
  <div>
    <!-- 할 일 추가할 떄마다 새로고침 막겠다(prevent) -->
    <form @submit.prevent="createTodo(todoText)" ref="formElem">
    </form>
    <!-- 양방향 모델 v-model, 그리고 input text가 todoText가 createTodo의 인자로 들어가고, 걔가 또 addTodo의 인자로 들어가고 하는 흐름이다. 흐름 파악할 것! -->
    <input type="text" v-model ="todoText">
    <input type="submit">
  </div>
</template>



<script setup>
  import { ref } from 'vue'
  import { useCounterStore } from '@/stores/counter';
  const store = useCounterStore()
  
  // 할 일
  const todoText = ref('')
  const formElem = ref(null)
  

  // create 함수
  const createTodo = function(todoText) {

    // 중앙 저장소의 addTodo 함수 가져오기
    store.addTodo(todoText)
    // 할 일 추가될 때마다 form 초기화 (reset)
    formElem.value.reset()
  }

</script>

<style scoped>



</style>