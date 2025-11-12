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

# 3. 프로젝트의  urls.py 만들기
```python 
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('articles/urls.py'))
]

```

# 4. app의 urls.py 만들기

```python
# articles>urls.py
from django.contrib import admin
from django.urls import path
from articles import views

# app_name = ? 
# 이제 더이상 할 필요 없다.
# 왜? template 안 쓸거니까

urlpattenrs = [
    path('articles/', views.article_list),
]
```