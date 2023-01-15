from rest_framework import exceptions
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError

from .exceptions import CustomAuthenticationFailed


def custom_exception_handler(exc, context):

    if isinstance(exc, (InvalidToken, TokenError)):
        return Response({"menssage": "Token inválido ou expirado"})

    elif isinstance(exc, CustomAuthenticationFailed):
        return Response(exc.detail, status=exc.status_code)

    return exceptions.exception_handler(exc, context)
