import { Form } from "react-bootstrap";
import { CharacterForm } from "./CharacterForm";
import { Character } from "./diary-model";

export interface CharacterListProps {
  characters: Character[];
}

export function CharacterList({ characters }: CharacterListProps) {
  return (
    <Form className="mt-3">
      {characters.map((character) => (
        <CharacterForm key={character.id} character={character} />
      ))}
    </Form>
  );
}
