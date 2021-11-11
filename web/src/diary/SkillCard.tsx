import { useAppDispatch } from "app/hooks";
import { OVERLAY_DELAY } from "common/constants";
import { useState } from "react";
import {
  Col,
  FormControl,
  FormGroup,
  OverlayTrigger,
  Row,
  ToggleButton,
  Tooltip,
} from "react-bootstrap";
import { DebounceInput } from "react-debounce-input";
import TextareaAutosize from "react-textarea-autosize";
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
    dispatch(skillThunk.update({ id: skill.id, isChecked: !skill.isChecked }));

  return (
    <Row className="mt-3">
      <Col>
        {skill.isChecked ? (
          <span className="text-muted">{skill.description}</span>
        ) : (
          <FormGroup>
            <FormControl
              as={DebounceInput}
              element={TextareaAutosize as any}
              forceNotifyByEnter={false}
              debounceTimeout={1000}
              placeholder="Describe the skill..."
              value={description}
              onChange={handleDescriptionChange}
            />
          </FormGroup>
        )}
      </Col>
      <Col xs="auto">
        <OverlayTrigger
          placement="right"
          delay={OVERLAY_DELAY}
          overlay={<Tooltip>Remove this Skill</Tooltip>}
        >
          <ToggleButton
            type="checkbox"
            value="1"
            variant="outline-danger"
            checked={skill.isChecked}
            onClick={handleCheck}
          >
            <i className="bi bi-check-lg"></i>
          </ToggleButton>
        </OverlayTrigger>
      </Col>
    </Row>
  );
}
