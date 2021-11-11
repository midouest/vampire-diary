# Prompt File Format

## File Format

Prompt files consist of alternating headers and descriptions. Each header and description should be on its own line. Headers and descriptions may be separated by any number of blank lines (including zero).

## Header Format

A header consists of an integer identifier and one of the characters `a`, `b` or `c`.

The first prompt must have the header `1a`, and each subsequent prompt must increment either the first or second identifier by 1. For example 1 to 2 or `a` to `b`.

Whenever the first identifier is incremented, the second identifier must be reset back to `a`. Whenever the second identifier reaches `c`, the following header must increment the first identifier. For example, the prompt immediately after `1a` should be either `1b` or `2a`. The prompt immediately after `1c` must be `2a`.

## Description Format

The description can be any number of lines of text. The description does not need to follow any particular format. Each line of text will be concatenated together to form the prompt content.

If the description contains the phrase `the game is over`, then the prompt will cause the game to end if the player should land on it during play. It is assumed that prompts containing the game over phrase will only have a single "sub-prompt" (i.e., only `a` - no `b` or `c` descriptions).
