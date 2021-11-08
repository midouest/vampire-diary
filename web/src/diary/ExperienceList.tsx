import { Experience } from "./diary-model";
import { ExperienceForm } from "./ExperienceForm";

export interface ExperienceListProps {
  experiences: Experience[];
}

export function ExperienceList({ experiences }: ExperienceListProps) {
  return (
    <>
      {experiences.map((experience, index) => (
        <ExperienceForm key={experience.id} experience={experience} />
      ))}
    </>
  );
}
