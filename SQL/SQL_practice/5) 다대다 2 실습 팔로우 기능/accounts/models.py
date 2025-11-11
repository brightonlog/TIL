from django.db import models

# Create your models here.

# AbstractUser : 자동으로 필드를 제공(로그인, 권한 관리 등)
from django.contrib.auth.models import AbstractUser


# ManyToManyField의 첫번째 인자로 'self'가 들어가면 자기 자신에서 역참조, 참조 관계가 다 있을 수 있음
# symmetrical=False
# => 내가 상대를 팔로잉했다고 상대가 나를 팔로우 한 건 아니니까
class User(AbstractUser):
    followings = models.ManyToManyField(
        'self', symmetrical=False, related_name = 'followers'
    )