import { useAppDispatch } from "app/hooks";
import { useState } from "react";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { DebounceInput } from "react-debounce-input";
import { Resource } from "./diary-model";
import { resourceThunk } from "./diary-thunk";

export interface ResourceFormProps {
  resource: Resource;
}

export function ResourceForm({ resource }: ResourceFormProps) {
  const dispatch = useAppDispatch();
  const [description, setDescription] = useState(resource.description);

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setDescription(value);
    dispatch(resourceThunk.update({ id: resource.id, description: value }));
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
