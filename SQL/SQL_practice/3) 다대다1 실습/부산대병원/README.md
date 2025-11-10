
SSAFY@DESKTOP-763H707 MINGW64 ~/Desktop/TIL/SQL/SQL_practice/3) 다대다1 실습/부산대병원 (master)
$ python -m venv venv

SSAFY@DESKTOP-763H707 MINGW64 ~/Desktop/TIL/SQL/SQL_practice/3) 다대다1 실습/부산대병원 (master)
$ source venv/Scripts/activate
(venv) 
SSAFY@DESKTOP-763H707 MINGW64 ~/Desktop/TIL/SQL/SQL_practice/3) 다대다1 실습/부산대병원 (master)
$ pip install ipython
(venv) 
SSAFY@DESKTOP-763H707 MINGW64 ~/Desktop/TIL/SQL/SQL_practice/3) 다대다1 실습/부산대병원 (master)
$ pip install django

$ pip install django-extensions

$ pip freeze > requirements.txt
(venv)

$ django-admin startproject MANYTOMANY .
(venv)

$ python manage.py startapp hospitals
(venv)



## settings.py
```python
INSTALLED_APPS = [
  # 설치한 앱
  'hospitals',
  # 설치한 패키지
  'django_extensions',
  # 기본적으로 장고가 제공하는 앱 
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

# 중략 ...



LANGUAGE_CODE = 'ko-kr'

TIME_ZONE = 'Asia/Seoul'

USE_I18N = True

USE_TZ = False

```
