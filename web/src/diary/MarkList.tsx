import { Form } from "react-bootstrap";
import { Mark } from "./diary-model";
import { MarkForm } from "./MarkForm";

export interface MarkListProps {
  marks: Mark[];
}

export function MarkList({ marks }: MarkListProps) {
  return (
    <Form className="mt-3">
      {marks.map((mark) => (
        <MarkForm key={mark.id} mark={mark} />
      ))}
    </Form>
  );
}
