import { useAppDispatch, useAppSelector } from "app/hooks";
import { promptGroupSelectors, queryPromptGroups } from "./prompt-group-slice";
import { useEffect, useState } from "react";
import {
  FormControl,
  FormGroup,
  FormLabel,
  Button,
  Container,
  FormSelect,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { CreateVampireFormData } from "./vampire-model";

export interface CreateVampireFormProps {
  onCancel?: () => void;
  onSubmit?: (formData: CreateVampireFormData) => void;
}

export function CreateVampireForm({
  onCancel,
  onSubmit,
}: CreateVampireFormProps) {
  const dispatch = useAppDispatch();
  const allPromptGroups = useAppSelector(promptGroupSelectors.selectAll);

  const [name, setName] = useState<string | null>(null);
  const [promptGroup, setPromptGroup] = useState<number | null>(null);

  const isFormComplete = () => name && promptGroup !== null;

  useEffect(() => {
    dispatch(queryPromptGroups());
  }, [dispatch]);

  return (
    <Container className="py-3">
      <h2>Create Vampire</h2>

      <FormGroup>
        <FormLabel>Name</FormLabel>
        <FormControl
          placeholder="Enter a name..."
          onChange={(event) => setName(event.target.value)}
        />
      </FormGroup>

      <FormGroup className="mt-3">
        <FormLabel>Prompt Group</FormLabel>
        <FormSelect
          onChange={(event) => {
            let promptGroup = null;
            if (event.target.value !== "") {
              promptGroup = parseInt(event.target.value);
            }
            setPromptGroup(promptGroup);
          }}
        >
          <option value="">Select a prompt group...</option>
          {allPromptGroups.map((promptGroup) => (
            <option key={promptGroup.id} value={promptGroup.id}>
              {promptGroup.name}
            </option>
          ))}
        </FormSelect>
      </FormGroup>

      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip>Discard changes</Tooltip>}
      >
        <Button variant="outline-danger" className="mt-3" onClick={onCancel}>
          Cancel
        </Button>
      </OverlayTrigger>

      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip>Go to the Diary page</Tooltip>}
      >
        <Button
          variant="outline-success"
          className="mt-3 ms-3"
          disabled={!isFormComplete()}
          onClick={() => {
            onSubmit &&
              onSubmit({
                name: name as string,
                description: "",
                promptGroup: promptGroup as number,
              });
          }}
        >
          Create
        </Button>
      </OverlayTrigger>
    </Container>
  );
}
