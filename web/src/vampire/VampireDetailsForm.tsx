import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Vampire } from "./model";

export interface VampireDetailsFormProps {
  vampire: Vampire;
}

export function VampireDetailsForm({ vampire }: VampireDetailsFormProps) {
  return (
    <Form>
      <FormGroup>
        <FormLabel>Name</FormLabel>
        <FormControl />
      </FormGroup>

      <FormGroup>
        <FormLabel>Description</FormLabel>
        <FormControl as="textarea" />
      </FormGroup>
    </Form>
  );
}
