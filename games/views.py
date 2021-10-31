from typing import Type
from django.db import models
from django.contrib.auth import get_user_model
from rest_framework import viewsets, permissions
from rest_framework.serializers import BaseSerializer

from .permissions import IsAdminOrReadOnly

from .helpers import (
    assert_diary_has_memory_capacity,
    assert_memory_has_experience_capacity,
    assert_memory_is_mutable,
    assert_vampire_has_diary_capacity,
    assert_vampire_has_memory_capacity,
)

from .models import (
    Character,
    Event,
    Experience,
    Mark,
    Memory,
    Prompt,
    PromptGroup,
    Resource,
    Skill,
    Vampire,
)
from .serializers import (
    CreateCharacterSerializer,
    CreateEventSerializer,
    CreateExperienceSerializer,
    CreateMarkSerializer,
    CreateMemorySerializer,
    CreateVampireSerializer,
    PromptGroupSerializer,
    PromptSerializer,
    CreateResourceSerializer,
    CreateSkillSerializer,
    UpdateCharacterSerializer,
    UpdateEventSerializer,
    UpdateExperienceSerializer,
    UpdateMarkSerializer,
    UpdateMemorySerializer,
    UpdateResourceSerializer,
    UpdateSkillSerializer,
    UpdateVampireSerializer,
)

UPDATE_METHODS = ["PUT", "PATCH"]


class PromptGroupViewSet(viewsets.ModelViewSet):
    lookup_field = "id"
    lookup_url_kwarg = "pk"
    serializer_class = PromptGroupSerializer
    permission_classes = [IsAdminOrReadOnly]
    queryset = PromptGroup.objects.all()


class PromptViewSet(viewsets.ModelViewSet):
    lookup_field = "id"
    lookup_url_kwarg = "pk"
    serializer_class = PromptSerializer
    permission_classes = [IsAdminOrReadOnly]
    queryset = Prompt.objects.all()


class VampireViewSet(viewsets.ModelViewSet):
    lookup_field = "id"
    lookup_url_kwarg = "pk"
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self) -> models.QuerySet:
        user = self.request.user
        assert isinstance(user, get_user_model())
        return Vampire.objects.filter(user=user)

    def get_serializer_class(self) -> Type[BaseSerializer]:
        if self.request.method in UPDATE_METHODS:
            return UpdateVampireSerializer
        return CreateVampireSerializer

    def perform_create(self, serializer: BaseSerializer) -> None:
        serializer.save(user=self.request.user)


class EventViewSet(viewsets.ModelViewSet):
    lookup_field = "id"
    lookup_url_kwarg = "pk"
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self) -> models.QuerySet:
        user = self.request.user
        assert isinstance(user, get_user_model())
        return Event.objects.filter(user=user)

    def get_serializer_class(self) -> Type[BaseSerializer]:
        if self.request.method in UPDATE_METHODS:
            return UpdateEventSerializer
        return CreateEventSerializer

    def perform_create(self, serializer: BaseSerializer) -> None:
        serializer.save(user=self.request.user)


class MemoryViewSet(viewsets.ModelViewSet):
    lookup_field = "id"
    lookup_url_kwarg = "pk"
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self) -> models.QuerySet:
        user = self.request.user
        assert isinstance(user, get_user_model())
        return Memory.objects.filter(user=user)

    def get_serializer_class(self) -> Type[BaseSerializer]:
        if self.request.method in UPDATE_METHODS:
            return UpdateMemorySerializer
        return CreateMemorySerializer

    def perform_create(self, serializer: BaseSerializer) -> None:
        validated_data = serializer.validated_data

        vampire = validated_data["vampire"]
        assert isinstance(vampire, Vampire)
        assert_vampire_has_memory_capacity(vampire)

        serializer.save(user=self.request.user)

    def perform_update(self, serializer: BaseSerializer) -> None:
        validated_data = serializer.validated_data

        diary = validated_data["diary"]
        assert isinstance(diary, Resource)
        assert_diary_has_memory_capacity(diary)

        return super().perform_update(serializer)


