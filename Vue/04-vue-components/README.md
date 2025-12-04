# vue-project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```


--- 
# Component
재사용 가능한 코드 블록
- 코드 재사용성이 높아지고, 유지보수가 쉬워짐

# SFC
Single File Component
- .vue( 닷뷰 ) 로 끝남
- 하나의 VUE 파일 안에 컴포넌트의 html, js, css 코드를 모두 담는 vue의 개발 방식
  - html : 화면 구조를 담당하는 template,
  - javascript : 로직을 담당하는 script,
  - css : style을 담당하는 style
  이 세부분으로 나타나있음
- 상관은 없는데 일반적으로 template -> script -> style 순서로 작성함


---
# template 블록
- 각 vue 파일은 최상위 template 블록을 하나만 포함할 수 있음

# script 블록
``` vue
<script setup>

</script>
```
- script 안에 setup 태그만 붙여주면 내부에서 활용하는 값들을 바로 쓸 수 있음 return 안 써도 됨

# style scoped 블록
- scoped가 지정되면 CSS는 현재 컴포넌트에만 적용됨

---
# SFC build tool
- 하나의 vue 파일 안에 컴포넌트의 html, js, css 코드를 모두 담는 vue의 개발 방식을 빌드할 때 사용하는 툴이 무엇일까?
