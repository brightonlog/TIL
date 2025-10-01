from django import forms
from .models import Article

# form태그와 django ModelForm의 차이
# 사용자(클라이언트)로부터 입력받은 데이터를 바로 DB에 저장하는지 안하는지 차이
# form태그 사용해도 DB에 저장 가능, 단 수동으로 로직을 구현해야함
# ModelForm 왜 쓸까? 편하고, 유효성검사하기 용이해서

class ArticleForm(forms.ModelForm):
    # class Meta : 폼의 기본 구조를 자동으로 생성
    # css 적용 x ---> 위젯
    class Meta:
        model = Article
        # fields = ('title', 'content', 'created_at', 'updated_at', )
        fields = '__all__'
