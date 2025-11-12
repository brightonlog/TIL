from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework import status
from .models import Article
from .serializers import ArticleListSerializer, ArticleSerializer

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
  
  elif request.method == 'POST':
    # request.data에는 title과 content가 들어가있음
    serializer = ArticleSerializer(data=request.data)

    # raise_exception=True : 유효하지 않을 경우 예외 발생
    if serializer.is_valid(raise_exception=True):
      serializer.save()
      # 데이터 생성을 성공하면 HTTP에 HTTP_201 메세지가 뜸
      # 데이터 생성을 실패하면 HTTP에 HTTP_400이 뜸
      return Response(serializer.data, status=status.HTTP_201_CREATED) # 생성되었다