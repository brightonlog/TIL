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
