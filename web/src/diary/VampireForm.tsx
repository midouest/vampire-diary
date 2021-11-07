import { useAppDispatch } from "app/hooks";
import React, { useState } from "react";
import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { DebounceInput } from "react-debounce-input";
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
    <Form>
      <FormGroup>
        <FormLabel>Name</FormLabel>
        <FormControl
          as={DebounceInput}
          debounceTimeout={1000}
          value={name}
          onChange={handleNameChange}
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>Description</FormLabel>
        <FormControl
          as={DebounceInput}
          element="textarea"
          debounceTimeout={1000}
          value={description}
          onChange={handleDescriptionChange}
        />
      </FormGroup>
    </Form>
  );
}
