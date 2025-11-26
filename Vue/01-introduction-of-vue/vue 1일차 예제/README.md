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
---
# Vue 이벤트 리스너
- 함수 안에 함수를 정의할 것
- createApp 함수에 increment 함수를 정의할 것 ( 자주 쓰는 방법 )

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <div id="app">
    <!-- button 클릭 이벤트가 발생하면 increment 함수를 실행하겠다 -->
    <button @click="increment">
      {{ count }}
    </button>
  </div>
   <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
   <script>

    //1. 구조 분해 할당
    const {createApp, ref} = Vue

    // 2. createApp 함수
    // 1번 파일 과의 차이점은 increment를  함수 안에 정의한다는 것
    const app = createApp({
      setup(){
        const count = ref(0)
        // ref(0)은 객체인데, { value: 0 } 이렇게 되어있다. 그래서 키를 .value 이렇게 나타내주는 것
        const increment = function(){
          count.value++
        }

        return{

          count, // 변수를 return
          increment // 함수를 return

        }
      }
    })

    // 3. mount
    app.mount('#app')
    
   </script>
</body>

</html>

```
---
# Ref vs Variable

















----
# 기타
## HTML 작성 팁
```html
div#app>h1*2
이렇게 치면
  <div id="app">
    <h1></h1>
    <h1></h1>
  </div>

이렇게 나온다
```


```html
  div#app>p*2+button
이렇게 치면
  <div id="app">
    <p></p>
    <p></p>
    <button></button>
  </div>
이렇게 나온다
```