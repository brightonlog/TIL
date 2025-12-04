<template>

    <RouterLink :to="{ name: 'user-profile'}">Profile</RouterLink>
    <RouterLink :to="{ name: 'user-posts'}">Posts</RouterLink>

    
    <div>
        <h1>UserView</h1>
        <h2>{{ userId }}번의 User 페이지</h2>
    </div>    
    
    <button @click='goHome'>Home</button>
    <button @click='routeUpdata'>99번의 유저 페이지</button>


    <!-- 페이지가 랜더링 -->
    <RouterView/>

</template>


<script setup>

    import { ref } from 'vue'

    import { RouterLink, RouterView } from 'vue-router'

    // useRoute: read-only , useRouter: 라우트 전환을 위한 API
    import { useRoute, useRouter } from 'vue-router'
    // 가드 Leave : 페이지 나갈때, Update : 페이지 url 변경 될 때
    import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

    const route = useRoute()
    const router = useRouter()

    const userId = ref(route.params.id)
    // push와 replace의 차이
    // push : 히스토리에 추가되기 때문에 이전 페이지로 갈 수 있음 ( 뒤로가기 됨)
    // replace : 히스토리에 추가되지 않기 때문에 이전 페이지로 돌아갈 수 없음 (뒤로가기 안됨)
    const goHome = function() {
        router.replace({name: 'home'})
    }

</script>


<style scoped>


</style>