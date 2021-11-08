import { useAppDispatch } from "app/hooks";
import { OVERLAY_DELAY } from "common/constants";
import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { DebounceInput } from "react-debounce-input";
import { useNavigate } from "react-router";
import TextareaAutosize from "react-textarea-autosize";
import { removeVampire, updateVampire } from "vampire/vampire-slice";
import { Vampire } from "../vampire/vampire-model";

export interface VampireFormProps {
  vampire: Vampire;
}

export function VampireForm({ vampire }: VampireFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(vampire.name);
  const [description, setDescription] = useState(vampire.description);

  useEffect(() => {
    setName(vampire.name);
    setDescription(vampire.description);
  }, [vampire]);

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

  const handleDelete = async () => {
    await dispatch(removeVampire(vampire.id));
    navigate("/vampires");
  };

  return (
    <>
      <FormGroup>
        <FormLabel>Name</FormLabel>
        <FormControl
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
          as={DebounceInput}
          forceNotifyByEnter={false}
          element={TextareaAutosize as any}
          debounceTimeout={1000}
          placeholder="Describe your vampire..."
          value={description}
          onChange={handleDescriptionChange}
        />
      </FormGroup>

      <OverlayTrigger
        placement="bottom"
        delay={OVERLAY_DELAY}
        overlay={<Tooltip>Remove this Vampire</Tooltip>}
      >
        <Button
          variant="outline-danger"
          className="mt-3"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </OverlayTrigger>
    </>
  );
}
