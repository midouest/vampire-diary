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
            "memory",
            "description",
        ]


class UpdateExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = [
            "id",
            "memory",
            "description",
        ]
        read_only_fields = [
            "memory",
        ]


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
            "is_diary",
        ]


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


class CreateMarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mark
        fields = [
            "id",
            "vampire",
            "description",
        ]


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


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = [
            "id",
            "memory",
            "description",
        ]


class MemorySerializer(serializers.ModelSerializer):
    experiences = ExperienceSerializer(many=True)

    class Meta:
        model = Memory
        fields = [
            "id",
            "vampire",
            "diary",
            "is_forgotten",
            "experiences",
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
    memories = MemorySerializer(many=True)

    class Meta:
        model = Resource
        fields = [
            "id",
            "vampire",
            "description",
            "is_diary",
            "is_lost",
            "memories",
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


class VampireSerializer(serializers.ModelSerializer):
    memories = MemorySerializer(many=True)
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
            "memories",
            "skills",
            "resources",
            "characters",
            "marks",
        ]
