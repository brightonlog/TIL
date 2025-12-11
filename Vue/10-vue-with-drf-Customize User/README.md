1. django 가상환경 세팅하기
```bash
python -m venv venv
source venv/Scripts/Activate
pip list
pip install -r requirments.txt

python manage.py makemigrations
python manage.py migrate

python manage.py createsuperuser
username : admin
Email address: enter키
password: 1
y

```

2. article에 있는  admin.py
```python 

from .models import Article

admin.site.register(Article)
```

그러고 runserver

3. admin 페이지로 이동
- admin 페이지로 이동 후 admin 페이지로 로그인하기
- 글도 하나 등록하기


---- 
## Vue 세팅하기
1. 
cd .. 해서
cd vue-project로 이동하기

2.
```bash
ls 해서 뭐가 있는지 확인하고
npm i 해서 설치하기

npm run dev
후 뜨는 로컬 페이지로(5173)으로 들어가기
```
관리자 도구에서 application, local storage에서 http://localhost:5173에서 clear눌러주기
그러면 401에러 (인증이 안됨, 토큰 자체가 없음)가 뜬다.

### 회원가입 로직 구현
1. Vue의 src/router/index.js
```python

import SignupView from ...
{
    path: '/signup/',
    ...
} # 를 주석해제 했다.

2. App 컴포넌트에 
APP.vue
```vue
<RouterLink: to{...}
```

3. 회원가입 form 작성
views>SignUpView.vue

```html
<form @submit.prevent="signUp">
    <label for="username">username</label>
    <input type = "text" id = "username" v-model.trim>..



    const username = ref(null)
    const password1 = ref(null)
    const password2 = ref(null)
</form>
```

4. 사용자의 입력을 받아서 요청을 보내는 함수 만들기
- stores/accounts.js

```js
export const useAccountStore = defineStore('account', ()=>{
    const signUp = function() {
        ...
    }
    return { signup }
}, {persist: true })
```


5. 컴포넌트에 사용자 입력 데이터를 저장 후, store의 signUp 함수를 호출하는 함수 작성
```html

<script setup>
    import {useAccountStore} from ...
    import {ref} from 'vue'
    const accountStore = useAccountStore()

    const username = ref(null)
    const password1 = ref(null)
    const password2 = ref(null)

// 그리고 저쪽 위에 있는 
const signUp = function() {
    const payload ={
        username : username.value,
        password1 : password1.value,
        password2 : password2.value,
    }
    accountStore.signUp(payload) // ref객체에 있는 것에서 필요한 값만 추출하고, 그 추출된 object 덩어리를 signup으로 그대로 던져주기
}

```

6. accounts.js에서 사용자 입력을 받게 됨. 그 입력을 받은 걸로 signUp 함수 작성
- 이때 drf로 회원가입 요청을 하면 됨 (사용자 입력 데이터 포함해서)

stores>accounts.js
```js
const signUp = function(payload){
    const username = payload.usernaame
    const password1 = payload.password1
    const password2 = payload.password2

    // 2번 방법 -> 구조 분해 할당const { username, password1, password2 } = payload
}

axios({
    method: 'post', 
    url: `${API_URL}/ACCOUNTS/SIGNUP/`, //API_URL은 상수(CONST)로 미리 등록해놓기
    data: {
        username, password1, password2, // 단축속성으로 정보 전달하기
    }
})

## 로그인 로직 구현
1. src/router/index.js
```js
{
path: '/login',
name: 'logInView',
compotnent: LogInView
}
```


App.vue에서 Router 링크 통해서 로그인 페이지로 가는 링크 살리기
2. 로그인 form 작성

views/LoginView.vue
```vue
<template>
<form @submit.,prevent="logIn">
    <label>
    


```

그 다음 유저네임과 passwords const해놓은 거 주석 해재하기

3. accounts.js
```javascript
const logIn = function(payload){

}
// 그러고 return에 login 주석해제 해주기
```


4. accounts.js
```js
const token = ref(null)
```

token을 return 에다가 넣어주기도 하기

---
# 요청과 토큰
## 토큰이 필요한 요청
1. 게시글 전체 목록 조회 시
2. 게시글 작성 시

 - 이건 header에다가 토큰을 같이 넣어서 전달하기만 하면 끝남

## 토큰 저장 로직 구현
1. django의 stores>articles.js
```js
 const getArticles = function(){
    axios({
        method: 'get',
        url: ...,
        headers: {
            'Authorization1' : `Token ${accountStore.token}`
        }
    })
 }
```
---
# 인증 여부 확인
로그인 유무는 어떻게 판단할까?

Token으로 확인한다. Token을 갖고 있으면 로그인, 갖고 있지 않으면 로그인 하지 않은 것
1. 인증되지 않은 사용자
메인 페이지 접근 제한
2. 인증된 사용자
회원 가입 및 로그인 페이지 접근 제한


=> 삼항 연산자 사용해서, token.value에 값이 있으면 true, 없으면 false 되돌려주기
```
const isLogin = computed(() =>{
return token.value ? true : false
})
...
return { signUp, logIn, token, isLogin}, {persist: true})
```

## 인증되지 않은 사용자는 메인 페이지 접근 제한

rounter/index.js

- beforeEach : 이동하기 전에 실행되는 네비가드
- router 가드 활용하는 것
- 이동하기 전에 실행이 되는 네비 가드인 beforeEach를 활용할 것
- 이동하기 전에, 확인해서, "어 너 로그인 안 되어있어"
```js
import { useAccountStore } from ...

router.beforeEach((to, from) => {
    const accountStore useAccountStore()

    if (to.name ==='ArticleView'|| to.name==='DetailView' && !accountStore.isLogin){
        window.alert('로그인이 필요합니다')
    }
    
})
```

- 가려는 곳을 확인하고, 가려는 곳이 article.view 혹은 DetailView면 로그인이 되어있는지 확인하는 로직이다.

## 인증된 사용자는 회원가입과 로그인 시도 차단하기



```js

```

---
# User Customize
- dj-rest-auth를 활용한 회원가입 시 User Model Customize 해보기

1. django로 가기
나이정보를 저장할 PositiveIntegerField 추가
- accounts > models.py

```python
class User(AbstractUser):
age = models.PositiveIntegerField(null=True, blank = True)
```
---
# 참고
## 로그아웃 구현
1. stores>accounts.js
```js
const logOut = function(){
    axios
    ....
}
```


2. app.vue
```vue
<form @submit.prevent="logOut">
    <input type ="submit" value = '...'>
```


## 기타기능 구현
1. 로그인 성공 후 자동으로 메인 페이지 이동하기
자동으로 article.View로 보내주면 됨(router.push)

2. Django Signals
- 이벤트 알림 시스템
- 어플 내에서 특정 이벤트가 발생헀을 때, 다른 부분에 신호를 보내어 이벤트가 발생했음을 알릴 수 있음
- 주로 모델의 데이터 변경 또는 저장, 삭제와 같은 작업에 반응하여 추가적인 로직을 실행하고자 할 때 사용

signals.py
```python
@receiver (post_save, sender=Article)
def article_post_save(sender, instance, created, **kwardgs)
...
```

3. 환경 변수
.env.local
package.json이랑 같은 위치에 만들어야함
주의사항
- 변수명은 반드시 VITE_접두어를 작성해야햐ㅏㅁ
변수명과 값 사이에 공백이 없어야함.

```local
//.env.local로 파일명 지정하기
VITE_API_URL='http://127.0.0.1:8000'