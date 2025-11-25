# 비동기의 꽃, 콜백함수
## 콜백함수란?
파라미터로 전달받은 함수
파라미터로 콜백함수를 전달받고, 함수 내부에서 필요할 때 콜백함수를 호출할 수 있음
```javascript
function add(x, y){
  return x + y
}

function printResult(result){
  console.log(result)
}

printResult(add(10, 20))
```

위의 코드를 콜백함수로 구현하면 아래와 같이 변경할 수 있음

```js
function add(x, y, print) {
  print(x + y)
}

function printResult(result){
  console.log(result)
}

add(10, 20, printResult)
```

또한 콜백함수는 정의된 함수 뿐만 아니라 익명 함수도 인자로 전달 가능함
```js
function add(x, y, print){
  print(x + y)
}

add(10, 20, (result) => {
  console.log(result)
})
```
## 콜백함수의 장단점
+ 함수를 인자로 받기 때문에 필요에 따라 함수의 정의를 달리해 전달할 수 있음
+ 함수를 굳의 정의하지 않고 익명 함수로도 전달 가능함
+ 비동기 처리 방식의 문제점을 해결할 수 있음

- 콜백함수를 남용하면 가독성 떨어짐
- 에러 처리가 어려움

## 콜백함수를 이용한 비동기 처리
콜백함수는 주로 비동기 처리에 사용됨. 비동기란 특정 코드의 실행이 끝날 때까지 기다리지 않고 다음 코드로 바로 넘어가는 것을 의미함
  - 예시 : setTimeout() 자바스크립트 내장 함수
- callback이라는 파라미터를 선언하고 콜백함수를 전달받아 setTimeout() 함수의 인자로 전달함
- setTimeout() 함수는 비동기 함수이기 때문에 코드의 실행이 끝날 때까지 기다리지 않고 바로 다음 코드로 넘어감.
```js
function callBackTestFunc(callback){
  setTimeout(callback, 1000)
  console.log('Hello')
}

callBackTestFunc(() => {
  console.log('waited 1 second')
})
```
- 따라서 Hello가 먼저 출력되고 1(1000ms)초 뒤에 콜백함수가 실행됨

| 다만, 콜백함수 만으로는 비동기식으로 만들 수 없음

---
# AJAX
Asynchronous JavaScript And XML
= 비동기 자바스크립트와 XML

---
# Promise
- 객체인데 비동기 작업의 미래 결과를 위한 자리 표시자로 사용되는 객체
- 쉽게 말해서, 비동기적으로 전달되는 값을 담는 컨테이너임
- 더 쉽게 말해서, 미래에 사용될 값을 담는 그릇임
  - 예시 : AJAX 호출에서 오는 응답
  - AJAX를 호출할 때는 아직 가치가 없지만 미래에는 가치가 있는 걸 모두 알고 있음
- Promise는 콜백함수를 해결할 수 있다

- Promise 는 복권과 같다!
- 복권 살 때는 내가 미래에 당첨될 걸 믿고 복권을 삼. 그리고 복권 추첨은 비동기적으로 이뤄짐. 그래서 복권 당첨되는 순간을 기다리며 아무것도 안 하는 것보다 다른 할 일도 하면서 기다림