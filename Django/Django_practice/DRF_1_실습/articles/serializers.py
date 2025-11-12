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

class ArticleSerializer(serializers.ModelSerializer):
  class Meta:
    model = Article
    fields = '__all__'