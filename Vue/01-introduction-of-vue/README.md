
| 진행일 | 주제            |
| ------ | --------------- |
| 11/26 | Introduction of Vuejs |
| 11/27 | Basic Syntax 01 |
| 12/01 | Basic Syntax 02 |
| 12/02 | Single-File Component |
| 12/03 | Component State Flow |
| 12/04 | Vue Router |
| 12/08 | State Management |
| 12/09 | Vuejs with DRF 01 - "CORS Policy" |
| 12/10 | Vuejs with DRF 02 - "Authentication and Permission" |
| 12/11 | Vuejs with DRF 03 - "Customize User" |

# 오늘 배울 내용
- SPA와 CSR의 개념과 현대 웹 개발에서의 역할을 설명함
- Vue의 핵심 기능인 선언적 렌더링과 반응성을 이해한다
- ref 함수를 사용해 반응형 상태를 선언하고 사용
- createApp과 mount를 사용해 Vue 앱 인스턴스 생성
- ({{}})을 사용해 데이터를 템플릿에 연결


---
# Vue
지난 시간 우리는 서버에서 데이터를 받아와 DOM을 직접 수정하는 AJAX 방식을 배웠다. 그런데 데이터가 바뀔 때마다 매번 DOM 요소를 찾아 수정하는 작업을 더 편하게 할 수는 없을까?
- Vue는 이 과정을 완전 자동화한다.
