from django.shortcuts import render, redirect


# auth는 Model Form을 안쓴다.
# built-in form 을 쓴다.
from django.contrib.auth.forms import (
    AuthenticationForm # 로그인을 위한 폼
)

from django.contrib.auth import login as auth_login

def login(request):
    # 로그인 버튼 눌렀을 때 (로그인 페이지를 띄울 때는 GET 방식)
    if request.method == "POST":
        # request.POST : 사용자가 입력한 ID, PASSWORD
        form = AuthenticationForm(request, request.POST) # 빌트인 폼
        if form.is_valid():
            # 유효성 검사 성공했으면, 로그인 처리
            # get_user() : 인증된 사용자의 객체
            auth_login(request, form.get_user())
            return redirect('articles:index')
        
    else: # 로그인 버튼을 누르기 전
        form = AuthenticationForm() # 빈 폼
    # GET 요청일 때
    context = {
            'form' : form
    }
    
    return render(request, 'accounts/login.html', context)

from django.contrib.auth import logout as auth_logout

# 로그아웃은 로그인 되어있을 때만 할 수 있다.


from django.contrib.auth.decorators import login_required
# 데코레이터 : 로그인하지 않은 상태에서 logout url로 접근하는 것을 방지
# 로그인 한 사용자만 로그아웃을 할 수 있음
@login_required
def logout(request):
    auth_logout(request)
    return redirect('articles:index')


from .forms import CustomUserCreationForm

def signup(request):
    # 1. 이미 회원인 경우
    # 2. 새로운 회원인 경우
    if request.user.is_authenticated:
        return redirect('articles:index')
    if request.method == "POST": # 회원가입 버튼 눌렀을 때
        form = CustomUserCreationForm(request.POST)
        if form.is_valid(): # 1. 유효성 검사
            user = form.save() # 2. DB에 저장
            auth_login(request, user) # 3. 로그인
            return redirect('articles:index')
        
    else: # submit 버튼 누르기 전 or 다른 요청일 때
        form = CustomUserCreationForm() # 빈 폼
    
    
    context = {
        'form': form
    }
    
    return render(request, 'accounts/signup.html', context)


@login_required
def delete(request):
    # request.user : 현재 로그인 되어있는 유저
    request.user.delete()
    
    return redirect('articles:index')

