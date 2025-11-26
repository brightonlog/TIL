# Vue 사용법
1. npm 명령어로 설치
  - 이때n은 node의 n인데
  - 노드는 런타임이다! 헷갈려하지 말 것
  - 뷰가 프레임워크임
2. CDN ( 오늘 배울 것 )

## CDN을 통한 Vue 사용 
-  공식 홈페이지에 가서 CDN 가져오면 됨
-  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
-  body 안에 넣어줄 것

### 핵심 내용
- Vue에 필요한 함수들을 '구조 분해 할당'으로 가져와야한다
- createApp : 반드시 이 함수를 써야 Vue 앱을 생성한다.
- ref : 반응형 변수를 생성하는 함수

- <기본 구조>
``` js
  // 1. 구조분해할당
  const {createApp, ref} = Vue
  
  // 2. createApp 함수 만들기
  const app = createApp({

    setup() {

      return {


      }
    }
  })
  // 3. mount
  app.mount('#app')
```

- 예시
``` js
 <script>
  // 1. 구조분해할당
  const {createApp, ref} = Vue
  
  // 2. createApp 함수 만들기
  const app = createApp({

    setup() {
      // ref 반응형 변수
      const message = ref('Hello vue!')
      const count = ref(0)

      return {
        message,
        count
      }
    }
  })

  // 3. mount
  app.mount('#app')

```
