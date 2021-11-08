import { useAppDispatch } from "app/hooks";
import React, { useState } from "react";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { DebounceInput } from "react-debounce-input";
import { Experience } from "./diary-model";
import { experienceThunk } from "./diary-thunk";

export interface ExperienceFormProps {
  index: number;
  experience: Experience;
}

export function ExperienceForm({ index, experience }: ExperienceFormProps) {
  const dispatch = useAppDispatch();
  const [description, setDescription] = useState(experience.description);

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setDescription(value);
    dispatch(experienceThunk.update({ id: experience.id, description: value }));
  };

  return (
    <FormGroup>
      <FormLabel>Experience {index + 1}</FormLabel>
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
