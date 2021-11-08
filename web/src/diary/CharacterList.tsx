import { CharacterCard } from "./CharacterCard";
import { Character } from "./diary-model";

export interface CharacterListProps {
  characters: Character[];
}

export function CharacterList({ characters }: CharacterListProps) {
  return (
    <>
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </>
  );
}
