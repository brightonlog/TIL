# 학습 목표

- HTTP의 무상태 특징을 이해하고 인증의 필요성을 안다
- 쿠키와 세션의 동작 워닐 및 데이터 저장 방식 차이를 안다
- Django 기본 User 모델의 한계를 알고 커스텀 모델을 만든다
- AbstractUser를 상속받고 AUTH_USER_MODEL을 설정한다
- AuthenticationForm과 login 함수로 로그인 기능을 구현한다
- 로그인 시 세션이 생성되고 쿠키로 ID가 전달됨을 안다.
- request.user 객체로 로그인 상태에 따라 다른 화면을 표시한다.

Cookie & Session

- HTTP
- 쿠키
- 세션

Django Authentication System

Custom User model

- User model 대체하기

Login

Template with Authentication data

참고

- 쿠키의 수명
- 쿠키와 보안
- Django에서의 세션 관리
- AuthenticationForm 내부 코드
- User 모델 대체하기 Tip

---

# Cookie & Session

## HTTP

HTML 문서와 같은 리소스들을 가져올 수 있도록 해주는 규약 (웹에서 모든 데이터 교환의 기초)

(웹에서 모든 데이터 교환의 기초)

![image.png](attachment:9bdad2f8-3467-47c9-bf44-9d20adbb5637:image.png)

## HTTP 특징

### 1. 비 연결 지향(connectionless)

- 서버는 요청에 대한 응답을 보낸 후 연결을 끊음
- 클라이언트는 서버와 서로 연결되어 있는 상태가 아님
- 

![image.png](attachment:a3de4d28-6da9-4dd3-b14b-ec619d1bc4d7:image.png)

![image.png](attachment:76015292-c254-458c-9727-0c8e28b9efda:8fe5957e-9f51-4ce7-93d7-21759db525d7.png)

### 2. 무상태

- 연결을 끊는 순간 클라이언트와 서버 간의 통신이 끝나며 상태 정보가 유지되지 않음
- 무상태의 의미
    - 장바구니에 담은 상품을 유지할 수 없음
    - 로그인 상태를 유지할 수 없음
    - 
    
    ![image.png](attachment:447c9c51-a002-4280-82ac-d2d4d9c859e0:image.png)
    

---

## 쿠키

**서버**가 **사용자의 웹 브라우저**에 전송하는 작은 데이터 조각

내 정보가 담긴 쿠키~~~ 주면 내가 누구누구인지 알 수 있음

이를 통해 서버는 ‘나는 이전에 이 사이트에 방문했었고, 로그인도 했었어”와 같이 사용자를 기억하고 식별 가능

### 쿠키 특징

- 서버가 사용자의 웹 브라우저에 전송하는 작은 데이터 조각
- 사용자 인증, 추적, 상태 유지 등에 사용되는 데이터 저장 방식
- key-value 형식의 데이터

### 쿠키 사용 예시

- 로그인 유지(세션 관리)
- 장바구니
- 언어, 테마 등 사용자 설정 기억

### 쿠키 동작 예시

1. 웹 브라우저가 웹 서버에 웹 페이지를 요청
2. 웹 서버는 요청된 페이지와 함께 쿠키를 포함한 응답을 브라우저에게 전송
3. 브라우저는 받은 쿠키를 저장소에 저장하고, 쿠키의 속성(만료 시간, 도메인, 주소 등)도 함께 저장
4. 이후 브라우저가 같은 웹 서버에 웹 페이지를 요청할 떄, 저장된 쿠키 중 해다 ㅇ요청에 적용 가능한 쿠키를 포함하여 함께 전송
5. 웹 서버는 받은 쿠키 정보를 확인하고, 필요에 따라 사용자 식별, 세션 관리 등을 수행
6. 웹 서버는 요청에 대한 응답을 보내며, 필요한 경우 새로운 쿠키를 설정하거나 기존 쿠키를 수정할 수 있음



### 쿠키를 이용한 장바구니

1. 장바구니에 상품 담기
2. 서버는 응답과 함께 Set-Cookie 응답 헤더를 브라우저에 전송


1. Cookie 데이터 자세히 확인
    - key - value 형식의 데이터
    - 단순히 값만 저장하는 것이 아니라, 여러 속성을 제어할 수 있음
    - 하나의 웹사이트에서 많은 수의 쿠키를 동시에 사용
    - request Cookies & Response Cookies 탭을 보면 쿠키의 양방향 통신 특징을 볼 수 있음
      
    
