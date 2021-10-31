from typing import Any, Optional

from django.core.management.base import BaseCommand, CommandParser

from games.models import Vampire


class Command(BaseCommand):
    help = "Remove all vampires and associated data"

    def handle(
        self,
        *args: Any,
        **options: Any,
    ) -> Optional[str]:
        Vampire.objects.all().delete()
        return None
