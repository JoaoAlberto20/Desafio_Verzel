from django.contrib.auth import authenticate
from rest_framework import generics, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from users.models import User
from users.serializers import SignInSerializers, SignUpSerializer
from users.tokens import create_jwt_pair_for_user


class SignUpView(generics.GenericAPIView):
    serializer_class = SignUpSerializer
    permission_classes: list = []

    def post(self, request: Request):
        data = request.data

        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            serializer.save()

            response = {"message": "User Created Successfully", "data": serializer.data}

            return Response(data=response, status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    serializer_class = SignInSerializers
    permission_classes: list = []

    def post(self, request: Request):
        email: str = request.data.get("email")
        password: str = request.data.get("password")

        isAuthenticated = authenticate(email=email, password=password)

        if isAuthenticated is not None:

            user = User.objects.get(email=email)
            serializer = self.serializer_class(user)

            tokens = create_jwt_pair_for_user(isAuthenticated)

            return Response(data={
                "tokens": tokens,
                "user": serializer.data,
            }, status=status.HTTP_200_OK)

        else:
            return Response(data={"message": "Invalid email or password"})

    def get(self, request: Request):
        content = {"user": str(request.user), "auth": str(request.auth)}

        return Response(data=content, status=status.HTTP_200_OK)
