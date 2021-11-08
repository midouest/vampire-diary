import { Skill } from "./diary-model";
import { SkillCard } from "./SkillCard";

export interface SkillListProps {
  skills: Skill[];
}

export function SkillList({ skills }: SkillListProps) {
  return (
    <>
      {skills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </>
  );
}
