from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request: Request, view: APIView) -> bool:
        return bool(
            request.user
            and (
                request.user.is_staff
                or (request.method in SAFE_METHODS and request.user.is_authenticated)
            )
        )
