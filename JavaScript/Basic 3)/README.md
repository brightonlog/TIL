# 객체
## 객체 내장 함수
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
    const user = {
      name: 'Alice',
      'key with space': true,
      greeting: function () {
        return 'hello'
      }
    }

    // 조회 두가지 방법
    // 1. 개체.속성
    console.log(user.name)

    // 2. 만약 속성이 (문자열, 특수문자포함, 숫자로 시작)
    // 2. 객체['속성']
    console.log(user['key with space'])

    // 추가
    user.address = 'busan'
    console.log(user.address)


    // 수정
    user.name = 'bogeom'
    console.log(user.name)

    // 삭제 --> delete
    delete user.name
    console.log(user.name) // undefined

    // in 연산자 (파이썬의 멤버십 연산자와 비슷함)
    console.log('greeting' in user)  // 불리언 값으로 출력됨
    console.log('country' in user)

    // 메서드 호출 (객체 안에 있는 함수를 메서드라고 함)
    console.log(user.greeting)

    //this 키워드를 사용



  </script>
</body>

</html>


```
---

# 추가 객체 문법
## 단축 속성
## 단축메서드
## 계산된 속성
## 구조 분해 할당

### 구조 분해 할당이 쓰이는 두 가지 경우
1. 변수에 객체의 값을 할당할 때
- 중괄호 {} 사용하면 됨

2. 함수의 매개변수로 쓰일 때
- 특징 1) 매개 변수 순서가 상관없다
- 특징 2) 인자가 없으면 undefined

## 전개 구문

## 유용한 객체 메서드

- 속성 : Objects.keys
- 값 : Objects.values

그럼 속상이랑 값만 좌라락 나옴

---

# 내장함수
## map(), filter(), forEach()

```js
const numbers1 =[1, 2, 3, 4];
const doubled = numbers.map(number => number * 2);

console.log(doubled); // [2, 4, 6, 8]
console.log(numbers) // [1, 2, 3, 4]

//filter
const numbers2 = [1, 2, 3, 4, 5, 6];
const evens = numbers.2.filter(number => numbers % 2 === 0);

console.log(evens): // [2, 4, 6] 새로운 배열 출력

//forEach
// 반환 값 없이 반복 작업만 수행

const fruits = ['apple', 'banana', 'grape'];

fruits.forEach(fruit => {console.log(`내가 좋아하는 과일은 ${fruit}입니다.`)})
```
