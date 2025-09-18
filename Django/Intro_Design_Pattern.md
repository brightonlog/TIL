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
---
