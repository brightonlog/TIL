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
```py
# articles > templates > articles > index.html
