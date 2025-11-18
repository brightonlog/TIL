# 원시자료형과 참조 자료형의 차이
## 원시자료형 
 Number, String, Boolean, null, undefined
## 참조 자료형 
Objects(배열, 객체(object), 함수) 
- 배열 <-> 파이썬의 리스트랑 비슷함
- 객체는 파이썬의 딕셔너리와 비슷함
  - 객체 무지무지 중요함 
  - 파이썬에서 딕셔너리로 json파일을 받아오는 것처럼
  - js도 비슷함

## null, undefined, NaN 차이
### null
- null은 파이썬의 None과 똑같음
- 값이 의도적으로 비어있음

```Javascript
const user = null
console.log(user)
```

### undefined
- 값이 할당되지 않은 상태
- 변수만 정의하고 할당하지 않았음

### NaN ( Not a Number )
- 숫자가 아닌 계산 결과
```Javascript

// NaN 뜨는 예시

console.log(0 / 0)
console.log('hello' * 2) // 파이썬에서는 되지만
// JS에는 NaN 뜸


```

# 3. 동등 연산자와 일치 연산자의 차이
## 일치 연산자 ===
- 파이썬의 ==와 같다.
 
일치 연산자는 
1. 값이 같아야 하고
2. 타입이 같아야 한다.

## 동등 연산자 ==
- 동등 연산자는 암묵적인 타입 변환이 이뤄진다

```Javascript
console.log(0 == false)   // true
console.log(0 === false)  // false

```
# 4. 논리 연산자
- && 는 파이썬의 and와 같음
- || 는 파이썬의 or와 같음
- ! 는 파이썬의 NOT과 같음

```Javascript
console.log(1 && 3)
console.log(1 || 3)
console.log( !1 )

```


---
# 전위 연산자와 후위 연산자 (증감 연산자)

```JavaScript
    // 전위 연산자
    let a = 3
    const b = ++a // b는 4
    // 1) a = a + 1
    // 2) b = a
    console.log(b) // 4

    // 후위 연산자
    let x = 3
    const y = x++ // y는 3
    // 1) y = x
    // 2) x = x + 1
    console.log(y) // 3
```
---
# 호이스팅
한국어로는 끌어올려짐, 이라는 의미임
```JavaScript
console.log(name)
var name = '박보검'
```
이렇게 하면 원래 값이 안 나와야하는데, '박보검'이 콘솔에 출력됨
  - 이렇게 하면 책임소재가 분명하지 않으니, var를 쓰지 않음
  - => 호이스팅 쓰지 않음

```JavaScript
// 호이스팅이 발생하기는 하지만, TDZ 에러가 뜸
console.log(age)
let age = 2

console.log(height)
const height = 183
```
- 호이스팅이 발생하기는 하지만, TDZ 에러가 남
- ![alt text](image.png)

---
# 조건문
```JavaScript
  if (name === 'admin') {
  console.log('관리자님 환영해요')
} else if (name === 'customers') {
  console.log('고객님 환영해요')
} else {
  console.log(`반갑습니다. ${name}님`) // f 스트링 비슷한 놈 사용 시 백틱을 써야함
}
```
---
# 반복문
## while
```JavaScript
  // 1. while, 0부터 5까지 출력
  
  // 초기식
  let i = 0;

  // 조건식
  while (i < 6) {
    console.log(i);
    // 증감식
    i ++;
  }
```
## for문
```JavaScript
 // 2. for, 0부터 5까지 출력
  // for (초기식; 조건식; 증감식; 순으로 들어감)
  // 조건식이 참인 동안 반복

  for (let i = 0; i < 6; i++ ) { // i++ 뒤에는 콜론 붙이지 말기. 마지막엔 원래 안 붙임. 붙이면 오류남
    console.log(i)
  }


  // 3. for...in, 3-1. a b 출력, 3-2. apple banana 출력
  const object = {
    a: 'apple',
    b: 'banana'
  }

  for (const property in object){
    console.log(property)
  }

```

### for in 과 for of
- for in 은 속성(키)을 순회함
- for of 는 값을 순회함
```JavaScript
  // for... of 는 값을 직접 순회함
  // 4. for...of, 4-1. 0 1 2 3 출력, 4-2. a p p l e 출력
  const numbers = [0, 1, 2, 3]
  for (const number of numbers){
    console.log(number)
  }

  const myStr = 'apple'

  for (const str in myStr){
    console.log(str)
  }

  for (const str of myStr){
    console.log(str)
  }

  //5. for...in 과 for...of 의 차이, 5-1. 0, 1, 2 출력, 5-2. a, b, c 출력
  const arr = ['a', 'b', 'c']
for ( const i in arr){
  console.log(i)
}

for (const i of arr){
  console.log(i)
}
```

---
# 함수
함수 선언식은 호이스팅이 발생해서 함수 표현식을 쓴다.

```JavaScript

```