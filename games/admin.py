from django.contrib import admin
from .models import (
    PromptGroup,
    Prompt,
    Vampire,
    Event,
    Memory,
    Experience,
    Resource,
    Skill,
    Character,
    Mark,
)

admin.site.register(PromptGroup)
admin.site.register(Prompt)
admin.site.register(Vampire)
admin.site.register(Event)
admin.site.register(Memory)
admin.site.register(Experience)
admin.site.register(Resource)
admin.site.register(Skill)
admin.site.register(Character)
admin.site.register(Mark)
