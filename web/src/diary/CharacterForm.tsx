import { useAppDispatch } from "app/hooks";
import { useState } from "react";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { DebounceInput } from "react-debounce-input";
import { Character } from "./diary-model";
import { characterThunk } from "./diary-thunk";

export interface CharacterFormProps {
  character: Character;
}

export function CharacterForm({ character }: CharacterFormProps) {
  const dispatch = useAppDispatch();
  const [description, setDescription] = useState(character.description);

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setDescription(value);
    dispatch(characterThunk.update({ id: character.id, description: value }));
  };

  return (
    <FormGroup>
      <FormLabel>Description</FormLabel>
      <FormControl
        as={DebounceInput}
        debounceTimeout={1000}
        value={description}
        onChange={handleDescriptionChange}
        element="textarea"
      />
    </FormGroup>
  );
}
