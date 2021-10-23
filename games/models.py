from django.db import models

from accounts.models import User


class PromptGroup(models.Model):
    name = models.CharField(max_length=100)


class Prompt(models.Model):
    group = models.ForeignKey(
        PromptGroup,
        on_delete=models.CASCADE,
        related_name="prompts",
    )
    order = models.IntegerField()
    description1 = models.TextField()
    description2 = models.TextField()
    description3 = models.TextField()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["group", "order"],
                name="unique_group_order",
                deferrable=models.Deferrable.DEFERRED,
            )
        ]


class Vampire(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="vampires",
    )
    prompt_group = models.ForeignKey(
        "PromptGroup",
        on_delete=models.PROTECT,
        related_name="+",
    )
    description = models.TextField()


class Event(models.Model):
    vampire = models.ForeignKey(
        Vampire,
        on_delete=models.CASCADE,
        related_name="events",
    )
    prompt = models.ForeignKey(
        Prompt,
        on_delete=models.PROTECT,
        related_name="+",
    )
    order = models.IntegerField()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["vampire", "order"],
                name="unique_vampire_order",
                deferrable=models.Deferrable.DEFERRED,
            )
        ]


class Memory(models.Model):
    vampire = models.ForeignKey(
        Vampire,
        on_delete=models.CASCADE,
        related_name="memories",
    )
    diary = models.ForeignKey(
        "Resource",
        on_delete=models.CASCADE,
        related_name="memories",
        default=None,
        null=True,
    )
    is_forgotten = models.BooleanField(default=False)


class Experience(models.Model):
    memory = models.ForeignKey(
        Memory,
        on_delete=models.CASCADE,
        related_name="experiences",
    )
    description = models.TextField()


class Resource(models.Model):
    vampire = models.ForeignKey(
        Vampire,
        on_delete=models.CASCADE,
        related_name="resources",
    )
    description = models.TextField()
    is_diary = models.BooleanField(default=False)
    is_lost = models.BooleanField(default=False)


class Skill(models.Model):
    vampire = models.ForeignKey(
        Vampire,
        on_delete=models.CASCADE,
        related_name="skills",
    )
    description = models.TextField()
    is_checked = models.BooleanField(default=False)


class Character(models.Model):
    vampire = models.ForeignKey(
        Vampire,
        on_delete=models.CASCADE,
        related_name="characters",
    )
    description = models.TextField()
    is_immortal = models.BooleanField(default=False)
    is_dead = models.BooleanField(default=False)


class Mark(models.Model):
    vampire = models.ForeignKey(
        Vampire,
        on_delete=models.CASCADE,
        related_name="marks",
    )
    description = models.TextField()
