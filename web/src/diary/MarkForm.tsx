import { useAppDispatch } from "app/hooks";
import { useState } from "react";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { DebounceInput } from "react-debounce-input";
import { Mark } from "./diary-model";
import { markThunk } from "./diary-thunk";

export interface MarkFormProps {
  mark: Mark;
}

export function MarkForm({ mark }: MarkFormProps) {
  const dispatch = useAppDispatch();
  const [description, setDescription] = useState(mark.description);

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setDescription(value);
    dispatch(markThunk.update({ id: mark.id, description: value }));
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
