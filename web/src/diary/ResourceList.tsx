import { Resource } from "./diary-model";
import { ResourceCard } from "./ResourceCard";

export interface ResourceListProps {
  resources: Resource[];
}

export function ResourceList({ resources }: ResourceListProps) {
  return (
    <>
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </>
  );
}
