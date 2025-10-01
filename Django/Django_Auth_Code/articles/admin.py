from django.contrib import admin

# Register your models here.
from .models import Article

# admin.site에 Article 모델을 등록하겠다.
admin.site.register(Article)