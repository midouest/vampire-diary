import pathlib
import re

from typing import Any, Optional, TextIO

from django.db import transaction
from django.core.management.base import BaseCommand, CommandParser

from games.models import Prompt, PromptGroup


class Command(BaseCommand):
    help = "Import prompts from a plaintext file"

    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument(
            "import_path",
            type=pathlib.Path,
            help="Path to the plaintext file to be imported",
        )

    def handle(
        self,
        import_path: pathlib.Path = None,
        *args: Any,
        **options: Any,
    ) -> Optional[str]:
        if import_path is None:
            return None

        transaction.set_autocommit(False)

        try:
            group = PromptGroup(name=import_path.name)
            group.save()

            with import_path.open() as f:
                prompts = parse_prompt_file(f, group.id)

            Prompt.objects.bulk_create(prompts)
            group.prompts.add(*prompts)

            transaction.commit()
        except Exception as ex:
            print(ex)
            transaction.rollback()

        transaction.set_autocommit(True)

        return None


def is_valid_header(
    prev_index: Optional[int],
    prev_sub_index: Optional[str],
    index: int,
    sub_index: str,
) -> bool:
    if prev_index is None:
        return index == 1 and sub_index == "a"

    if index == prev_index + 1:
        return sub_index == "a"

    if index == prev_index:
        return (sub_index == "b" and prev_sub_index == "a") or (
            sub_index == "c" and prev_sub_index == "b"
        )

    return False


PROMPT_HEADER = re.compile("(\d+)([abc])")

GAME_OVER_PHRASE = "the game is over"


def parse_prompt_file(f: TextIO, group_id: int) -> list[Prompt]:
    prev_index = None
    prev_sub_index = None
    index = None
    sub_index = None
    prompts: list[Prompt] = []
    description: list[str] = []

    def save_description():
        if (
            len(description) > 0
            and prev_index is not None
            and prev_sub_index is not None
        ):
            prompt = prompts[prev_index - 1]
            full_description = " ".join(description)
            setattr(prompt, "description_" + prev_sub_index, full_description)
            if GAME_OVER_PHRASE in full_description.lower():
                prompt.is_game_over = True

    while True:
        line = f.readline()
        if line == "":
            save_description()
            break

        match = re.match(PROMPT_HEADER, line)
        if match is None:
            line = line.strip()
            if line != "":
                description.append(line)

        else:
            index = int(match.group(1))
            sub_index = match.group(2)

            if not is_valid_header(prev_index, prev_sub_index, index, sub_index):
                break

            save_description()
            description = []

            if sub_index == "a":
                prompts.append(Prompt(order=index - 1, group_id=group_id))

            prev_index = index
            prev_sub_index = sub_index

    return prompts
