from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from users.views import LoginView, SignUpView

app_name = "users"

urlpatterns = [
    path("signup/", SignUpView.as_view()),
    path("login/", LoginView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
]
