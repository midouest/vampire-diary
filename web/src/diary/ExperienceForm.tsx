import { useAppDispatch } from "app/hooks";
import React, { useState } from "react";
import { FormControl, FormGroup } from "react-bootstrap";
import { DebounceInput } from "react-debounce-input";
import TextareaAutosize from "react-textarea-autosize";
import { Experience } from "./diary-model";
import { experienceThunk } from "./diary-thunk";

export interface ExperienceFormProps {
  experience: Experience;
}

export function ExperienceForm({ experience }: ExperienceFormProps) {
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
    <FormGroup className="mt-3">
      <FormControl
        size="sm"
        as={DebounceInput}
        forceNotifyByEnter={false}
        debounceTimeout={1000}
        placeholder="Describe the experience..."
        value={description}
        onChange={handleDescriptionChange}
        element={TextareaAutosize as any}
      />
    </FormGroup>
  );
}
