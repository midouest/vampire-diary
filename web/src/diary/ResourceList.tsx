import { Form } from "react-bootstrap";
import { Resource } from "./diary-model";
import { ResourceForm } from "./ResourceForm";

export interface ResourceListProps {
  resources: Resource[];
}

export function ResourceList({ resources }: ResourceListProps) {
  return (
    <Form>
      {resources.map((resource) => (
        <ResourceForm key={resource.id} resource={resource} />
      ))}
    </Form>
  );
}
