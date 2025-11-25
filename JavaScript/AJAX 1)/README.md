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
![alt text](image.png)