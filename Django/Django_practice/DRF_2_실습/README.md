# [Today I'll Learn . . .](images/TIL.png)
# GET method

# 1. 앱의 Comment 모델 정의
```python
class Comment(models.Model):
    # 1:N 관계
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```































## 댓글 목록 조회를 위한 CommentSerializer 정의
```python
# 앱의 serializers.py 파일 수정

class CommentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Comment
        fields = '__all__'
```



# 전체&단일 댓글 조회
## 앱의 views.py
```python
@api_view(['GET'])
def comment_list(request):
    # 1. 전체 댓글 조회
    comments = Comment.objects.all()
    # 2. 전체 댓글 쿼리셋 데이터를 직렬화
    serializer = CommentSerializer(comments, many=True)
    # 3. 가공된 데이터 덩어리에서 json 데이터를 추출
    return Response(serializer.data)


# 단일 댓글 조회
@api_view(['GET'])
def comment_detail(request, comment_pk):
    # 1. 단일 댓글 조회
    comment = Comment.objects.get(pk=comment_pk)
    # 2. 단일 댓글 데이터를 직렬화
    serializer = CommentSerializer(comment)
    # 3. 가공된 데이터 덩어리에서 json 데이터를 추출
    return Response(serializer.data)
```

---
## 댓글 생성

### 외래키 데이터를 유효성 검사에서 제거하자
1. 외래키 데이터를 유효성 검사에서 제거
2. 최종 제공 데이터에는 포함시킴
=> 읽기 전용 필드 설정 필요


[유효성 검사](images/유효성_검사.png)
지금 400 에러가 뜬 상태
- 왜?
  - 별표친 지점에서 article이 존재하지 않기 때문.
  - 전체 필드를 다 검사해야하는데, article이 비어있고, 그리고 별표 코드를 지나 아래에서 article이 들어오는 상황임 (저장 전에 is_valid 검사를 해버리는 게 문제임)
- 해결법은?
  - 검사 리스트에서 외래키를 제외시켜야함.
- 설명
  - 지금 검사 리스트에 외래키가 들어가버린 상황임. 그런데 외래키는 저기서 볼 수가 없음.
  - 애초에 우리가 보는 건 댓글 데이터가 잘 들어왔는지 유효성 검사하는 건데,
  - 외래키 데이터는 사용자가 주는 게 아니므로 유효성 검사에 들어가야할 대상이 아님.
    - 유효성 검사는 들어오는 데이터가 유효한지 검사하는 것임.
  - 따라서 검사 목록에서 외래키를 빼야한다.
  
### 외래키가 왜 검사 목록에 들어갔나?
```python
class CommentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Comment
        fields = '__all__'
```
fields를 all로 설정하다보니 쏙 들어감

따라서

```python
class CommentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('article')
```
- 이렇게 데이터를 전송 받은 시점에
- 1. 유효성 검사에서 제외시키고,
- 2. 데이터 조회 시에는 출력하는 필드를 넣어줘야함
- => 읽기 전용 필드
- 이렇게 하면 is_valid 하는 대상에서 빠ㅠ 짐