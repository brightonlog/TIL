# 흐름
문제 
![alt text](image.png)
## 1. 앱의 views.py 수정
```py
from django.http import JsonResponse


@login_required
def likes(request, article_pk):
    # 단일 게시글 조회
    article = Article.objects.get(pk=article_pk)
    # 좋아요 <-> 좋아요 취소
    # 현재 로그인한 user가 이미 좋아요를 눌렀다면
    if request.user in article.like_users.all():
        # 좋아요 취소(user를 제거)
        article.like_users.remove(request.user)
        is_liked = False
    else:
        # 좋아요 추가(user를 추가)
        article.like_users.add(request.user)
        is_liked = True

    context = {
        'is_liked': is_liked
    }
    return JsonResponse(context)
```

## 2. 템플릿의 index 수정
```html
# articles > templates > articles > index.html
        {% comment %} 자바 스크립트에서 쓰기 위해 id 값 추가해야함 {% endcomment %}
        <form action="{% url "articles:likes" article.pk%}" method="POST" data-article-id="{{article.pk}}">
            {% csrf_token %}
            {% comment %} 좋아요 이미 눌렀으면 -> 좋아요 취소 {% endcomment %}
            {% if request.user in article.like_users.all %}
                <input type="submit" value="좋아요 취소" id="like-{{article.pk}}">
            {% else %} {% comment %} 좋아요 안 눌렀으면 -> 좋아요 {% endcomment %}
                <input type="submit" value="좋아요">
            {% endif %}

        </form>{% comment %} 좋아요 안 눌렀으면 -> 좋아요 {% endcomment %}

```
---
## 3. 템플릿 전체 수정
```html
{% extends "base.html" %}

{% load static %}

{% block content %}

    <h1>게시판</h1>

    {% comment %} 사용자가 인증 되어 있을 때(로그인 되어 있을 떄) {% endcomment %}
    {% if request.user.is_authenticated %}
    
      <h3>안녕하세요. {{user.username}}</h3>

      <a href="{% url "accounts:profile" user.username%}">내 프로필</a>

      {% comment %} GET 요청 {% endcomment %}
      <a href="{% url "accounts:update" %}">회원 정보 수정</a>

      {% comment %} POST 요청 {% endcomment %}
      <form action="{% url "accounts:delete" %}" method = "POST">
          {% csrf_token %}
          <input type="submit" value="회원탈퇴">
      </form>
    
      {% comment %} POST요청 {% endcomment %}
      <form action="{% url "accounts:logout" %}" method="POST">
        {% csrf_token %}
        <input type="submit" value="로그아웃">
        </form>

    <hr>
        <a href="{% url 'articles:create'%}">글쓰기</a>
    <hr>

    {% else %}

    {% comment %} GET 요청 {% endcomment %}
    <a href="{% url "accounts:signup" %}">회원 가입</a>

    {% comment %} GET요청 {% endcomment %}
    <a href="{% url "accounts:login" %}"> 로그인 </a>


    {% endif %}

    <article class = "article-container">


    {% comment %} DTL : for문 {% endcomment %}
    {% for article in  articles %}
        {% comment %} {{객체.속성}} {% endcomment %}
        <p>작성자 : 
            <a href="{% url "accounts:profile" article.user.username %}">
                {{article.user}}
            </a>
        </p>

        <p>글 id : {{article.pk}}</p>

        <a href="{% url "articles:detail" article.pk %}">
            <p>글 제목 : {{article.title}}</p>
        </a>

        <p>글 내용 : {{article.content}}</p>
        
        {% comment %} 자바 스크립트에서 쓰기 위해 id 값 추가해야함 {% endcomment %}
        <form action="{% url "articles:likes" article.pk%}" method="POST" data-article-id="{{article.pk}}">
            {% csrf_token %}
            {% comment %} 좋아요 이미 눌렀으면 -> 좋아요 취소 {% endcomment %}
            {% if request.user in article.like_users.all %}
                <input type="submit" value="좋아요 취소" id="like-{{article.pk}}">
            {% else %} {% comment %} 좋아요 안 눌렀으면 -> 좋아요 {% endcomment %}
                <input type="submit" value="좋아요" id="like-{{article.pk}}">
            {% endif %}

        </form>{% comment %} 좋아요 안 눌렀으면 -> 좋아요 {% endcomment %}

        {% comment %} <p>글 생성 시간 : {{article.created_at}}</p> {% endcomment %}
        <hr>
        {% endfor %}
        </article>
    {% comment %} axios를 쓰기 위해서는 cdn을 먼저 가져와야 한다 {% endcomment %}
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

    <script>
        // 1. querySelector ( 가져오기 )
        const articleContainer = document.querySelector('.article-container')
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value
        console.log(articleContainer)
    
        // 2. callback 함수 + 3. 이벤트 리스너
    
        articleContainer.addEventListener('submit', function (event){
            // submit 시 새로고침 방지
            event.preventDefault() 
            const articleId = event.target.dataset.articleId
    
            axios({
                method: 'post',
                url: `/articles/${articleId}/likes/`,
                // Django 공식문서 출신
                headers: {'X-CSRFToken': csrftoken},
            }) .then ((response) => {
                const isLiked = response.data.is_liked
                const likeBtn = document.querySelector(`#like-${articleId}`)
                if (isLiked === true){
                  likeBtn.value = "좋아요 취소"
                } else{
                  likeBtn.value = "좋아요"
                }
                console.log(response)
            }) .catch((error) =>{
                console.log(error) 
            })
        })
    
    
    
    </script>
    
</article>
{% endblock content %}
```