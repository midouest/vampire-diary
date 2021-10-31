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


class PromptGroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PromptGroup
        fields = [
            "url",
            "name",
            "created_at",
            "updated_at",
        ]


class PromptSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Prompt
        fields = [
            "url",
            "group",
            "order",
            "description_a",
            "description_b",
            "description_c",
            "created_at",
            "updated_at",
        ]


class CreateVampireSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Vampire
        fields = [
            "url",
            "prompt_group",
            "name",
            "description",
            "created_at",
            "updated_at",
        ]


class UpdateVampireSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Vampire
        fields = [
            "url",
            "prompt_group",
            "name",
            "description",
            "is_dead",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "prompt_group",
        ]


class CreateEventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        fields = [
            "url",
            "vampire",
            "prompt",
            "description",
            "created_at",
            "updated_at",
        ]


class UpdateEventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        fields = [
            "url",
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


class CreateMemorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Memory
        fields = [
            "url",
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


class UpdateMemorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Memory
        fields = [
            "url",
            "vampire",
            "diary",
            "is_forgotten",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "vampire",
        ]


class CreateExperienceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Experience
        fields = [
            "url",
            "memory",
            "description",
            "created_at",
            "updated_at",
        ]


class UpdateExperienceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Experience
        fields = [
            "url",
            "memory",
            "description",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "memory",
        ]


class CreateSkillSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Skill
        fields = [
            "url",
            "vampire",
            "description",
            "is_checked",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "is_checked",
        ]


class UpdateSkillSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Skill
        fields = [
            "url",
            "vampire",
            "description",
            "is_checked",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "vampire",
        ]


class CreateResourceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Resource
        fields = [
            "url",
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


class UpdateResourceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Resource
        fields = [
            "url",
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


class CreateCharacterSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Character
        fields = [
            "url",
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


class UpdateCharacterSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Character
        fields = [
            "url",
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


class CreateMarkSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Mark
        fields = [
            "url",
            "vampire",
            "description",
            "created_at",
            "updated_at",
        ]


class UpdateMarkSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Mark
        fields = [
            "url",
            "vampire",
            "description",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "vampire",
        ]
