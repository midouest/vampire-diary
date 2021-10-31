from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser, SAFE_METHODS


class IsAdminOrReadOnly(IsAdminUser):
    def has_permission(self, request: Request, view: APIView) -> bool:
        is_admin = super().has_permission(request, view)
        return is_admin or request.method in SAFE_METHODS
