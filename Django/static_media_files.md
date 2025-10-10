# 🗂️ Django - Static & Media Files

## 📅 2025.10.16 목

---

### ✅ 학습 목표

-   [ ] **정적 파일과 미디어 파일의 차이점을 명확히 설명할 수 있음.**
-   [ ] **Django에서 정적 파일의 역할과 처리 과정을 이해하고, CSS, JS, 이미지 파일을 프로젝트에 적용할 수 있음.**
-   [ ] **`STATICFILES_DIRS`를 설정하여 여러 경로에 있는 정적 파일을 효율적으로 관리할 수 있음.**
-   [ ] **Django에서 미디어 파일의 처리 과정을 이해하고, 사용자가 업로드하는 파일을 서버에 저장하고 관리할 수 있음.**
-   [ ] **`MEDIA_ROOT`와 `MEDIA_URL`을 설정하여 업로드된 파일을 사용자에게 보여줄 수 있음.**
-   [ ] **`ImageField`와 `ModelForm`을 활용하여 이미지 업로드 기능을 구현할 수 있음.**

---

## 🖼️ 정적 파일 (Static Files): 미리 준비된 식당 메뉴판

**정적 파일**은 서버에서 변경되지 않고 **고정적으로 제공되는 파일**임. 마치 식당에 미리 인쇄된 메뉴판처럼, 누가 요청하든 항상 같은 내용(CSS, JavaScript, 로고 이미지 등)을 보여줌.

### 웹 서버와 정적 파일의 관계

웹 서버의 기본 역할은 도서관 사서처럼, 요청받은 **주소(URL)**에 해당하는 **자원(Resource)**을 찾아서 응답해주는 것임. 정적 파일은 웹 서버가 제공하는 가장 기본적인 자원임.

-   **핵심 원리**: 내 컴퓨터에 파일이 있다고 해서 웹에 바로 보이는 게 아님. 외부 사용자(브라우저)가 파일을 찾아올 수 있도록 반드시 **고유한 웹 주소(URL)**라는 문패를 달아줘야 함.



### Django 정적 파일 설정

1.  **기본 경로**: Django는 각 `app` 폴더 안의 `static`이라는 폴더를 정적 파일의 기본 저장소로 인식함. (`app/static/`)

2.  **`STATIC_URL`**: 정적 파일에 접근하기 위한 **웹 주소 별명(접두사)**임.
    -   `settings.py`에 `STATIC_URL = '/static/'`으로 설정되어 있으면, 웹에서는 `/static/`으로 시작하는 주소로 정적 파일을 요청함.

3.  **Template에서 사용법**:
    -   `{% load static %}`: 템플릿 최상단에 이 태그를 선언해서 'static 관련 태그를 사용하겠다'고 알려줌.
    -   `{% static '경로' %}`: 이 태그가 `STATIC_URL`을 기준으로 실제 파일의 전체 URL을 자동으로 계산해 줌.
        ```html
        <img src="{% static 'images/logo.png' %}" alt="Logo">
        ```

### `STATICFILES_DIRS`: 외부 창고 주소록

프로젝트 전반에서 사용되는 파일(Bootstrap 등)을 각 `app`에 두는 건 비효율적임. 이럴 때 **프로젝트 최상위**에 `static` 폴더를 만들고, 이 폴더의 위치를 Django에게 알려주는 설정이 `STATICFILES_DIRS`임.

-   마치 기본 도서관 외에 책을 보관하는 **외부 창고들의 주소 목록**을 알려주는 것과 같음.
    ```python
    # settings.py
    STATICFILES_DIRS = [
        BASE_DIR / 'static',
    ]
    ```

---

## 📂 미디어 파일 (Media Files): 손님이 직접 쓰는 방명록

**미디어 파일**은 **사용자가 웹을 통해 직접 업로드하는 파일**임. 사이트 운영 중에 계속해서 생성되고 변경되는 동적인 파일이라는 점에서 정적 파일과 구분됨. (e.g., 게시글 첨부 이미지, 프로필 사진)

### 이미지 업로드 구현

#### 1. `settings.py` 설정

-   **`MEDIA_ROOT`**: 업로드된 파일이 **서버 컴퓨터의 어디에 저장될지**를 정하는 실제 경로. '실제 파일 창고' 주소임.
-   **`MEDIA_URL`**: `MEDIA_ROOT`에 저장된 파일에 **어떤 웹 주소로 접근할지**를 정하는 URL 별명(접두사).

    ```python
    # settings.py
    MEDIA_URL = '/media/'
    MEDIA_ROOT = BASE_DIR / 'media'
    ```


-   **`urls.py` 설정**: 개발 환경에서 사용자가 올린 미디어 파일을 보려면, `MEDIA_URL`로 요청이 왔을 때 `MEDIA_ROOT`에서 파일을 찾아 제공하라는 설정을 `urls.py`에 추가해야 함.
    ```python
    # project/urls.py
    from django.conf import settings
    from django.conf.urls.static import static

    urlpatterns = [
        # ... 기존 url들 ...
    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    ```

#### 2. `models.py` - `ImageField` 사용

-   `ImageField`는 이미지 파일 업로드를 위한 모델 필드임.
-   **중요**: DB에는 이미지 파일 자체가 아니라, `upload_to` 경로를 기준으로 한 **파일의 경로(문자열)만 저장**됨. 실제 파일은 `MEDIA_ROOT`에 저장됨.
    ```python
    # models.py
    class Article(models.Model):
        # ...
        # MEDIA_ROOT/images/ 경로에 파일이 저장됨
        image = models.ImageField(upload_to='images/', blank=True)
    ```

#### 3. Form & Template 수정

-   `<form>` 태그에 `enctype="multipart/form-data"` 속성을 추가해야 파일(이미지, 동영상 등)을 전송할 수 있음.
    ```html
    <form action="..." method="POST" enctype="multipart/form-data">
      {% csrf_token %}
      {{ form.as_p }}
      <input type="submit">
    </form>
    ```


#### 4. `views.py` 수정

-   View 함수에서 텍스트 데이터는 `request.POST`로, **파일 데이터는 `request.FILES`**로 들어옴.
-   `ModelForm`을 생성할 때 이 두 가지를 모두 넘겨줘야 함.

    ```python
    # views.py
    def create(request):
        if request.method == 'POST':
            # request.POST(텍스트 데이터), request.FILES(파일 데이터)를 함께 넘김
            form = ArticleForm(request.POST, request.FILES)
            if form.is_valid():
                article = form.save()
                return redirect('articles:detail', article.pk)
        # ...
    ```

#### 5. 업로드 이미지 보여주기

-   `ImageField`에 저장된 객체는 `.url` 속성을 통해 해당 파일의 웹 주소(`MEDIA_URL` 기준)를 얻을 수 있음.
    ```html
    {% if article.image %}
      <img src="{{ article.image.url }}" alt="{{ article.image }}">
    {% endif %}
    ```
