import { useAppDispatch } from "app/hooks";
import { useState } from "react";
import { Button, Col, FormControl, FormGroup, Row } from "react-bootstrap";
import { DebounceInput } from "react-debounce-input";
import { Skill } from "./diary-model";
import { skillThunk } from "./diary-thunk";

export interface SkillCardProps {
  skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
  const dispatch = useAppDispatch();
  const [description, setDescription] = useState(skill.description);

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setDescription(value);
    dispatch(skillThunk.update({ id: skill.id, description: value }));
  };

  const handleCheck = () =>
    dispatch(skillThunk.update({ id: skill.id, isChecked: true }));

  return (
    <Row className="mt-3">
      <Col>
        <FormGroup>
          <FormControl
            size="sm"
            as={DebounceInput}
            forceNotifyByEnter={false}
            debounceTimeout={1000}
            placeholder="Describe the skill..."
            value={description}
            onChange={handleDescriptionChange}
          />
        </FormGroup>
      </Col>
      <Col xs="auto">
        <Button size="sm" variant="outline-danger" onClick={handleCheck}>
          Check
        </Button>
      </Col>
    </Row>
  );
}
