# 🗂️ Django - Model, Migrations, Admin

## 📅 2025.09.23 화

---

### ✅ 학습 목표

- [x] **Django Model 클래스를 이용해 DB 테이블 구조를 설계하고 "설계도" 역할을 설명할 수 있다.**
    - **답변:** Model 클래스는 데이터베이스 테이블의 **청사진(설계도)** 역할을 해. 파이썬 코드로 테이블에 어떤 컬럼(데이터)을 어떤 타입과 제약 조건으로 저장할지 명확하게 정의하는 거지. Django는 이 설계도를 보고 `makemigrations`와 `migrate` 명령어를 통해 실제 데이터베이스에 테이블을 만들어줘.
- [x] **다양한 Field type과 Field option을 지정해 컬럼의 데이터 유형과 제약 조건을 정의할 수 있다.**
- [x] **`python manage.py makemigrations` / `migrate` 두 단계로 모델 변경 사항을 안전하게 DB에 반영할 수 있다.**
- [x] **`admin.site.register()`로 모델을 Django Admin에 등록하여 웹 UI에서 게시글을 생성, 조회, 수정, 삭제 (CRUD) 할 수 있다.**
- [x] **Django 기본 DB 엔진인 SQLite의 특성과 `db.sqlite3`를 Git에서 제외해야 하는 이유를 설명할 수 있다.**

---

##  मॉडल (Model): 파이썬과 DB의 중간다리

Model은 개발자가 SQL을 잘 몰라도 파이썬 코드만으로 데이터베이스(DB)를 조작할 수 있게 해주는 **번역가** 같은 존재야. `models.py` 파일에 파이썬 클래스로 DB 구조를 짜면, Django가 알아서 DB와 소통해줘.

### Model Class: DB 테이블 설계도

DB 테이블을 정의하는 파이썬 클래스. `models.Model`을 상속받아서 만들어. 클래스 이름이 DB 테이블 이름이 되고, 클래스 변수들이 테이블의 컬럼(필드)이 돼.

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

테이블의 각 컬럼이 어떤 데이터를 담을지, 어떤 규칙을 가질지 정하는 부분이야.

-   **Field Types (필드 유형)**: 저장될 데이터의 **종류**를 정의해.
    -   `CharField`: 글자 수 제한이 있는 짧은 문자열 (제목, 이름 등)
    -   `TextField`: 글자 수 제한이 없는 긴 텍스트 (본문 내용, 설명 등)
    -   `DateTimeField`: 날짜와 시간을 저장.

-   **Field Options (필드 옵션)**: 컬럼의 세부적인 **제약 조건**이나 동작을 설정해.
    -   `max_length=20`: 최대 길이를 20으로 제한. (무분별하게 긴 제목으로 어뷰징하는 걸 막을 수 있지!)
    -   `auto_now_add=True`: **최초 생성 시**의 시간이 자동으로 저장됨.
    -   `auto_now=True`: **수정될 때마다** 현재 시간으로 자동 업데이트됨.
    -   `null=True`: DB에 값이 `NULL`로 저장되는 것을 허용. (데이터가 비어있어도 된다는 뜻)
    -   `blank=True`: Form 유효성 검사에서 빈 값(empty)을 허용. (사용자가 입력 폼을 비워둬도 된다는 뜻)
    updated_at = models.DateTimeField(auto_now=True)
