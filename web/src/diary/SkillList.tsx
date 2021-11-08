import { Form } from "react-bootstrap";
import { Skill } from "./diary-model";
import { SkillForm } from "./SkillForm";

export interface SkillListProps {
  skills: Skill[];
}

export function SkillList({ skills }: SkillListProps) {
  return (
    <Form className="mt-3">
      {skills.map((skill) => (
        <SkillForm key={skill.id} skill={skill} />
      ))}
    </Form>
  );
}
