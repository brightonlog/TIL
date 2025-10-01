from django.contrib import admin

# Register your models here.
from django.contrib.auth.admin import UserAdmin

from .models import User

# admin site에 등록하겠다. User모델과 UserAdmin
admin.site.register(User, UserAdmin)