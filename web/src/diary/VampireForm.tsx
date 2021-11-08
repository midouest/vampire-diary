import { useAppDispatch } from "app/hooks";
import React, { useState } from "react";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { DebounceInput } from "react-debounce-input";
import TextareaAutosize from "react-autosize-textarea";
import { updateVampire } from "vampire/vampire-slice";
import { Vampire } from "../vampire/vampire-model";

export interface VampireFormProps {
  vampire: Vampire;
}

export function VampireForm({ vampire }: VampireFormProps) {
  const dispatch = useAppDispatch();

  const [name, setName] = useState(vampire.name);
  const [description, setDescription] = useState(vampire.description);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setName(value);
    dispatch(updateVampire({ id: vampire.id, name: value }));
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setDescription(value);
    dispatch(updateVampire({ id: vampire.id, description: value }));
  };

  return (
    <>
      <FormGroup>
        <FormLabel>Name</FormLabel>
        <FormControl
          size="sm"
          as={DebounceInput}
          forceNotifyByEnter={false}
          debounceTimeout={1000}
          placeholder="Name your vampire..."
          value={name}
          onChange={handleNameChange}
        />
      </FormGroup>

      <FormGroup className="mt-3">
        <FormLabel>Description</FormLabel>
        <FormControl
          size="sm"
          as={DebounceInput}
          forceNotifyByEnter={false}
          element={TextareaAutosize as any}
          debounceTimeout={1000}
          placeholder="Describe your vampire..."
          value={description}
          onChange={handleDescriptionChange}
        />
      </FormGroup>
    </>
  );
}