class ExperienceViewSet(viewsets.ModelViewSet):
    lookup_field = "id"
    lookup_url_kwarg = "pk"
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self) -> models.QuerySet:
        user = self.request.user
        assert isinstance(user, get_user_model())
        return Experience.objects.filter(user=user)

    def get_serializer_class(self) -> Type[BaseSerializer]:
        if self.request.method in UPDATE_METHODS:
            return UpdateExperienceSerializer
        return CreateExperienceSerializer

    def perform_create(self, serializer: BaseSerializer) -> None:
        validated_data = serializer.validated_data

        memory = validated_data["memory"]
        assert isinstance(memory, Memory)
        assert_memory_has_experience_capacity(memory)
        assert_memory_is_mutable(memory)

        serializer.save(user=self.request.user)


class SkillViewSet(viewsets.ModelViewSet):
    lookup_field = "id"
    lookup_url_kwarg = "pk"
    serializer_class = CreateSkillSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self) -> models.QuerySet:
        user = self.request.user
        assert isinstance(user, get_user_model())
        return Skill.objects.filter(user=user)

    def get_serializer_class(self) -> Type[BaseSerializer]:
        if self.request.method in UPDATE_METHODS:
            return UpdateSkillSerializer
        return CreateSkillSerializer

    def perform_create(self, serializer: BaseSerializer) -> None:
        serializer.save(user=self.request.user)


class ResourceViewSet(viewsets.ModelViewSet):
    lookup_field = "id"
    lookup_url_kwarg = "pk"
    serializer_class = CreateResourceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self) -> models.QuerySet:
        user = self.request.user
        assert isinstance(user, get_user_model())
        return Resource.objects.filter(user=user)

    def get_serializer_class(self) -> Type[BaseSerializer]:
        if self.request.method in UPDATE_METHODS:
            return UpdateResourceSerializer
        return CreateResourceSerializer

    def perform_create(self, serializer: BaseSerializer) -> None:
        validated_data = serializer.validated_data
        vampire = validated_data["vampire"]
        assert isinstance(vampire, Vampire)

        is_diary = validated_data["is_diary"]
        if is_diary:
            assert_vampire_has_diary_capacity(vampire)

        serializer.save(user=self.request.user)

    def perform_update(self, serializer: BaseSerializer) -> None:
        validated_data = serializer.validated_data

        vampire = validated_data["vampire"]
        assert isinstance(vampire, Vampire)

        is_diary = validated_data["is_diary"]
        if is_diary:
            assert_vampire_has_diary_capacity(vampire)

        return super().perform_update(serializer)


class CharacterViewSet(viewsets.ModelViewSet):
    lookup_field = "id"
    lookup_url_kwarg = "pk"
    serializer_class = CreateCharacterSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self) -> models.QuerySet:
        user = self.request.user
        assert isinstance(user, get_user_model())
        return Character.objects.filter(user=user)

    def get_serializer_class(self) -> Type[BaseSerializer]:
        if self.request.method in UPDATE_METHODS:
            return UpdateCharacterSerializer
        return CreateCharacterSerializer

    def perform_create(self, serializer: BaseSerializer) -> None:
        serializer.save(user=self.request.user)


class MarkViewSet(viewsets.ModelViewSet):
    lookup_field = "id"
    lookup_url_kwarg = "pk"
    serializer_class = CreateMarkSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self) -> models.QuerySet:
        user = self.request.user
        assert isinstance(user, get_user_model())
        return Mark.objects.filter(user=user)

    def get_serializer_class(self) -> Type[BaseSerializer]:
        if self.request.method in UPDATE_METHODS:
            return UpdateMarkSerializer
        return CreateMarkSerializer

    def perform_create(self, serializer: BaseSerializer) -> None:
        serializer.save(user=self.request.user)
