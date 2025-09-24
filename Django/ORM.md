# 🗂️ Django - ORM & QuerySet API

## 📅 2025.09.24 수

---

### ✅ 학습 목표

-   [ ] **ORM의 개념과 데이터베이스-파이썬 간 역할을 설명할 수 있다.**
-   [ ] **QuerySet API 기본 구조를 이해하고, CRUD 전 과정을 파이썬 코드로 수행할 수 있다.**
-   [ ] **Field lookup 구문으로 원하는 조건의 데이터를 효과적으로 필터링할 수 있다.**
-   [ ] **Django Shell에서 모델 인스턴스를 만들고 `save()`로 저장해 객체→ 레코드 변환 흐름을 실습할 수 있다.**
-   [ ] **View 함수에서 QuerySet을 가져와 템플릿에 전달하는 Model→ View → Template 데이터 흐름을 구현할 수 있다.**

---

## 🗣️ ORM (Object-Relational Mapping)

**ORM**은 파이썬 같은 객체 지향 언어의 **'객체(Object)'**와 데이터베이스의 **'데이터(Data)'**를 연결(Mapping)해주는 기술이야.

쉽게 말해, SQL을 모르는 파이썬 개발자를 위해 Django가 고용한 **'통역사'** 같은 존재! 우리가 파이썬 코드로 명령을 내리면, ORM이 이걸 SQL로 번역해서 DB에 전달하고, DB가 돌려준 결과를 다시 파이썬 객체로 번역해서 우리에게 돌려줘.

-   **우리의 코드 (Python)** `→` **ORM (통역)** `→` **데이터베이스 (SQL)**

---

## 📜 QuerySet API: ORM에게 말 거는 법

**QuerySet API**는 우리가 ORM이라는 통역사에게 명령을 내릴 때 사용하는 **'문법'**이야. 이 문법 덕분에 복잡한 SQL 쿼리문 대신, `Article.objects.all()`처럼 직관적인 파이썬 코드로 DB를 다룰 수 있어.

-   **`Article.objects.all()`**
    -   `Article`: 모델 클래스 (어떤 테이블?)
    -   `objects`: Manager (관리자)
    -   `all()`: QuerySet API 메서드 (무엇을 할지?)

-   **QuerySet 이란?**
    -   DB에서 전달받은 **데이터 묶음(객체 목록)**.
    -   여러 개의 데이터가 담겨있기 때문에 `for`문으로 순회할 수 있어.
    -   만약 DB가 딱 하나의 데이터만 돌려주면, QuerySet이 아닌 **모델의 인스턴스(객체)** 형태로 받아.

---

## 🍎 CRUD 실습 (with QuerySet API)

### 1. Create (생성)

**데이터 객체를 만드는 3가지 방법**이 있지만, 실무에서는 **2번 방법**을 가장 권장해!

1.  **빈 객체 생성 후 값 할당 및 저장**
    ```python
    article = Article()
    article.title = 'first'
    article.content = 'hello'
    article.save()
    ```

2.  **초기 값과 함께 객체 생성 후 저장 (👍 추천!)**
    ```python
    article = Article(title='second', content='world')
    article.save()
    ```

3.  **`.create()` 메서드로 한 번에 생성 및 저장**
    ```python
    Article.objects.create(title='third', content='!!')
    ```

⚠️ **`.create()` 메서드 사용을 지양해야 하는 이유!**
`.create()`는 **유효성 검사 없이** 데이터를 바로 DB에 저장해버려. 실제 서비스를 만들 땐, DB에 저장하기 전에 데이터가 올바른지 반드시 검증하는 과정이 필요해. **2번 방법**은 `.save()`를 호출하기 전에 유효성 검사를 할 틈을 주기 때문에 훨씬 안전하고 선호되는 방식이야.

### 2. Read (조회)

-   **전체 데이터 조회 (`.all()`)**: 모든 데이터를 QuerySet 형태로 가져옴.
    ```python
    articles = Article.objects.all()
    ```

-   **특정 조건 데이터 조회 (`.filter()`)**: 조건에 맞는 데이터만 QuerySet 형태로 가져옴.
    ```python
    # title이 'first'인 게시글들
    articles = Article.objects.filter(title='first')
    
    # content에 'hel'이 포함된 게시글들
    articles = Article.objects.filter(content__contains='hel')
    ```

-   **단일 데이터 조회 (`.get()`)**: **고유한(pk 등)** 조건으로 딱 **1개**의 데이터만 가져옴.
    -   데이터가 없거나, 2개 이상이면 에러가 발생하니 주의해야 해!
    ```python
    # pk가 1인 게시글 하나
    article = Article.objects.get(pk=1)
    ```

### 3. Update (수정)

수정은 **"조회 → 수정 → 저장"** 3단계를 기억하면 돼.

```python
# 1. 수정할 게시글을 먼저 조회해서 변수에 담고,
article = Article.objects.get(pk=1)

# 2. 인스턴스 변수의 값을 바꾼 다음,
article.title = 'updated title'

# 3. 반드시 save() 메서드를 호출해서 DB에 반영!
article.save()


# 1. 삭제할 게시글을 먼저 조회해서,
article = Article.objects.get(pk=1)

# 2. delete() 메서드를 호출하면 끝.
article.delete()

---

## 🖥️ ORM with View: 데이터 흐름

`views.py`에서 ORM을 사용해 DB 데이터를 가져와 Template에 전달하는 흐름은 Django의 핵심이야.

1.  **사용자 요청** (`urls.py`)
    -   사용자가 특정 페이지를 요청하면, `urls.py`가 가장 먼저 받아서 어떤 View 함수를 실행할지 결정해.

2.  **View 함수 호출** (`views.py`)
    -   `articles = Article.objects.all()` 같은 코드로 **DB에 모든 게시글을 요청 (ORM 사용)**.
    -   ORM이 DB에서 가져온 `articles` QuerySet을 `context`라는 딕셔너리에 담아.

3.  **Template 렌더링**
    -   View 함수는 `context`를 Template 파일에게 넘겨줘.
    -   Template은 전달받은 `articles`를 `for` 태그로 순회하면서 화면에 게시글 목록을 예쁘게 출력해주는 거지.
