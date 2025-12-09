<template>
  <div>
    <!-- :class -> 만약 true인 경우, class 선택자를 적용할 것이다 -->
     <!-- isDone 카멜 케이스가 is-done 케밥 케이스로 바뀜 -->
    <span @click="store.updateTodo(todo.id)" :class="{'is-done':todo.isDone}">
      {{ todo.text }}
    </span>

    <button @click="store.delete(todo.id)">Delete</button>
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
  /* 취소선 */
  /* 클래스 선택자 /
  .is-done {
    text-decoration: line-through;
  }

</style>