from django.db import models

from config import settings


class TimestampMixin(models.Model):
    """
    A TimestampMixin is used to add fields for automatically recording the
    timestamp of create and update operations on a model.
    """

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class PromptGroup(TimestampMixin):
    """
    A PromptGroup is used to create unique sets of Prompts. Each game is
    associated with a single PromptGroup. Prompts for a given game are pulled
    from its associated PromptGroup to drive the narrative.
    """

    name = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.name


class Prompt(TimestampMixin):
    """
    A Prompt describes an abstract event in a vampire's life. Prompts are stored
    in a specific order, but may be encountered in almost any order.

    The player will respond to the prompt when it occurs in order to create an
    event. Prompts can be visited up to three times, producing a unique
    description each time.
    """

    group = models.ForeignKey(
        PromptGroup,
        on_delete=models.CASCADE,
        related_name="prompts",
    )

    order = models.IntegerField()
    description_a = models.TextField()
    description_b = models.TextField(blank=True, null=True)
    description_c = models.TextField(blank=True, null=True)
    is_game_over = models.BooleanField(default=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["group", "order"],
                name="unique_group_order",
                deferrable=models.Deferrable.DEFERRED,
            )
        ]

    def __str__(self) -> str:
        return f"{self.order} {self.description_a}"


class Vampire(TimestampMixin):
    """
    A Vampire is the primary game state object. The player constructs a
    narrative for the vampire as prompts are encountered. The game ends when the
    vampire has no more skills or resources at their disposal.
    """

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="vampires",
    )
    prompt_group = models.ForeignKey(
        "PromptGroup",
        on_delete=models.SET_NULL,
        null=True,
        related_name="+",
    )

    name = models.CharField(max_length=100)
    description = models.TextField()
    is_dead = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.name


class Event(TimestampMixin):
    """
    An Event represents a response to a prompt. A vampire's narrative is
    represented by their history of events.
    """

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="+",
    )
    vampire = models.ForeignKey(
        Vampire,
        on_delete=models.CASCADE,
        related_name="events",
    )
    prompt = models.ForeignKey(
        Prompt,
        on_delete=models.SET_NULL,
        null=True,
        related_name="+",
    )

    description = models.TextField(blank=True)

    def __str__(self) -> str:
        return self.description


class Memory(TimestampMixin):
    """
    A Memory is a container for a vampire's experiences. A vampire can have
    up to five memories, and each memory can contain three experiences. When a
    memory is full, new experiences must be placed in an empty memory or a new
    memory must be created. If no memory can be created, then an existing memory
    must be forgotten.
    """

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="+",
    )
    vampire = models.ForeignKey(
        Vampire,
        on_delete=models.CASCADE,
        related_name="memories",
    )
    diary = models.ForeignKey(
        "Resource",
        on_delete=models.CASCADE,
        related_name="memories",
        blank=True,
        null=True,
    )

    is_forgotten = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "memories"

    def __str__(self) -> str:
        return f"{self.vampire} {self.id}"


class Experience(TimestampMixin):
    """
    An Experience represents a period of a vampire's life. It could be a single
    event or a series of events over a long period of time. Experiences are
    stored in memories.
    """

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="+",
    )
    memory = models.ForeignKey(
        Memory,
        on_delete=models.CASCADE,
        related_name="experiences",
    )

    description = models.TextField()

    def __str__(self) -> str:
        return self.description


class Skill(TimestampMixin):
    """
    A Skill
    """

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="+",
    )
    vampire = models.ForeignKey(
        Vampire,
        on_delete=models.CASCADE,
        related_name="skills",
    )

    description = models.TextField()
    is_checked = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.description


class Resource(TimestampMixin):
    """
    A Resource
    """

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="+",
    )
    vampire = models.ForeignKey(
        Vampire,
        on_delete=models.CASCADE,
        related_name="resources",
    )

    description = models.TextField()
    is_diary = models.BooleanField(default=False)
    is_lost = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.description


class Character(TimestampMixin):
    """
    A Character
    """

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="+",
    )
    vampire = models.ForeignKey(
        Vampire,
        on_delete=models.CASCADE,
        related_name="characters",
    )

    name = models.CharField(max_length=100)
    description = models.TextField()
    is_immortal = models.BooleanField(default=False)
    is_dead = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.name


class Mark(TimestampMixin):
    """
    A Mark
    """

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="+",
    )
    vampire = models.ForeignKey(
        Vampire,
        on_delete=models.CASCADE,
        related_name="marks",
    )

    description = models.TextField()

    def __str__(self) -> str:
        return self.description
