from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import ValidationError
from users.models import User


class SignUpSerializer(serializers.ModelSerializer):
    email = serializers.CharField(max_length=80)
    username = serializers.CharField(max_length=45)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = User
        fields = ["email", "username", "password"]

    def validate(self, attrs):

        email_exists = User.objects.filter(email=attrs["email"]).exists()

        if email_exists:
            raise ValidationError("Email has already been used")

        return super().validate(attrs)

    def create(self, validated_data):
        password = validated_data.pop("password")

        user = super().create(validated_data)

        user.set_password(password)

        user.save()

        Token.objects.create(user=user)

        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=80)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = User
        exclude = ["password", "last_login", "is_staff", "is_active", "date_joined", "groups"]

        read_only_fields = ["email", "username", "password"]
