from rest_framework.permissions import BasePermission


class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in ("POST", "PUT", "PATCH", "DELETE"):
            return request.user.is_staff
        return True