2. 메인페이지 이동 - 장바구니 유지 상태 확인
3. 개발자 도구 - Application 탭 -Cookies
    - 마우스 우측 버튼 - Clear - 새로고침 - 장바구니가 빈 것을 확인

### 쿠키의 작동 원리와 활용

1. 쿠키 저장 방식
    - 브라우저(클라이언트)는 쿠키를 key-value의 데이터 형식으로 저장
    - 쿠키에는 이름, 값, 외에도 만료 시간, 도메인, 경로 등의 추가 속성이 포함 됨
2. 쿠키 전송 과정
    - 서버는 HTTP 응답 헤더의 Set-Cookie 필드를 통해 클라이언트에게 쿠키를 전송
    - 브라우저는 받은 쿠키를 저장해두었다가, 동일한 서버에 재요청 시 HTTP 요청 Header의 Cookie 필드에 저장된 쿠키를 함께 전송
3. 쿠키의 주요 용도
    - 두 요청이 동일한 브라우저에서 들어왔는지 아닌지를 판단할 때 주로 사용됨
    - 이를 이용해 사용자의 로그인 상태를 유지할 수 있음
    - 상태가 없는(stateless) HTTP 프로토콜에서 상태 정보를 기억시켜주는 역할

⇒ 서버에게 ‘나 로그인 된(인증된) 사용자야!’라는 인증 정보가 담긴 쿠키를 매 요청마다 계속 보내는 것

### 쿠키 사용 목적

1. 세션 관리
- 로그인, 아이디 자동 완성, 공지 하루 안 보기, 팝업 체크, 장바구니 등의 정보 관리
1. 개인화
- 사용자 선호 설정(언어 설정, 테마 등) 저장
1. 추적, 수집
- 사용자 행동을 기록 및 분석
- 쿠키는 탈취될 수 있으니 비밀번호 같은 민감 정보는 절대 저장하지 말자~~!
- 쿠키는 모든 요청에 포함되어 전송되니까, 쿠키를 작게 만들어야 사이틋 ㅓㅇ능에 유리함

---

## 세션

서버 측에서 생성되어 클라이언트와 서버 간의 상태를 유지, 상태 정보를 저장하는 데이터 저장 방식

- 로그인과 같은 **중요 데이터**를 클라이언트 X **서버 O** 쪽에 저장하고 유지하는 기술
- 서버는 사용자 구분을 위해 고유한 세션 ID를 발급하고, 이 ID만 쿠키에 담아 클라이언트에 보내 사용자를 식별
- 실제 데이터는 서버에만 보관되므로 쿠키만 사용하는 방식보다 훨씬 보안에 유리하고, 사용자의 로그인 상태를 안전하게 유지하는 데 주로 사용됨

### 세션 작동 원리

1. 클라이언트가 로그인 후 인증에 성공하면 서버가 session 데이터를 생성 후 저장
2. 생성된 session 데이터에 인증할 수 있는 session id를 발급
3. 발급한 session id를 클라이언트에게 응답 (데이터는 서버에 저장, 열쇠만 주는 것)
4. 클라이언트는 응답 받은 session id를 쿠키에 저장
5. 클라이언트가 다시 동일한 서버에 접속하면 요청과 함께 쿠키(session id가 저장된)를 서버에 전달
6. 쿠키는 요청 때마다 서버에 함께 전송 되므로 서버에서 session id를 확인해 로그인 되어있다는 것을 계속해서 확인하도록 함
7. 사용자의 요청을 처리하고 응ekq

### 세션 특징

- **서버 측에서 생성**되어 클라이언트와 서버 간의 상태를 유지
    - 서버의 메모리나 데이터 베이스에 저장되므로, **서버 리소스를 사용**(효율적 관리 필요)
- 상태 정보를 저장하는 데이터 저장 방식
- 세션 데이터를 쿠키에 담아 매 요청 시마다 세션 데이터를 함께 보냄
- 세션은 영구적으로 유지되지 않음
- 중요한 데이터를 저장하니까 보안 신경쓰기!
- 공격자가 세션 id를 탈취하면, 해당 사용자인 것처럼 위장해서 서버에 접근이 가능하므로 유의할 것~!

### 세션 정리

1. 서버 측에서는 세션 데이터를 생성 후 저장하고, 이 데이터에 접근할 수 있는 세션 ID를 생성
2. 이 ID를 클라이언트 측으로 전달하고, 클라이언트는 쿠키에 이 ID를 저장
3. 이후 클라이언트가 같은 서버에 재 요청 시마다 저장해뒀던 쿠키도 요청과 함께 전송
    - 로그인 상태 유지를 위해 로그인 되어있다는 사실을 입증하는 데이터를 매 요청마다 계속해서 보내는 것

