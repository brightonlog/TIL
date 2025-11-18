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