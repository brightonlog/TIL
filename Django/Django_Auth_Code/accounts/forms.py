from django.contrib.auth.forms import UserCreationForm

# 직접 참조 안 쓰고 간접 참조 쓸 것
# 직접 참조 from .models import User


# 간접 참조
from django.contrib.auth import get_user_model

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = get_user_model() # 간접 참조
        