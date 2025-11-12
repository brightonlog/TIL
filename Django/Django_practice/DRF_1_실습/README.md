# 가상환경 설치
- $ pip install django
- $ pip install djangorestframework
  - 줄여서 DRF
  
- $ django-admin startproject CRUD .
  - 프로젝트 만들고
- $  python manage.py startapp articles
  - 앱설치하고
- $ pip freeze > requirements.txt

# 2. 프로젝트의 settings.py 설정
```python

INSTALLED_APPS = [
     # 우리가 설치한 앱
    'articles',
    # 우리가 설치한 패키지
    'rest_framework',
    # django의 기본 제공 앱
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
# ...

LANGUAGE_CODE = 'ko-kr'

TIME_ZONE = 'Asia/Seoul'

USE_I18N = True

USE_TZ = False
```