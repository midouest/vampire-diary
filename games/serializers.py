from rest_framework import serializers

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


class PromptGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromptGroup
        fields = [
            "id",
            "name",
        ]


class PromptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prompt
        fields = [
            "id",
            "group",
            "order",
            "description_a",
            "description_b",
            "description_c",
        ]


class CreateVampireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vampire
        fields = [
            "id",
            "prompt_group",
            "name",
            "description",
        ]


class UpdateVampireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vampire
        fields = [
            "id",
            "prompt_group",
            "name",
            "description",
            "is_dead",
        ]
        read_only_fields = [
            "prompt_group",
        ]


class BaseEventSerializer(serializers.ModelSerializer):
    prompt = serializers.SerializerMethodField()

    def get_prompt(self, event):
        visit = event.visit
        prompt = event.prompt

        if visit == 0:
            return prompt.description_a
        elif visit == 1:
            return prompt.description_b
        elif visit == 2:
            return prompt.description_c

        raise RuntimeError(f"Unexpected visit {visit} for prompt ID {prompt.id}")


class CreateEventSerializer(BaseEventSerializer):
    class Meta:
        model = Event
        fields = [
            "id",
            "vampire",
            "prompt",
            "description",
        ]
        read_only_fields = [
            "prompt",
            "description",
        ]


class UpdateEventSerializer(BaseEventSerializer):
    class Meta:
        model = Event
        fields = [
            "id",
            "vampire",
            "prompt",
            "description",
        ]
        read_only_fields = [
            "vampire",
            "prompt",
        ]


class CreateMemorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Memory
        fields = [
            "id",
            "vampire",
            "diary",
            "is_forgotten",
        ]
        read_only_fields = [
            "diary",
            "is_forgotten",
        ]


class UpdateMemorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Memory
        fields = [
            "id",
            "vampire",
            "diary",
            "is_forgotten",
        ]
        read_only_fields = [
            "vampire",
        ]


class CreateExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = [
            "id",
            "vampire",
            "memory",
            "description",
        ]
        read_only_fields = [
            "vampire",
        ]
        extra_kwargs = {"description": {"allow_blank": True}}


class UpdateExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = [
            "id",
            "vampire",
            "memory",
            "description",
        ]
        read_only_fields = [
            "vampire",
            "memory",
        ]
        extra_kwargs = {"description": {"allow_blank": True}}


class CreateSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = [
            "id",
            "vampire",
            "description",
            "is_checked",
        ]
        read_only_fields = [
            "is_checked",
        ]
        extra_kwargs = {"description": {"allow_blank": True}}


class UpdateSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = [
            "id",
            "vampire",
            "description",
            "is_checked",
        ]
        read_only_fields = [
            "vampire",
        ]
        extra_kwargs = {"description": {"allow_blank": True}}


class CreateResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = [
            "id",
            "vampire",
            "description",
            "is_diary",
            "is_lost",
        ]
        read_only_fields = [
            "is_lost",
        ]
        extra_kwargs = {"description": {"allow_blank": True}}


class UpdateResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = [
            "id",
            "vampire",
            "description",
            "is_diary",
            "is_lost",
        ]
        read_only_fields = [
            "vampire",
        ]
        extra_kwargs = {"description": {"allow_blank": True}}


class CreateCharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = [
            "id",
            "vampire",
            "name",
            "description",
            "is_immortal",
            "is_dead",
        ]
        read_only_fields = [
            "is_dead",
        ]
        extra_kwargs = {
            "name": {"allow_blank": True},
            "description": {"allow_blank": True},
        }


class UpdateCharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = [
            "id",
            "vampire",
            "name",
            "description",
            "is_immortal",
            "is_dead",
        ]
        read_only_fields = [
            "vampire",
        ]
        extra_kwargs = {
            "name": {"allow_blank": True},
            "description": {"allow_blank": True},
        }


class CreateMarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mark
        fields = [
            "id",
            "vampire",
            "description",
        ]
        extra_kwargs = {"description": {"allow_blank": True}}


class UpdateMarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mark
        fields = [
            "id",
            "vampire",
            "description",
        ]
        read_only_fields = [
            "vampire",
        ]
        extra_kwargs = {"description": {"allow_blank": True}}


class EventSerializer(BaseEventSerializer):
    class Meta:
        model = Event
        fields = [
            "id",
            "vampire",
            "prompt",
            "description",
        ]


class MemorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Memory
        fields = [
            "id",
            "vampire",
            "diary",
            "is_forgotten",
        ]


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = [
            "id",
            "memory",
            "description",
        ]


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = [
            "id",
            "vampire",
            "description",
            "is_checked",
        ]


class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = [
            "id",
            "vampire",
            "description",
            "is_diary",
            "is_lost",
        ]


class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = [
            "id",
            "vampire",
            "name",
            "description",
            "is_immortal",
            "is_dead",
        ]


class MarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mark
        fields = [
            "id",
            "vampire",
            "description",
        ]


class DeepVampireSerializer(serializers.ModelSerializer):
    events = EventSerializer(many=True)
    memories = MemorySerializer(many=True)
    experiences = ExperienceSerializer(many=True)
    skills = SkillSerializer(many=True)
    resources = ResourceSerializer(many=True)
    characters = CharacterSerializer(many=True)
    marks = MarkSerializer(many=True)

    class Meta:
        model = Vampire
        fields = [
            "id",
            "name",
            "description",
            "is_dead",
            "events",
            "memories",
            "experiences",
            "skills",
            "resources",
            "characters",
            "marks",
        ]
