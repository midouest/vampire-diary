from django.urls import path, include
from rest_framework import routers

from .views import (
    CharacterViewSet,
    EventViewSet,
    ExperienceViewSet,
    MarkViewSet,
    MemoryViewSet,
    PromptGroupViewSet,
    PromptViewSet,
    ResourceViewSet,
    SkillViewSet,
    VampireViewSet,
)

router = routers.DefaultRouter()
router.register(r"prompt_groups", PromptGroupViewSet)
router.register(r"prompts", PromptViewSet)
router.register(r"vampires", VampireViewSet, basename="vampire")
router.register(r"events", EventViewSet, basename="event")
router.register(r"memorys", MemoryViewSet, basename="memory")
router.register(r"experiences", ExperienceViewSet, basename="experience")
router.register(r"skills", SkillViewSet, basename="skill")
router.register(r"resources", ResourceViewSet, basename="resource")
router.register(r"characters", CharacterViewSet, basename="character")
router.register(r"marks", MarkViewSet, basename="mark")

urlpatterns = [
    path("", include(router.urls)),
]
