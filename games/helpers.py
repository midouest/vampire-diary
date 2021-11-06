import random

from collections import defaultdict
from typing import DefaultDict, Iterable, Optional
from django.core.exceptions import BadRequest
from rest_framework.exceptions import server_error
from rest_framework.serializers import ValidationError
from .models import Experience, Memory, Prompt, PromptGroup, Resource, Vampire, Event

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


MAX_PROMPT_EVENTS = 3


def find_next_prompt(vampire: Vampire) -> Prompt:
    prompt_group: Optional[PromptGroup] = vampire.prompt_group
    if prompt_group is None:
        raise BadRequest("Vampire has no associated prompt group")

    try:
        prev_event: Event = vampire.events.latest("created_at")
    except Event.DoesNotExist:
        return prompt_group.prompts.get(order=0)

    prev_prompt: Optional[Prompt] = prev_event.prompt
    if prev_prompt is None:
        raise BadRequest("Most recent event does not have an associated prompt")

    if prev_prompt.is_game_over:
        raise BadRequest("Game is over")

    d10 = random.randint(1, 10)
    d6 = random.randint(1, 6)
    delta = d10 - d6

    num_prompts = Prompt.objects.filter(group=prompt_group).count()
    next_order = max(min(prev_prompt.order + delta, num_prompts - 1), 0)

    visited = count_visited(vampire)
    while visited[next_order] >= MAX_PROMPT_EVENTS and next_order < num_prompts:
        next_order += 1

    if next_order == num_prompts:
        raise RuntimeError(f"All prompts have been visited by vampire {vampire.id}")

    return Prompt.objects.get(group=prompt_group, order=next_order)


def get_visited_prompt_ids(vampire: Vampire) -> Iterable[int]:
    queryset = Event.objects.filter(vampire=vampire).values_list("prompt__order")
    return map(lambda values: values[0], queryset)


def count_visited(vampire: Vampire) -> DefaultDict[int, int]:
    counts: DefaultDict[int, int] = defaultdict(int)
    for id in get_visited_prompt_ids(vampire):
        counts[id] += 1
    return counts