예시) SWEA 자꾸 로그아웃 되어있는 것 → SWEA의 세션 유지 시간이 무척 짧아서 자꾸만 세션이 완료되는 것임

### 쿠키와 세션의 목적

- 클라이언트와 서버 간의 상태 정보를 유지하고 사용자를 식별하기 위해 사용

---

# Django Authentication System

## 인증의 필요성

- 클라이언트와 서버 간의 상태 정보를 유지하기 위해 쿠키와 세션을 사용
- 클라이언트와 서버는 각기 다른 사용자를 식별해야하는 상태
- 그래서 사용자를 식별하기 위해 필요한 과정이 바로 ‘인증(Authentication)’
- 다양한 인증이 있음
    - 아이디와 비번
    - 소셜 로그인(OAuth)
    - 생체 인증
- Django에서는 사용자 인증과 관련된 가장 중요하고 기본적인 뼈대를 제공(D.A.S)
    - 인증을 구현하는 것보다는, 이미 구현된 인증을 활용한다는 걸 명심하기 (구현은 넘나리 어려운 것)

## Django Authentication System

Django에서 사용자 인증과 관련된 기능을 모아 놓은 시스템

- 인증에 중요한 기본적인 기능을 제공
    - User Model : 사용자 인증 후 연결될 User Model 관리
    - Session 관리 : 로그인 상태를 유지하고 서버에 저장하는 방식을 관리
    - 기본 인증(ID/Password): 로그인/로그아웃 등 다양한 기능을 제공
- ⇒ Django Authentication System을 활용해 로그인/로그아웃/회원가입/회원정보수정 등 다양한 기능들을 구현해보자!

## 기본 User Model의 한계

- 우리는 article밖에 안 만들었는데, admin을 통해서 user모델을 쓰고 있었음을 알 수 있음.
- 이 기본 User 모델은 username, password 등 제공되는 필드가 매우 제한적
- email ⇒ 선택필드
- 근데 요즘엔 email을 아이디로 하는 데가 많지 않나. 아이디를 이메일로 삼고 싶을 때, user모델을 그냥 쓰면 제한적이라 못 쓴다.



### User Model 대체의 필요성


---

# Custom User model

## User model 대체하기

### 사전 준비

1. 두번째 app accounts 생성 및 등록
2. auth와 관련한 경로나 키워드들을 django **내부적으로 accounts라는 이름으로 사용하고 있어서 되도록 ‘accounts’로 지정하쇼**

```python
# accounts/urls.py
from django.urls import path
from . import views

app_name = 'accounts'
urlpattern = []
```

```python
# crud/urls.py
urlpatters = [
	...,
	path('accounts/', include('accounts.urls')),
	]
```

### Custom User Model로 대체하기

1. AbstractUser 클래스를 상속받는 커스텀 User 클래스 작성

⇒ 기존 User 클래스도 AbstractUser를 상속받기 때문에 커스텀 User 클래스도 기존 User 클래스와 완전히 같은 모습을 가지게 됨

```python
# accounts/models.py
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
pass
```


1. django 프로젝트에서 사용하는 기본 User 모델 → 우리가 커스텀한 User 모델로 사용할 수 있도록 AUTH_USER_MODEL 값을 변경
    - 수정 전 기본 값은 ‘auth.User’
- accounts 앱에 작성한 User 모델을 기본 모델로 설정

```python
# settings.py
AUTH_USER_MODEL = 'accounts.User'
```


1. admin site에 대체한 User 모델을 등록하자~~~
    - 기본 User 모델이 아니기 때문에 등록하지 않으면 admin 페이지에 출력되지 않기 때문
    
    ```python
    #accounts/admin.py
    from django.contrib import admin
    from djang.contrib.auth.admin import UserAdmin
    from .models import User
    
    admin.site.register(User, UserAdmin)
    ```
    

---

# AUTH_USER_MODEL

Django 프로젝트의 User를 나타내는 데 사용하는 모델을 지정하는 속성

## 주의!

**Django는 프로젝트 중간에 AUTH_USER_MODEL을 변경하는 것을 강력하게 권장하지 않음**

→ 이미 프로젝트가 진행되고 있을 경우 데이터베이스 초기화 후 진행

## 사용하는 User 테이블의 변화

accounts에 만든 커스텀 유저 모델이 DB에 반영됨



## 프로젝트를 시작하며 반드시 User 모델을 대체해야 함

