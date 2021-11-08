import { useAppDispatch } from "app/hooks";
import { useState } from "react";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { DebounceInput } from "react-debounce-input";
import { Skill } from "./diary-model";
import { skillThunk } from "./diary-thunk";

export interface SkillFormProps {
  skill: Skill;
}

export function SkillForm({ skill }: SkillFormProps) {
  const dispatch = useAppDispatch();
  const [description, setDescription] = useState(skill.description);

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setDescription(value);
    dispatch(skillThunk.update({ id: skill.id, description: value }));
  };

  return (
    <FormGroup className="mt-3">
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
