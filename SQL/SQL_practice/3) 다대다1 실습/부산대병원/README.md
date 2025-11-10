
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


## models.py
```python
from django.db import models

# Create your models here.
class Doctor(models.Model):
  name = models.TextField()
  def __str__(self):
    return f'{self.pk}번 의사 {self.name}'
  


# 의사와 환자간의 M:N 관계를 Reservation 모델을 통해 관리할게 ~!
# => throug='Reservation'
class Patient(models.Model):
  doctors = models.ManyToManyField(Doctor, through='Reservation')
  name = models.TextField()
  def __str__(self):
    return f'{self.pk}번 환자 {self.name}'

class Reservation(models.Model):
  # 의사가 이 병원 그만두면 레코드 자체가 없어진다는 뜻
  doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)  
  # 환자가 사망하면 레코드 자체가 없어진다는 뜻
  patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
  symptom = models.TextField()
  reserved_at = models.DateTimeField(auto_now_add=True)
  ```