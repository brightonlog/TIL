from rest_framework import serializers

from .models import Article, Comment

# 홈페이지에서 쓸 시리얼라이저라 created_at, updated_at이 필요 없다.
class ArticleListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        # 직렬화 하고자 하는 필드를 지정
        fields = (
            'id',
            'title',
            'content',
        )

class ArticleSerializer(serializers.ModelSerializer):


    class CommentDetailSerializer(serializers.ModelSerializer):
        class Meta:
            model = Comment
            fields = (
                'id',
                'content',
            )
    # read_only = True : 읽기 전용
    # 1. 유효성 검사 제외
    # 2. 사용자로부터 입력 받지 않고 읽히기만 함
    comment_set = CommentDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Article
        fields = '__all__'



# url을 댓글(Comment)로 접근하면 article은 수정하거나 생성할 수 없다는 뜻(=읽기 전용). 따라서 읽기 전용이라는 뜻
class CommentSerializer(serializers.ModelSerializer):

    class ArticleTitleSerializer(serializers.ModelSerializer):
        class Meta:
            model = Article
            # 반드시 후행쉼표 넣어주기
            fields = ('title', )

    
    article = ArticleTitleSerializer(read_only = True)

    class Meta:
        model = Comment
        fields = '__all__'