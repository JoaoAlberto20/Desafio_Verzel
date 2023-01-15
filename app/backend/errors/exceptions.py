from rest_framework.exceptions import AuthenticationFailed


class CustomAuthenticationFailed(AuthenticationFailed):
    def __init__(self, message, **kwargs):
        super().__init__(**kwargs)
        self.detail = {"message": message}
