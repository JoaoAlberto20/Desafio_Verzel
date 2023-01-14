from django.contrib.auth import authenticate
from django.forms.models import model_to_dict
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from users.serializers import LoginSerializer


class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer

    def post(self, request: Request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        print(serializer.data)

        user = authenticate(
            request,
            email=serializer.validated_data["email"],
            password=serializer.validated_data["password"],
        )
        if user is None or not user.is_active:
            raise AuthenticationFailed(("Invalid credentials"))

        user_data = model_to_dict(user)
        user_data.pop("password", None)

        token = RefreshToken.for_user(user)
        data = {"token": {"refresh": str(token), "access": str(token.access_token)}, "user": user_data}

        return Response(data)


class UserView(APIView):
    authentication_classes = (JWTAuthentication,)

    def get(self, request, *args, **kwargs):
        user = request.user
        user_data = model_to_dict(user)
        user_data.pop("password", None)
        print(user)
        return Response(user_data)
