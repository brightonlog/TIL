# 동기
## 동기란?
- 순차적으로 작업이 진행되는 것
- 작업이 끝날 때까지 기다림
- 
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <script>

    // 출력결과
    // 작업 1 시작
    console.log('작업 1 시작')
    // (반복 실행 동안 잠시 대기)
    // 작업 완료
    const syncTask = function () {
      for (let i = 0; i < 10000000000; i ++){
        // 대기
      }
      return '작업 완료'
    }

    console.result = syncTask() // 함수 호출
    console.log(result)
    // 작업 2 시작

     console.log('작업 2 시작')

    
  </script>
</body>

</html>

```
---
# 비동기
## 비동기란?
- 작업을 시작만 해두고 완료를 기다리지 않고 다음 코드를 진행하는 것
## 비동기 통신을 쓰는 이유
- 프론트에서 서버로 요청을 보내고 데이터를 응답받는 데 시간이 걸리기 때문에
- 그 동안 다른 코드가 실행될 수 있게 하기 위해서 비동기 통신을 씀
- 
```html
<!-- asynchrounous.html -->

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <script>

    // 출력결과
    // 작업 1 시작
    console.log('작업 1 시작');

    // 작업 완료 - 비동기 (콜백 함수)
    const asyncTask = function(callBack){
      setTimeout(() => {
        callBack('작업 완료')
      }, 5000)
    };

    asyncTask ((result) => {
      console.log(result)
    });

    // 작업 2 시작
    console.log('작업2 시작')
    
    // 작업 완료
    
  </script>
</body>

</html>

```
![alt text](image.png)'


---
# Axios

AJAX의 주된 목적은 "새로고침 없이 비동기적으로 서버와 통신하기 위해서" 입니다.
Axios는 AJAX를 쉽게 사용하게 해주는 '라이브러리'입니다

## axios 사용할 수 있는 두 가지 방법
### 1. CDN
### 2. npm 라이브러리 설치


## Promise 활용 방법
참고로 npm 라이브러리 설치 꼭 해야함
```js
 <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```
### 1. Promise 객체를 변수에 할당하기
``` js
    const promiseObj = axios({
      // HTTP 메서드에는 대표적인 네가지 GET, POST, PUT, DELETE가 있다.
      // 지금은 get 요청을 보내서 고양이 사진을 가져올 참
      method: 'get',
      url: 'https://api.thecatapi.com/v1/images/search'
    }) 

```

### 2. Promise 객체를 변수 선언 없이 바로 처리
``` js
    // 2. 변수 선언 없이 Promise 객체를 바로 처리한다
    axios ({
      method: 'get',
      url : 'https://api.thecatapi.com/v1/images/search'
    })
      .then((response) =>{
        console.log(response.data)
      })
    .catch((error) => {
      console.log(error)
    })
    
    console.log('안녕하세요2')
```

![alt text](image-2.png)

### promise 핵심 정리

promise는 then | catch 만 외우면 된다
- .then() :  요청이 성공했을 때
- .catch() : 요청이 실패했을 때

```js
    promiseObj
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })

    console.log('안녕하세요')
    //  '안녕하세요'가 먼저 출력된다
    // console.log(response) ---> 서버에 get 요청 보내고, 응답이 도착했을 때 실행됨
    // '안녕하세요'가 나중에 출력되면 동기임.


```
- 이때는 안녕하세요가 먼저 출력된다.
- ![alt text](image-1.png)

## Axios 실습 예시

```html
<!-- 고양이 이미지를 가져와서 보여주는 웹 페이지 -->
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Document</title>
</head>

<body>

  <button>냥냥펀치</button>


  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script>
     
    const CAT_URL = 'https://api.thecatapi.com/v1/images/search'

    // 1. querySelector
    const btn = document.querySelector('button')

    // 2. callback 함수
    // 얘는 Promise 객체 할당 없이 바로 처리하는 방식임
    const getCats = function () {
       
      axios({
        method: 'get',
        url: CAT_URL,


      })

        // 첫번째 then : 성공했을 때 API 응답에서 URL을 추출
        .then((response) => {
          // console.log(response)
          // 아래 부분은 직접 개발자 모드 콘솔 켜서 직접 적을 줄 알아야 함
          const imgUrl = response.data[0].url
          return imgUrl
        })

        // 두번째 then : 이미지 URL 추출 후, 웹페이지의 img 태그에 추가

        .then((imgData) => {
          // img 태그 생성하기
          const imgElem = document.createElement('img')
          // 속성 조작 메서드
          imgElem.setAttribute('src', imgData)
          // body의 자식 태그로 추가
          document.body.appendChild(imgElem)

        })

        .catch((error) => {


        })


      console.log('야옹야옹')
    }

    // 3. 이벤트 리스너
    btn.addEventListener('click', getCats)


    // promise의 주요 장점 2가지

   </script>
</body>
</html>
```


---
# Async Await
asny-await은 try-catch로 잡는다.
- await : 서버로 요청보내고 응답받을 때 await를 붙임

## async await 쓰는 이유
Promise 와 비교했을 때, async-await을 쓰는 이유가 뭘까?
- 동기 코드처럼 코드가 읽히는데, 비동기로 동작하기 때문이다 (가독성이 좋음)


----


# etc
## 1. 콘솔 켜서 코드를 읽을 줄 알아야 함
![alt text](image-3.png)

이미지 url을 불러오고 싶을 때, 이렇게 콘솔창 열어서 하나하나 찾으러 갈 줄 알아야 한다.