# 🗂️ Django - Model, Migrations, Admin

## 📅 2025.09.23 화

---

### ✅ 학습 목표

- [x] **Django Model 클래스를 이용해 DB 테이블 구조를 설계하고 "설계도" 역할을 설명할 수 있다.**
    - **답변:** Model 클래스는 데이터베이스 테이블의 **청사진(설계도)** 역할. 파이썬 코드로 테이블에 어떤 컬럼(필드, 열, 데이터 타입)을 어떤 타입과 제약 조건으로 저장할지 명확하게 정의하는 거지. Django는 이 설계도를 보고 `makemigrations`와 `migrate` 명령어를 통해 실제 데이터베이스에 테이블을 만들줌.
- [x] **다양한 Field type과 Field option을 지정해 컬럼의 데이터 유형과 제약 조건을 정의할 수 있다.**
- [x] **`python manage.py makemigrations` / `migrate` 두 단계로 모델 변경 사항을 안전하게 DB에 반영할 수 있다.**
- [x] **`admin.site.register()`로 모델을 Django Admin에 등록하여 웹 UI에서 게시글을 생성, 조회, 수정, 삭제 (CRUD) 할 수 있다.**
- [x] **Django 기본 DB 엔진인 SQLite의 특성과 `db.sqlite3`를 Git에서 제외해야 하는 이유를 설명할 수 있다.**

---

##  Model: 파이썬과 DB의 중간다리

Model은 개발자가 SQL을 잘 몰라도 파이썬 코드만으로 데이터베이스(DB)를 조작할 수 있게 해주는 **번역가**. `models.py` 파일에 파이썬 클래스로 DB 구조를 짜면, Django가 알아서 DB와 소통해줌.

### Model Class: DB 테이블 설계도

DB 테이블을 정의하는 파이썬 클래스. `models.Model`을 상속받아서 만들어. 클래스 이름이 DB 테이블 이름이 되고, 클래스 변수들이 테이블의 컬럼(필드)이 됨.

```python
# articles/models.py
from django.db import models

class Article(models.Model):
    # title 컬럼: 최대 20글자 문자열
    title = models.CharField(max_length=20)
    # content 컬럼: 글자 수 제한 없는 긴 글
    content = models.TextField()
    # created_at 컬럼: 처음 생성될 때 시간 자동 저장
    created_at = models.DateTimeField(auto_now_add=True)
    # updated_at 컬럼: 수정될 때마다 시간 자동 저장
```
### Model Field: 컬럼의 타입과 규칙 정의

테이블의 각 컬럼이 어떤 데이터를 담을지, 어떤 규칙을 가질지 정하는 부분

-   **Field Types (필드 유형)**: 저장될 데이터의 **종류**를 정의함.
    -   `CharField`: 글자 수 제한이 있는 짧은 문자열 (제목, 이름 등)
    -   `TextField`: 글자 수 제한이 없는 긴 텍스트 (본문 내용, 설명 등)
    -   `DateTimeField`: 날짜와 시간을 저장.

-   **Field Options (필드 옵션)**: 컬럼의 세부적인 **제약 조건**이나 동작을 설정함.
    -   `max_length=20`: 최대 길이를 20으로 제한. (무분별하게 긴 제목으로 도배하는 이슈 등등을 방지)
    -   `auto_now_add=True`: **최초 생성 시**의 시간이 자동으로 저장됨.
    -   `auto_now=True`: **수정될 때마다** 현재 시간으로 자동 업데이트됨.
    -   `null=True`: DB에 값이 `NULL`로 저장되는 것을 허용. (데이터가 비어있어도 된다는 뜻)
    -   `blank=True`: Form 유효성 검사에서 빈 값(empty)을 허용. (사용자가 입력 폼을 비워둬도 된다는 뜻)
    updated_at = models.DateTimeField(auto_now=True)


## 🚀 Migrations: 설계도를 실제 건물로!

`models.py`에 작성한 설계도를 실제 DB에 반영하는 과정이야. 코드로 관리되기 때문에 팀원들과 변경 내역을 공유하고 추적하기 아주 편함.

### 핵심 명령어 2가지

1.  **`python manage.py makemigrations`**
    -   **역할**: `models.py`의 변경 사항을 감지해서 **최종 설계도(migration 파일)**를 만드는 명령어.
    -   "Django야, 내가 바꾼 모델 코드 좀 보고 `0001_initial.py` 같은 최종 설계도 좀 만들어줘."

2.  **`python manage.py migrate`**
    -   **역할**: `makemigrations`로 만든 최종 설계도를 실제 DB에 적용하는 명령어.
    -   "이 최종 설계도대로 데이터베이스에 똑같이 만들어"

💡 **언제 Migration이 필요할까?**
`models.py` 파일에 필드를 추가, 수정, 삭제하는 등 **아주 작은 변화라도 생기면** 반드시 `makemigrations` -> `migrate` 순서로 DB와 싱크를 맞춰줘야 함

---

## 👨‍💻 Admin Site: 

Django가 기본으로 제공하는 강력한 **관리자 페이지**야. 코딩 없이 웹 화면에서 DB 데이터를 직접 보고, 만들고, 수정하고, 삭제(CRUD)할 수 있음

### 사용법

1.  **관리자 계정 생성**
    -   `python manage.py createsuperuser` 명령어로 관리자 계정을 만들기

2.  **모델 등록**
    -   `admin.py` 파일에 관리하고 싶은 모델을 등록
    ```python
    # articles/admin.py
    from django.contrib import admin
    from .models import Article

    # Article 모델을 관리자 페이지에 등록
    admin.site.register(Article)
    ```

이제 `localhost:8000/admin/`으로 접속해서 로그인하면, Article 데이터를 자유롭게 다룰 수 있음

---

## 🤫 SQLite와 .gitignore

-   **SQLite**: Django가 기본으로 사용하는 가볍고 설정이 쉬운 **파일 기반** 데이터베이스야. 개발 초기 단계에서 빠르게 테스트하기 좋음.

-   **`db.sqlite3`를 `.gitignore`에 추가해야 하는 이유**
    1.  **계속 바뀌는 파일이라서**: 개발 중 데이터를 추가/수정할 때마다 파일 내용이 바뀌어서 Git 관리를 피곤하게 만듦.
    2.  **팀원과 충돌하니까**: 각자 로컬 환경의 DB 내용은 다른데, 이걸 Git으로 공유하면 100% 충돌이 나.
    3.  **보안 문제**: 실제 사용자 정보 같은 민감 데이터가 포함될 수 있기 때문에 이걸 GitHub 같은 곳에 올리면 안됨 
    4.  **운영 환경에선 안 쓰니까**: 실제 서비스에서는 PostgreSQL처럼 더 안정적이고 강력한 DB를 사용함0 `db.sqlite3`는 개발용일 뿐.
