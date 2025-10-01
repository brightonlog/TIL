from django.shortcuts import render, redirect

# Create your views here.

from .models import Article

def index(request):
    # QuerySet API -> 전체데이터조회
    articles = Article.objects.all()

    context = {
        'articles': articles,
    }

    # 단순 조회목적, GET방식이면 render
    # 생성, 수정, 삭제 POST방식이면 redirect
    return render(request, 'articles/index.html', context)

# 단일 게시글 페이지를 렌더링
def detail(request, pk):
    # QuerySet API -> 단일게시글조회 : get
    article = Article.objects.get(pk=pk)
    context = {
        'article' : article
    }
    return render(request, 'articles/detail.html', context)


from .forms import ArticleForm

def create(request):
    # 폼을 다 작성하고, 게시글 생성 버튼을 눌렀을 때
    if request.method == 'POST':
        form = ArticleForm(request.POST)
        # 유효성 검사
        # 1. 모든 필수 필드가 다 채워져 있는지
        # 2. 입력된 데이터가 필드의 조건(ex) 데이터 형식, 길이 제한)을 만족하는지
        if form.is_valid():
            article = form.save() # DB에 저장
            # DB 건드린다 -> redirect
            return redirect('articles:detail', article.pk)

    # POST방식을 제외한 모든 경우
    # 게시글 생성 버튼을 누르기 전 또는 다른 버튼을 눌렀을때
    else:
        form = ArticleForm() # 아무것도없는 빈폼
    # GET요청인 경우 -> 홈페이지에서 create 버튼 눌렀을 때
    context = {
        'form': form
    }
    return render(request, 'articles/create.html', context)



def delete(request, pk):
    # 먼저 조회
    article=Article.objects.get(pk=pk)
    # 조회 후 삭제
    article.delete()
    # render? redirect?
    # DB를 건든다. POST방식이다. redirect
    return redirect('articles:index')



def update(request, pk):
    # create와 update의 차이 update는 조회 먼저 하고 수정
    article = Article.objects.get(pk = pk)
    # 게시글 수정 버튼 눌렀을 떄
    if request.method == 'POST':
        # instance=article : 기존 게시글의 데이터를 가져온다.
        form = ArticleForm(request.POST, instance=article)
        if form.is_valid():
            form.save()
            return redirect('articles:detail', article.pk)
    # 게시글 수정 버튼 누르기 전 또는 다른 버튼 눌렀을 때
    else:
        form = ArticleForm(instance=article)
    # GET요청
    context = {
        'article': article,
        'form': form # 기존에 있던 데이터
    }

    return render(request, 'articles/update.html', context)