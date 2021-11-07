from django.urls import path, include
from rest_framework import routers

from .views import (
    CharacterViewSet,
    EventViewSet,
    ExperienceViewSet,
    FullVampireView,
    MarkViewSet,
    MemoryViewSet,
    PromptGroupViewSet,
    PromptViewSet,
    ResourceViewSet,
    SkillViewSet,
    VampireViewSet,
)

router = routers.DefaultRouter()
router.register(r"prompt-groups", PromptGroupViewSet)
router.register(r"prompts", PromptViewSet)
router.register(r"vampires", VampireViewSet, basename="vampire")
router.register(r"events", EventViewSet, basename="event")
router.register(r"memories", MemoryViewSet, basename="memory")
router.register(r"experiences", ExperienceViewSet, basename="experience")
router.register(r"skills", SkillViewSet, basename="skill")
router.register(r"resources", ResourceViewSet, basename="resource")
router.register(r"characters", CharacterViewSet, basename="character")
router.register(r"marks", MarkViewSet, basename="mark")

urlpatterns = [
    path("vampires/<int:pk>/full/", FullVampireView.as_view()),
    path("", include(router.urls)),
]
