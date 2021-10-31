from rest_framework.serializers import ValidationError
from .models import Experience, Memory, Resource, Vampire

MAX_VAMPIRE_MEMORIES = 5


def assert_vampire_has_memory_capacity(vampire: Vampire) -> None:
    num_active_memories = Memory.objects.filter(
        vampire=vampire,
        is_forgotten=False,
        diary=None,
    ).count()

    if num_active_memories >= MAX_VAMPIRE_MEMORIES:
        raise ValidationError(
            f"Cannot create new memories for vampire {vampire}. "
            + f"Found {num_active_memories} active memories. "
            + f"Cannot have more than {MAX_VAMPIRE_MEMORIES} active memories. "
            + f"Forget a memory or move it to a diary first."
        )


MAX_MEMORY_EXPERIENCES = 3


def assert_memory_has_experience_capacity(memory: Memory) -> None:
    num_experiences = Experience.objects.filter(
        memory=memory,
    ).count()

    if num_experiences >= MAX_MEMORY_EXPERIENCES:
        raise ValidationError(
            f"Cannot create new experiences for memory {memory}. "
            + f"Found {num_experiences} experiences. "
            + f"Cannot have more than {MAX_MEMORY_EXPERIENCES} experiences in a memory. "
            + f"Create a new memory."
        )


MAX_DIARY_MEMORIES = 4


def assert_diary_has_memory_capacity(diary: Resource) -> None:
    num_memories = Memory.objects.filter(
        diary=diary,
    ).count()

    if num_memories >= MAX_DIARY_MEMORIES:
        raise ValidationError("Cannot add memory to diary")


MAX_VAMPIRE_DIARIES = 1


def assert_vampire_has_diary_capacity(vampire: Vampire) -> None:
    num_diaries = Resource.objects.filter(
        vampire=vampire,
        is_diary=True,
        is_lost=False,
    ).count()

    if num_diaries >= MAX_VAMPIRE_DIARIES:
        raise ValidationError("Cannot create vampire diary")


def assert_memory_is_mutable(memory: Memory) -> None:
    if memory.diary is not None:
        raise ValidationError("Cannot add experience to memory")
