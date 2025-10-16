# 🗂️ Web - Django 기초 및 가상 환경

## 📅 2025.09.18 목요일

---

## 📌 필수 명령어 모음 (Command Cheat Sheet)

### Git Bash (가상 환경 및 패키지 관리)

```bash
# 1. 가상 환경 생성 (venv라는 이름으로)
python -m venv venv

# 2. 가상 환경 활성화 (Windows)
source venv/Scripts/activate

# 3. 가상 환경 비활성화
deactivate

# 4. 설치된 패키지 목록 확인
pip list

# 5. 패키지 목록을 파일에 저장 (의존성 기록)
pip freeze > requirements.txt

# 6. 파일 기반으로 패키지 설치
pip install -r requirements.txt
```
---
### Django (프로젝트 및 서버 관리)

```bash
# Django 프레임워크 설치
pip install django

# 현재 폴더에 Django 프로젝트 생성
django-admin startproject <프로젝트이름> .

# 개발 서버 실행 (manage.py 파일이 있는 위치에서)
python manage.py runserver

# Django 앱 생성 (이름은 보통 복수형으로)
python manage.py startapp <앱이름>

# 개발 서버 종료 (터미널에서)
Ctrl + C
```
---
### ## 오늘의 TIL: Django 첫걸음 & 핵심 개념

#### **1. 웹의 동작 원리: 클라이언트와 서버**
* 웹은 기본적으로 **'요청'**과 **'응답'**으로 이루어져.
* **클라이언트**: "이 페이지 보여줘!"라고 요청하는 쪽. (예: 크롬 브라우저)
* **서버**: 요청을 받아서 처리하고, 결과(HTML 페이지 등)를 **응답**하는 쪽.
* **프론트엔드**는 사용자가 보는 화면을, **백엔드**는 서버의 실제 동작을 담당한다.

---

#### **2. 개발 필수품: 가상 환경 (venv)**
* **왜 써야 해?**
    * 프로젝트마다 필요한 라이브러리(패키지) 버전이 다를 때 **충돌을 막기 위해**.
    * 각 프로젝트를 위한 **'독립된 개발 공간'**을 만들어 준다고 생각하면 쉬워.
* **핵심 명령어**
    * 생성: `python -m venv venv`
    * 활성화: `source venv/Scripts/activate`
    * 패키지 목록 저장: `pip freeze > requirements.txt`
    * 목록으로 설치: `pip install -r requirements.txt`
* **⚠️ 가장 중요한 규칙**: `venv` 폴더는 용량이 크고 OS마다 환경이 다르므로, **`.gitignore`에 반드시 추가해서 Git에 올라가지 않도록 해야 한다.**

---

#### **3. Django 프로젝트 시작하기**
* **Django란?** 파이썬으로 웹 서버(백엔드)를 빠르고 편하게 만들도록 도와주는 **웹 프레임워크**.
* **프로젝트 생성 4단계**
    1.  **Django 설치**: `pip install django`
    2.  **프로젝트 생성**: `django-admin startproject firstpjt .` (마지막 `.`은 '현재 폴더'에 만들라는 뜻)
    3.  **서버 실행**: `python manage.py runserver` (`manage.py` 파일이 있는 곳에서 실행!)
    4.  **서버 종료**: 터미널에서 `Ctrl + C`

---

#### **4. Django의 요청과 응답 흐름 (MTV 패턴)**
* Django는 **MTV (Model, Template, View)** 라는 디자인 패턴으로 동작해.
* **사용자에게 HTML 페이지를 보내는 과정**
    1.  사용자가 특정 주소(URL)로 **요청**을 보낸다.
    2.  **`urls.py`**가 요청을 받고, 어떤 **View 함수**에게 일을 시킬지 연결해준다. (교통정리 담당)
    3.  **`views.py`**의 함수가 요청을 처리하는 **실제 로직**을 수행한다.
    4.  이 함수는 **`templates`** 폴더에 있는 HTML 파일에 필요한 데이터를 채워넣고, 완성된 페이지를 사용자에게 **응답**으로 보내준다.
