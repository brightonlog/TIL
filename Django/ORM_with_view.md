# 🗂️ Django - Views & HTTP Methods (CRUD)

## 📅 2025.09.25 목

---

### ✅ 학습 목표

-   [ ] **View 함수에서 QuerySet API를 활용하여 데이터를 조회, 생성, 수정, 삭제하는 전 과정을 구현할 수 있습니다.**
-   [ ] **HTTP request methods (GET, POST) 개념과 각각의 특징 및 적절한 사용법을 설명할 수 있습니다.**
-   [ ] **클라이언트 요청에 대한 서버의 처리 결과를 나타내는 HTTP response status code 의미를 이해합니다.**
-   [ ] **CSRF (Cross-Site Request Forgery) 공격의 개념을 이해하고, Django에서 CSRF 토큰을 적용하는 방법을 학습합니다.**
-   [ ] **POST 요청 처리 후 중복 데이터 생성과 같은 문제점을 인지하고, redirect() 함수를 활용한 적절한 응답 처리 방식을 구현할 수 있습니다.**
-   [ ] **캐시(Cache)의 개념과 장점을 이해하고, GET과 POST 메서드의 차이점을 명확히 비교할 수 있습니다.**

---

## 🤝 HTTP Request Methods: 웹 세상의 약속

HTTP는 웹에서 데이터를 주고받기 위한 **'약속(프로토콜)'**이야. 클라이언트(브라우저)가 서버에게 무언가를 요청할 때, 어떤 행동을 하고 싶은지에 따라 요청 방식을 달리해야 해.

### GET: "데이터 좀 보여줘" (Read)

서버로부터 데이터를 **조회(Read)**할 때 사용하는 방식이야.

-   **특징**:
    -   URL에 `?key=value` 형태로 데이터가 그대로 노출돼. (비밀번호 같은 민감 정보는 절대 GET으로 보내면 안 되겠지?)
    -   **캐싱(Caching)**이 가능해서, 같은 요청을 다시 보낼 때 더 빠르게 응답할 수 있어.
    -   주로 웹 페이지를 보거나, 검색 결과를 요청하는 데 쓰여.

### POST: "이 데이터로 뭔가 바꿔줘" (Create, Update, Delete)

서버의 데이터를 **변경(생성, 수정, 삭제)**할 때 사용하는 방식이야.

-   **특징**:
    -   데이터를 요청 본문(body)에 숨겨서 보내기 때문에 URL에 노출되지 않아.
    -   캐싱되지 않아. 매번 새로운 요청으로 처리돼.
    -   회원가입, 로그인, 게시글 작성, 파일 업로드 등 중요한 작업을 할 때 쓰여.

---

## 🛡️ CSRF Token: 내 요청이 진짜임을 증명하기

**CSRF(사이트 간 요청 위조)**는 사용자가 모르는 사이에 해커가 의도한 요청(글쓰기, 송금 등)을 보내게 만드는 해킹 공격이야.

Django는 이걸 막기 위해 **CSRF 토큰**이라는 안전장치를 사용해. 중요한 요청(POST)을 보낼 때마다 "이건 내가 보낸 진짜 요청이 맞아"라는 **일회용 비밀 코드**를 함께 보내는 거지.

-   **적용법**: `<form>` 태그 바로 아래에 `{% csrf_token %}` 한 줄만 넣어주면 끝!
-   **왜 POST에만 쓸까?**: GET은 데이터를 조회만 하지만, **POST는 DB 상태를 바꾸는** 민감한 작업이기 때문이야.

---

## ↪️ Redirect: POST 요청 후 필수 코스

게시글을 작성하고 나서, 만약 새로고침(F5)을 누르면 브라우저가 방금 보냈던 POST 요청을 또 보내려고 해. 그럼 똑같은 글이 계속 중복으로 작성되는 문제가 생기겠지?

이걸 막기 위해 **Redirect**를 사용하는 거야.

-   **동작 원리**:
    1.  **클라이언트**: "이 데이터로 글 하나 만들어줘!" (POST 요청)
    2.  **서버**: (글을 성공적으로 만들고 나서) "OK! 이제 `/articles/` 페이지로 **새로 접속해**." 라고 응답 (`redirect`).
    3.  **클라이언트**: "알았어!" 하고 `/articles/` 페이지로 **새로운 GET 요청**을 보냄.

이렇게 하면 마지막 요청이 안전한 GET 요청으로 끝나기 때문에, 사용자가 새로고침을 해도 데이터가 중복으로 쌓일 일이 없어.

---

## 👨‍🍳 View 함수로 CRUD 구현하기

### Create (생성)

생성 기능은 **GET 방식**과 **POST 방식**을 한 함수 안에서 둘 다 처리해야 해.

```python
# articles/views.py

def create(request):
    # 사용자가 데이터를 제출했을 때 (POST)
    if request.method == 'POST':
        title = request.POST.get('title')
        content = request.POST.get('content')
        article = Article(title=title, content=content)
        article.save()
        # 글을 다 저장했으면, 메인 페이지로 Redirect!
        return redirect('articles:index')
    
    # 사용자가 글 작성 페이지를 처음 요청했을 때 (GET)
    else:
        # 그냥 빈 페이지만 보여주면 됨
        return render(request, 'articles/create.html')
