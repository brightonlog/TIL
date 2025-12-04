<template>
<RouterLink :to="{ name: 'user-profile'}"> Profile</RouterLink>
<RouterLink :to="{ name: 'user-posts'}"> Posts </RouterLink>
    <div>
    <h1> UserView </h1>
    <h2> {{ userId }}번의 User 페이지</h2>

    </div>


    <!-- 페이지가 렌더링 -->
<RouterView/>
<script setup>
    import { ref } from 'vue'
    // userRoute : read-only, useRouter: write-only           
    import { useRoute, useRouter } from 'vue-router'
    // 가드 Leave : 페이지 나갈 때, Update: 페이지 변경될 떄
    import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue=router'
    const route = useRoute()
    const router = useRouter()
    const userId = ref(route.params.id)
</script>


<style scoped>

</style>