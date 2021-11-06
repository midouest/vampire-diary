import { useAppDispatch, useAppSelector } from "hooks";
import { promptGroupSelectors, queryPromptGroups } from "prompt-group/slice";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Button,
  Container,
  FormSelect,
} from "react-bootstrap";
import { CreateVampireFormData } from "./model";

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
  const [description, setDescription] = useState<string | null>(null);
  const [promptGroup, setPromptGroup] = useState<number | null>(null);

  const isFormComplete = () => name && description && promptGroup !== null;

  useEffect(() => {
    dispatch(queryPromptGroups());
  }, [dispatch]);

  return (
    <Container className="py-3">
      <Form>
        <FormGroup>
          <FormLabel>Name</FormLabel>
          <FormControl onChange={(event) => setName(event.target.value)} />
        </FormGroup>

        <FormGroup className="mt-3">
          <FormLabel>Description</FormLabel>
          <FormControl
            as="textarea"
            onChange={(event) => setDescription(event.target.value)}
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

        <Button variant="danger" className="mt-3" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          className="mt-3 ms-3"
          disabled={!isFormComplete()}
          onClick={() => {
            onSubmit &&
              onSubmit({
                name: name as string,
                description: description as string,
                promptGroup: promptGroup as number,
              });
          }}
        >
          Create
        </Button>
      </Form>
    </Container>
  );
}
