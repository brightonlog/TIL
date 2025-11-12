from django.contrib import admin
from django.urls import path
from articles import views

# app_name = ? 
# 이제 더이상 할 필요 없다.
# 왜? template 안 쓸거니까

urlpatterns = [
    path('articles/', views.article_list),
]