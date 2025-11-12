# DRF 실습 1
[기존 Django 흐름](images/django_flow.png)
[DRF 전체 흐름](images/drf_flow.png)

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

# 5. app의 models.py 만들고 설계도 전하기
```python 
from django.db import models

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=10)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```
- 그리고 migrate까지

# 6. loaddata
$ python manage.py loaddata articles.json 해주기
- 이때 아까 세팅에서 설정한 USE_TZ=FALSE가 오류를 일으켜서 다시 True로 바꿔줌


# 7. 앱에 serializers.py 설정하기
```python
from rest_framework import serializers
from .models import Article

class ArticleListSerializer(serializers.ModelSerializer):
  class Meta:
    model = Article

    # 직렬화 하고자하는 필드 지정
    # 이때 쉼표 붙이게 되면 반드시 붙이기
    # created_at은 안 가져옴 안 쓰기 때문에
    # 홈페이지에서 쓸 serializer라 created_at, updated_at이 필요 없다.
    fields = (
        'id',
        'title',
        'content',
    )
```

# 8. 앱의 views.py 설정
- 404 : NOT FOUND
  - 찾을 수 없음
- 4XX : 클라이언트 에러
- 5XX : 서버 에러


이떄 articles/urls.py 에 urlpattern의 주석을 해제해준다. 그래도 파란 불 잘 들어옴

```python 
from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework import status
from .models import Article
from .serializers import ArticleListSerializer

# 404 : NOT FOUND
# 찾을 수 없음
# 4XX : 클라이언트 에러
# 5XX : 서버 에러

from django.shortcuts import get_object_or_404, get_list_or_404

# 게시글을 조회했는데 없으면 404 에러를 발생시킨다는 뜻

# object : 단일 객체 조회 
# 따라서 detail(상세 게시글) 조회

# list : 전체 객체 조회
# 따라서 전체 게시글 조회

@api_view(['GET', 'POST'])
def article_list(request):
  if request.method == 'GET':
    articles = get_list_or_404(Article) # 게시글을 조회했는데 없으면 404에러를 반환하겠다는 뜻
    # 모든 게시글 조회하고 --> 직렬화
    # many=True : 여러 개의 객체(다중 데이터)일 때 꼭 써주어야함
    serializer = ArticleListSerializer(articles, many=True) # 위의 articles 변수가 첫번째 인자로 들어가고, 두번째 인자로 many=True가 들어감
    
    return Response(serializer.data)
```

---
# post 방식

## 1. 앱의 serializers.py 작성
```python
class ArticleSerializer(serializers.ModelSerializer):
  class Meta:
    model = Article
    fields = '__all__'

```
## 2. 앱의 views.py 작성하기

```python
@api_view(['GET', 'POST'])
def article_list(request):

# 중략 ...

  elif request.method == 'POST':
    # request.data에는 title과 content가 들어가있음
    serializer = ArticleSerializer(data=request.data)

    # raise_exception=True : 유효하지 않을 경우 예외 발생
    if serializer.is_valid(raise_exception=True):
      serializer.save()
      # 데이터 생성을 성공하면 HTTP에 HTTP_201 메세지가 뜸
      # 데이터 생성을 실패하면 HTTP에 HTTP_400이 뜸
      return Response(serializer.data, status=status.HTTP_201_CREATED) # 생성되었다

```

---
# 단일 게시글 조회
## 1. 앱의 urls.py에 추가하기
```python
urlpatterns = [
    path('articles/', views.article_list),
    path('articles/<int:article_pk/', views.article_detail),
]

```

## 2. 앱의 views.py에 articles_detail 추가하기
```python

# GET : 조회
# DELETE : 삭제
# PATCH : 일부 수정 (PUT보다 유연성 높음)
# PUT : 전체 수정 (PATCH보다 안정성 높음)

@api_view(['GET', 'DELETE', 'PATCH'])
def article_detail(request, article_pk):
  # 1) 단일 게시글 조회
  article = get_object_or_404(Article, pk=article_pk)

  # 2) 단일 게시글 조회
  if request.method == 'GET':
    serializer = ArticleSerializer(article)
    return Response(serializer.data)

# 둘 다 단일게시글 조회인데 차이가 뭘까?
# 1) 얘는 DB가서 조회
# 2) 얘는 GET 방식일 때(?)
```
--- 
# 삭제 기능 구현
## 1. 앱의 views.py의 articles_detail에 삭제 기능 넣기
```python
@api_view(['GET', 'DELETE', 'PATCH'])
def article_detail(request, article_pk):
# ...
  # 게시글 삭제
  if request.method == 'DELETE':
    article.delete()
    # 상태 코드 HTTP_204: 반환할 콘텐츠가 없음
    return Response(status = status.HTTP_204_NO_CONTENT)
```
---
# 수정 기능 구현
## 앱의 views.py에 수정 기능 넣기 (fetch, put)
```python
@api_view(['GET', 'DELETE', 'PATCH'])
def article_detail(request, article_pk):

# 생략...
  
  # 게시글 수정
  if request.method == 'PATCH':
    # request.data : 클라이언트가 입력한 title 또는 content
    # partial=True : 부분 업데이트 허용한다
    serializer = ArticleSerializer(
      article, data=request.data, partial=True
    )

    if serializer.is_valid(raise_exception=True): # 유효하지 않을 경우 예외를 발생한다
      serializer.save()
      return Response(serializer.data)
    
    # 원래는
    # return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST) 해야하는데
    # raise_exception=True 떄문에 위처럼 소스 코드 안 작성해도 된다
```

---

