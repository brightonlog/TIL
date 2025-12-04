# Vue Router의 역할
- SPA 
- 새로고침 (페이지 전체 다시 로드) 없이 페이지 전환을 구현하기 위해 사용
    - 페이지 전체가 로드 되지 않게, 새로고침 되지 않게 URL만 변경하며 새로고침함
    - (새로고침 = 페이지 전체 다시 로드)
- 새로 고침 없이 URL 변경하면서 다른 컴포넌트를 렌더링 (UserPosts와 UserProfile 짬)



- 이번에는 컴포넌트 말고 다른 폴더가 등장함
    - 뷰와 라우터

- 뷰에게는 네 자식이 있음
- 1. HomeView (미혼)
- 2. AboutView (미혼)
- 3. 🌟 UserView (기혼)
    - UserView에는 세명의 자식들이 있었는데...
    - UserView의 세 자식들은 components 폴더에 있음
    - 세 자식들 : UserHome, UserPosts, UserProfile
- 4. 🌟 LoginView (미혼)
    -🌟 beforeEnter

- 이 넷은 모두 url이 달랐음
- Home, About, User, Login 짜기 전에 🌟index.js를 부여서 했음. 여기에 url을 담음


## index.js
- router임

## RouterLink
RouterLink는 html의 a 태그와 비슷하다
- 차이점 : 페이지의 새로고침 없이 SPA 방식으로 페이지를 전환함
- :to="" : 속성으로 이동할 경로를 지정

---
# pjt 실습
```bash
npm create vue@latest
```

후 select feature에서 enter로 Router(SPA development) 누를 것

그 후 
```bash
npm i
npm run dev
```

그 후
- src/views에 LoginView.vue 와 UserView.vue 만들어주기
- 항상 먼저 앱닷뷰부터 짤 것
- css



## RouterLink
RouterLink는 html의 a 태그와 비슷하다
- 차이점 : 페이지의 새로고침 없이 SPA 방식으로 페이지를 전환함
- :to="" : 속성으로 이동할 경로를 지정

## RouterView
RouterView는 페이지가 렌더링되는 위치다.


## index.js
- path는 django의 urls.py와 비슷하다
- component의 디렉토리는 views 디렉토리다. component 디렉토리가 아니다.
- beforeEnd = 라우터 가

--- 
# UserView의 세자식 돌보러가기
- components 아래에 UserHome.vue, UserProfile.vue, UserPosts.vue 파일 만들기


- index.js에 components 디렉토리 짜주기

- 그 후 views 폴더의 UserView.vue 짜기