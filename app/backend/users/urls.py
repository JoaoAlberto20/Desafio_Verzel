from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from users.views import LoginView, UserView

app_name = "users"

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("user/", UserView.as_view(), name="list-user"),
    path("refresh/token/", TokenRefreshView.as_view(), name="refresh-token"),
]
