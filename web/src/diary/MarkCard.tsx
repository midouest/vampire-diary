import { useAppDispatch } from "app/hooks";
import { useState } from "react";
import { FormControl, FormGroup } from "react-bootstrap";
import { DebounceInput } from "react-debounce-input";
import { Mark } from "./diary-model";
import { markThunk } from "./diary-thunk";

export interface MarkFormProps {
  mark: Mark;
}

export function MarkCard({ mark }: MarkFormProps) {
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
      <FormControl
        size="sm"
        as={DebounceInput}
        debounceTimeout={1000}
        placeholder="Describe the mark..."
        value={description}
        onChange={handleDescriptionChange}
      />
    </FormGroup>
  );
}
