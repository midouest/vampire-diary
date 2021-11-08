import { Form } from "react-bootstrap";
import { Experience } from "./diary-model";
import { ExperienceForm } from "./ExperienceForm";

export interface ExperienceListProps {
  experiences: Experience[];
}

export function ExperienceList({ experiences }: ExperienceListProps) {
  return (
    <Form>
      {experiences.map((experience, index) => (
        <ExperienceForm
          key={experience.id}
          index={index}
          experience={experience}
        />
      ))}
    </Form>
  );
}
