from dj_rest_auth import serializers
from django.contrib.auth import get_user_model


UserModel = get_user_model()


class UserDetailsSerializer(serializers.UserDetailsSerializer):
    class Meta:
        model = UserModel
        extra_fields = []
        if hasattr(UserModel, "USERNAME_FIELD"):
            extra_fields.append(UserModel.USERNAME_FIELD)
        if hasattr(UserModel, "EMAIL_FIELD"):
            extra_fields.append(UserModel.EMAIL_FIELD)
        if hasattr(UserModel, "first_name"):
            extra_fields.append("first_name")
        if hasattr(UserModel, "last_name"):
            extra_fields.append("last_name")
        fields = ("id", *extra_fields)
        read_only_fields = ("email",)
