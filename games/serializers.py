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
            "created_at",
            "updated_at",
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
            "created_at",
            "updated_at",
        ]


class CreateVampireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vampire
        fields = [
            "id",
            "prompt_group",
            "name",
            "description",
            "created_at",
            "updated_at",
        ]


class UpdateVampireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vampire
        fields = [
            "id",
            "prompt_group",
            "name",
            "description",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "prompt_group",
        ]


class CreateEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            "id",
            "vampire",
            "prompt",
            "description",
            "created_at",
            "updated_at",
        ]


class UpdateEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            "id",
            "vampire",
            "prompt",
            "description",
            "created_at",
            "updated_at",
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
            "created_at",
            "updated_at",
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
            "created_at",
            "updated_at",
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
            "created_at",
            "updated_at",
        ]


class UpdateExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = [
            "id",
            "memory",
            "description",
            "created_at",
            "updated_at",
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
            "created_at",
            "updated_at",
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
            "created_at",
            "updated_at",
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
            "created_at",
            "updated_at",
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
            "created_at",
            "updated_at",
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
            "created_at",
            "updated_at",
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
            "created_at",
            "updated_at",
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
            "created_at",
            "updated_at",
        ]


class UpdateMarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mark
        fields = [
            "id",
            "vampire",
            "description",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "vampire",
        ]