- 지금 당장 필요 없어도 만드세요. 나중에 닉네임 등 필드를 추가하기가 매우 쉬워집니다.
- 


---

# Login

- 클라이언트와 서버 간의 상태 정보를 유지하기 위해서 쿠키와 세션을 사용
- 클라이언트와 서버는 각기 다른 사용자를 식별해야 하는 상태
- 서버에 ‘나’임을 인증하는 과정이 바로 로그인
- ⇒ 로그인은 인증(id/password)를 완료하고, Session을 만들고 클라이언트와 연결하는

## 로그인은 CRUD에서 무엇?

세션을 만들어야하므로 CREATE다!

이때 CREATE는 어제 배운 바에 따르면, CREATE는 POST방식과 관련 있다

로그인은 결국 GET과 POST를 둘 다 쓰기 때문에 어제 배운 NEW-와 CREATE함수 합쳐서 쓰는 거 그거 쓰면 된다


## 로그인 페이지 작성

### 1. 로그인 경로 URL 생성

```python
# accounts/urls.py
app_name = 'accounts'
urlpatterns = [
	path('login/', views.login, name='login'),
	]
```

### 2. AuthenticationForm 사용

- **AuthenticationForm 은 로그인 입력 받을 때 쓴다! 받아쓰기 백 번!**
- …/accounts/login/ url로 요청이 들어왔을 때 실행할 login 함수 작성
- 로그인 인증에 사용할 데이터를 입력받는 빌트인 form (AuthenticationForm) 사용


```python
# accounts/views.py
from django.contrib.auth.forms import AuthenticationForm

def login(reuqest):
	if request.method == 'POST':
		pass
	else:
		form = AuthenticationForm()
	context = {
		'form': form,
	}
	return render(request, 'accounts/login.html', context)
```

### AuthenticationForm

- 사용자로부터 입력을 받는 로그인 상황에서는 ModelForm이 아니라 일반 Form임!
- 왜냐면 ModelForm은 정보를 받아서 DB 테이블에 저장함!
- Form은 그냥 받아서 유효성 검사를 함
- 이건 로그인 하는 거지, 정보를 받아서 테이블에 저장(회원가입)하는 게 아님
- 회원가입할 때 쓰는 form이 따로 있음
- 따라소 Auth웅앵웅은 일반 Form이기 때문에 사용자를 생성하거나 수정하는 용도가 아닌 인증하는 역할만 수행함


### 3. 로그인 페이지 작성 3

- 로그인 정보를 서버에 안전하게 전송하기 위해 ‘post’방식 사용
- CSRF 공격을 방지하기 위해 csrf_token 작성
- 서버로부터 전달받은 AuthenticationForm을 화면에 출력

```python
# accounts/login.html
<h1>로그인</h1>
<form action="{% url 'accounts:login' %}" method="POST">
	{% csrf_token %}
	{{ form }}
	<input type="submit">
</form>
```

### 4. login 함수

사용자가 입력한 로그인 정보를 입력받는 로직을 POST 조건문에 작성

- 입력받은 정보를 기반으로 로그인하여 세션을 만드는 login 함수 활용
- 근데 login함수가 우리가 정의한 login 함수랑 이름이 겹쳐서 import 해오는 login 함수(로그인해서 세션 만드는) 얘의 닉네임을 auth_login으로 지정해

```python
# accounts/views.py
from Django.shortcuts import render, redirect
from Django.contrib.auth import login as auth_login

def login(request):
	if request.method == "POST":
		form = AuthenticationForm(request, request.POST)
		# form = AutehnticationForm(request, data = request.POST_
		if form.is_valid():
			auth_login(request, form.get_user())
			return redirect('articles:index')
		else:
			form = AutehnticationForm()
		context = {
			'form':form,
			}
		return render(request, 'accounts/login.html', context)
```

- 예전에 한 내용의 반복의 반복임


### login(request, user)

- AuthenticationForm을 통해 인증된 사용자를 로그인 하는 함수
    - request
        - 현재 사용자의 세션 정보에 접근하기 위해 사용
    - user
        - 어떤 사용자가 로그인 되었는지를 기록하기 위해 사용

### get_user()

- AuthenticationForm의 인스턴스 메서드
- → 유효성 검사를 통과했을 경우, 로그인 한 사용자 객체를 반환

## 세션 데이터 확인하기

### 1. 로그인 후 발급받은 세션 확인

- django_session 테이블에서 확인

### 2. 브라우저에서 확인

- 개발자 도구 - Application - Cookies


