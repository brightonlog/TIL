# 이벤트
1. 버튼 선택 (querySelector)
2. 콜백 함수
3. 버튼에 이벤트 핸들러를 부착
  - 이벤트 리스너 : 어떤 특정 상황을 감지해씅ㄹ 떄 특정 함수를 실행하겠다
  - 예) 버튼을 클릭했을 떄, 콜백 함수를 실행하겠다
---
# 버블링
## 왜 버블링일까?
우리가 잠수하면 거품이 위로 뽀글뽀글하며 수면 위로 올라간다.
그것과 비슷함.
=> 가장 안쪽 요소부터 바깥쪽 요소로 전파됨

## 버블링 전파 순서
p -> div -> form

```js

    // 버블링이란?
    // 거품이 물 속에서 수면 위로 올라가듯, 가장 안 쪽 요소부터 바깥 쪽 요소까지 전달된다.
    // 전파 순서?
    // p -> div -> form
    
    // 1. querySelector
    const formElement = document.querySelector('#form');
    const divElement = document.querySelector('#div');
    const pElement = document.querySelector('#p');

    // 2. 콜백함수
    const clickHandler1 = function (event) {
      console.log('form 클릭');
    }
    const clickHandler2 = function (event) {
      console.log('div 클릭');
    }
    const clickHandler3 = function (event) {
      console.log('p 클릭');
    }

    // 3.이벤트 리스너
    // form 태그를 클릭하면 clickHander1 콜백 함수를 실행하겠다.
    formElement.addEventListener('click', clickHandler1);
    divElement.addEventListener('click', clickHandler2);
    pElement.addEventListener('click', clickHandler3);
```
- 이떄 p 클릭하면 div, form이고
- div 클릭하면 form 만 눌려짐(p X)
---
# target과 currentTarget
## current target
이벤트 리스너에 부착된 요소
- inner 클릭하면 outerOuter 나옴

## target
실제 클릭한 요소 (이때 요소는 tag)
- inner 클릭하면 inner 나옴