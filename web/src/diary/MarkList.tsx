import { Form } from "react-bootstrap";
import { Mark } from "./diary-model";
import { MarkForm } from "./MarkForm";

export interface MarkListProps {
  marks: Mark[];
}

export function MarkList({ marks }: MarkListProps) {
  return (
    <Form>
      {marks.map((mark) => (
        <MarkForm key={mark.id} mark={mark} />
      ))}
    </Form>
  );
}
