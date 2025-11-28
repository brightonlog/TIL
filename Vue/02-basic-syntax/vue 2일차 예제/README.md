# 오늘 요약
![alt text](image.png)

---
# 템플릿 문법 정리
## v-html
HTML 코드를 문자열로 받아서 실제 HTML로 렌더링하는 친구
- 자주 쓰지는 않는다고 한다.

```HTML

<div v-html = 'rawHtml'> </div>
<!-- rawHtml에 html 코드 넣어주면 됨 -->


```


## v-bind
HTML 속성을 동적으로(그때 그때 실시간으로 반영) 바인딩한다는 뜻
```HTML

 
<!-- <div v-bind:id='dynamicId'></div> -->
<div :id='dynamicId'></div>

```

## 삼항 연산자 사용
삼항 연산자는 조건문(if, ...)랑 똑같음

```HTML

<p> {{ ok ? 'Yes' : 'No' }}> </p>

```

## v-if
조건부 랜더링
- 보일 수도 있고, 안 보일 수도 있음
- seen이 true면 p태그(요소)가 보임

```html
<p v-i="seen"> 박보검 </p>
```

##  문자열을 뒤집어서 표시
```html


{{ msg.split('').reverse().join('')}}
```

## v-bind
- url 바인딩
```html
<a :href="myUrl">Google</a>
```


- 동적 id 생성
```html
<div :id = "`list-${id}`"></div>

```